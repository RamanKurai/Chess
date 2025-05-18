import { type PieceSymbol , type Square, type Color } from "chess.js";

const ChessBoard = ({ board } : {
  board : ({
    square : Square;
    type : PieceSymbol;
    color : Color;
  } | null)[][]
}) => {
  return (
    <div className="text-white-200" >
      {board.map((row, i) => (
        <div key={i} className="flex">
          {row.map((square, j) => (
            <div key={j} className={`w-12 h-12 ${(i+j)%2 === 0 ? 'bg-[#ebecd0]' : 'bg-[#769456]'}`}>
             <div className="w-full h-full flex justify-center ">
             <div className="h-full justify-center flex flex-col">
              {square ? square.type : ""}
              </div> 
             </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default ChessBoard
