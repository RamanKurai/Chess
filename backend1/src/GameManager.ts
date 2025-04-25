import { WebSocket } from "ws";
import { Game } from "./Game";

export class GameManager {
    private games : Game[];
    private pendingUser : WebSocket | null;
    private users :WebSocket[];

    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }

    addUser(socket : WebSocket) {
        this.users.push(socket);
        this.addHandler(socket);
    }

    removeUser(socket : WebSocket ){
        this.users = this.users.filter(user => user !== socket);
        // Stop the game if there are no users left
    }

    private addHandler(socket : WebSocket){
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === "join") {
                if (this.pendingUser) {
                    //start the game
                    const game = new Game(this.pendingUser , socket)
                    this.games.push(game);
                    this.pendingUser = null;
                }
            } else {
                this.pendingUser = socket;
            }
        })
    }
}