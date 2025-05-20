import { useEffect, useState } from "react";
import Button from "../components/Button";
import ChessBoard from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(() => new Chess().board());
  const [color, setColor] = useState<"white" | "black" | null>(null);

  useEffect(() => {
  if (!socket) return;

  socket.onmessage = (event) => {
    console.log("Raw message from server:", event.data);
    const message = JSON.parse(event.data);
    console.log("Parsed message:", message);

    switch (message.type) {
      case INIT_GAME:
        console.log("INIT_GAME received");
        setColor(message.payload.color); // ✅ assign color
        const newChess = new Chess();
        setChess(newChess);
        setBoard(newChess.board());
        break;

      case MOVE:
        console.log("MOVE received:", message.payload);
        const move = message.payload.move;
        chess.move(move); // update local chess state
        setBoard(chess.board()); // force re-render
        break;

      case GAME_OVER:
        console.log("GAME_OVER received");
        alert(`Game Over. Winner: ${message.payload.winner}`);
        break;

      default:
        console.warn("Unknown message type:", message.type);
    }
  };
}, [socket, chess]);


  if (!socket) {
    return <div>Connecting...</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="pt-8 max-w-screen-lg w-full">
        <div className="grid grid-cols-6 gap-4 md:grid-cols-2 w-full">
          <div className="col-span-4 w-full flex justify-center">
            <ChessBoard
              chess={chess}
              setBoard={setBoard}
              socket={socket}
              board={board}
              color={color}
            />
          </div>
          <div className="col-span-2 w-full flex justify-center">
            <div className="pt-8">
              <Button
                onClick={() =>
                  socket?.send(
                    JSON.stringify({
                      type: INIT_GAME,
                    })
                  )
                }
              >
                Play
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
