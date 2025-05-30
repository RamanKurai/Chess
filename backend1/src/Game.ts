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

  makeMove(socket: WebSocket, move: { from: string, to: string }) {
  // Enforce turn: white = even, black = odd (before move)
  const moveCountBefore = this.board.history().length;
  if (moveCountBefore % 2 === 0 && socket !== this.player1) return;
  if (moveCountBefore % 2 === 1 && socket !== this.player2) return;

  try {
    this.board.move(move);
  } catch (e) {
    console.log("Invalid move:", e);
    return;
  }

  if (this.board.isGameOver()) {
    const winner = this.board.turn() === "w" ? "black" : "white";
    const message = JSON.stringify({
      type: GAME_OVER,
      payload: { winner },
    });
    this.player1.send(message);
    this.player2.send(message);
    return;
  }

  // Notify the OTHER player
  const opponent = socket === this.player1 ? this.player2 : this.player1;
  opponent.send(JSON.stringify({
    type: MOVE,
    payload: move
  }));
}

}
