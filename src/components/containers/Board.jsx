import { useGameContext } from "../../context/GameContext";
import { useAutoFall } from "../../hooks/useAutoFall";
import { usePieceControls } from "../../hooks/usePieceControl";

function Board() {
  const {
    currentPiece,
    setCurrentPiece,
    position,
    setPosition,
    positionRef,
    pieceRef,
  } = useGameContext();

  useAutoFall(pieceRef, positionRef, setPosition);
  usePieceControls(pieceRef, positionRef, setPosition, setCurrentPiece); 

  return (
    <main className="flex h-[600px] w-[300px] rounded-xl bg-gradient-to-br from-gray-400 via-gray-400 to-gray-700 p-6 shadow-2xl sm:h-[800px] sm:w-[400px]">
      <div className="aspect-[10/20] w-full max-w-[500px] rounded-md bg-black p-[4px]">
        <div className="grid h-full w-full grid-cols-10 grid-rows-20 gap-[1px]">
          {Array.from({ length: 200 }).map((_, i) => {
            const row = Math.floor(i / 10);
            const col = i % 10;

            let isPieceCell = false;
            let pieceColor = "";

            currentPiece.shape.forEach((pieceRow, y) => {
              pieceRow.forEach((cell, x) => {
                if (cell === 1) {
                  const pieceRowInBoard = position.y + y;
                  const pieceColInBoard = position.x + x;
                  if (row === pieceRowInBoard && col === pieceColInBoard) {
                    isPieceCell = true;
                    pieceColor = currentPiece.color;
                  }
                }
              });
            });

            return (
              <div
                key={i}
                className={`h-full w-full ${
                  isPieceCell
                    ? pieceColor
                    : (row + col) % 2 === 0
                      ? "bg-neutral-800"
                      : "bg-neutral-900"
                }`}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Board;
