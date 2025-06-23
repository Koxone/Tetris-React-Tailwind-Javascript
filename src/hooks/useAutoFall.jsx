import { useEffect } from "react";
import { getLowestBlockOffset } from "../logic/tetrominoUtils";

export function useAutoFall(pieceRef, positionRef, setPosition) {
  useEffect(() => {
    const interval = setInterval(() => {
      const pos = positionRef.current;
      const piece = pieceRef.current;

      const maxY = getLowestBlockOffset(piece.shape);
      if (pos.y + maxY >= 19) return;

      setPosition((prev) => ({
        x: prev.x,
        y: prev.y + 1,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [pieceRef, positionRef, setPosition]);
}
