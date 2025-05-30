import { type PieceSymbol, type Square, type Color } from "chess.js";
import { useState } from "react";
import { MOVE } from "../pages/Game";

const pieceImages: Record<string, string> = {
  wp: "/chess-pieces/wp.png",
  wr: "/chess-pieces/wr.png",
  wn: "/chess-pieces/wn.png",
  wb: "/chess-pieces/wb.png",
  wq: "/chess-pieces/wq.png",
  wk: "/chess-pieces/wk.png",
  bp: "/chess-pieces/bp.png",
  br: "/chess-pieces/br.png",
  bn: "/chess-pieces/bn.png",
  bb: "/chess-pieces/bb.png",
  bq: "/chess-pieces/bq.png",
  bk: "/chess-pieces/bk.png",
};

const ChessBoard = ({
  board,
  socket,
  color,
  setBoard,
  chess,
}: {
  board: (
    | {
        square: Square;
        type: PieceSymbol;
        color: Color;
      }
    | null
  )[][];
  socket: WebSocket;
  setBoard: any;
  chess: any;
  color?: "white" | "black" | null;
}) => {
  const [from, setFrom] = useState<null | Square>(null);


  return (
    <div className="text-white-200">
      {board.map((row, i) => (
        <div key={i} className="flex">
          {row.map((square, j) => {
            const squareRepresentation =
              String.fromCharCode(97 + (j % 8)) + "" + (8 - i);
            return (
              <div
                onClick={() => {
  if (!color) {
    console.log("No color assigned yet");
    return;
  }

  console.log("Clicked square:", squareRepresentation);

  if (!from) {
    setFrom(squareRepresentation as Square);
    console.log("Selected from square:", squareRepresentation);
  } else {
    const movePayload = {
      type: MOVE,
      payload: {
        move: {
          from: from,
          to: squareRepresentation,
        },
      },
    };
    console.log("Sending move:", movePayload);
    socket.send(JSON.stringify(movePayload));
    setFrom(null);
  }
}}
key={j}
                className={`w-12 h-12 ${
                  (i + j) % 2 === 0 ? "bg-[#ebecd0]" : "bg-[#769456]"
                }`}
              >
                <div className="w-full h-full flex justify-center ">
                  <div className="h-full justify-center flex flex-col cursor-pointer">
                    {square ? (
                      <img
                        src={pieceImages[square.color[0] + square.type]}
                        alt={`${square.color} ${square.type}`}
                        className="w-8 h-8"
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ChessBoard;
