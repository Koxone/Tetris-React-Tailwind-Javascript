import { useEffect } from "react";
import { getLowestBlockOffset, getRandomPiece } from "../logic/tetrominoUtils";

export function usePieceFixation(
  pieceRef,
  positionRef,
  setBoard,
  setCurrentPiece,
  setPosition,
) {
  useEffect(() => {
    const interval = setInterval(() => {
      const piece = pieceRef.current;
      const pos = positionRef.current;

      const maxY = getLowestBlockOffset(piece.shape);

      if (pos.y + maxY >= 19) {
        setBoard((prevBoard) => {
          const newBoard = [...prevBoard.map((row) => [...row])]; // copia profunda

          piece.shape.forEach((row, y) => {
            row.forEach((cell, x) => {
              if (cell === 1) {
                const boardY = pos.y + y;
                const boardX = pos.x + x;
                if (boardY >= 0 && boardY < 20 && boardX >= 0 && boardX < 10) {
                  newBoard[boardY][boardX] = {
                    value: 1,
                    color: piece.color,
                  };
                }
              }
            });
          });

          return newBoard;
        });

        setCurrentPiece(getRandomPiece());
        setPosition({ x: 3, y: 0 });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [pieceRef, positionRef, setBoard, setCurrentPiece, setPosition]);
}
