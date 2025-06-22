import { useEffect } from "react";
import { getLowestBlockOffset } from "../logic/tetrominoUtils";

export function useAutoFall(currentPiece, position, setPosition) {
  useEffect(() => {
    const interval = setInterval(() => {
      const maxY = getLowestBlockOffset(currentPiece.shape);
      if (position.y + maxY >= 19) return;

      setPosition((prev) => ({
        x: prev.x,
        y: prev.y + 1,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [currentPiece, position, setPosition]);
}
