import { Chess } from "chess.js";
import WebSocket from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  public board: Chess;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();

    this.player1.send(JSON.stringify({
      type: INIT_GAME,
      payload: { color: "white" }
    }));

    this.player2.send(JSON.stringify({
      type: INIT_GAME,
      payload: { color: "black" }
    }));
  }

  makeMove(socket: WebSocket, move: { from: string; to: string }) {
    const moveCount = this.board.history().length;

    // Validate turn
    if (moveCount % 2 === 0 && socket !== this.player1) return; // White's turn
    if (moveCount % 2 === 1 && socket !== this.player2) return; // Black's turn

    try {
      this.board.move(move);
    } catch (e) {
      console.log("Invalid move:", e);
      return;
    }

    // Check for game over
    if (this.board.isGameOver()) {
      const winner = this.board.turn() === "w" ? "black" : "white";
      this.player1.send(JSON.stringify({
        type: GAME_OVER,
        payload: { winner }
      }));
      this.player2.send(JSON.stringify({
        type: GAME_OVER,
        payload: { winner }
      }));
      return;
    }

    // Send move to opponent
    const opponent = socket === this.player1 ? this.player2 : this.player1;
    opponent.send(JSON.stringify({
      type: MOVE,
      payload: move
    }));
  }
}
