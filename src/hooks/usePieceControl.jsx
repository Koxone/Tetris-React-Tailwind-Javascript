import { useEffect } from "react";
import {
  xCollition,
  reachedBottom,
  rotateMatrixClockwise,
  isRotationValid,
} from "../logic/tetrominoUtils";

// Custom hook to handle keyboard controls for the Tetris piece
export function usePieceControls(
  pieceRef,
  positionRef,
  setPosition,
  setCurrentPiece,
) {
  useEffect(() => {
    // Handler for keydown events
    const handleKeyDown = (event) => {
      // Ensure refs are available before proceeding
      if (!pieceRef.current || !positionRef.current) return;

      // Move piece left
      if (event.key === "ArrowLeft") {
        const newX = positionRef.current.x - 1;
        // Check for collision and bottom before moving left
        if (
          !xCollition(pieceRef.current, newX) &&
          !reachedBottom(pieceRef.current, positionRef.current.y)
        ) {
          setPosition((prev) => ({ ...prev, x: newX }));
        }
      }

      // Move piece right
      if (event.key === "ArrowRight") {
        const newX = positionRef.current.x + 1;
        // Check for collision and bottom before moving right
        if (
          !xCollition(pieceRef.current, newX) &&
          !reachedBottom(pieceRef.current, positionRef.current.y)
        ) {
          setPosition((prev) => ({ ...prev, x: newX }));
        }
      }

      // Move piece down
      if (event.key === "ArrowDown") {
        const newY = positionRef.current.y + 1;
        // Only move down if not at the bottom
        if (!reachedBottom(pieceRef.current, newY)) {
          setPosition((prev) => ({ ...prev, y: newY }));
        }
      }

      // Rotate piece clockwise
      if (event.key === "ArrowUp") {
        const rotated = rotateMatrixClockwise(pieceRef.current.shape);
        if (isRotationValid(rotated, positionRef.current)) {
          setCurrentPiece((prev) => ({
            ...prev,
            shape: rotated,
          }));
        }
      }
    };

    // Attach keydown event listener
    window.addEventListener("keydown", handleKeyDown);
    // Cleanup event listener on unmount
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
}
