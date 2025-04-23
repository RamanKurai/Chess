import { WebSocket } from "ws";

export class GameManager {
    private Game : Game[];
    private pendingUser : WebSocket;
    private users :WebSocket[];

    constructor() {
        this.Game = [];
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
                }
            } else {
                this.pendingUser = socket;
            }
        })
    }
}