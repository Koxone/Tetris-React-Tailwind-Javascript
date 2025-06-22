// GameContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { TETROMINOES } from "../logic/tetrominoes";

const GameContext = createContext();

export function useGameContext() {
  return useContext(GameContext);
}

export function GameProvider({ children }) {
  const getRandomPiece = () => {
    const keys = Object.keys(TETROMINOES);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return TETROMINOES[randomKey];
  };

  const [currentPiece, setCurrentPiece] = useState(getRandomPiece());
  const [position, setPosition] = useState({ x: 3, y: 0 });

  const shapeHeight = currentPiece.shape.length;
  const shapeWidth = currentPiece.shape[0].length;

  const getLowestBlockOffset = (shape) => {
    let lastRowWithBlock = 0;
    shape.forEach((row, rowIndex) => {
      if (row.some((cell) => cell === 1)) {
        lastRowWithBlock = rowIndex;
      }
    });
    return lastRowWithBlock;
  };

  // Pieces Rotation
  function rotateMatrixClockwise(matrix) {
    const size = matrix.length;
    const rotated = Array.from({ length: size }, () => Array(size).fill(0));
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        rotated[x][size - 1 - y] = matrix[y][x];
      }
    }
    return rotated;
  }

  // Automatic Movement
  useEffect(() => {
    const interval = setInterval(() => {
      const maxY = getLowestBlockOffset(currentPiece.shape);
      if (position.y + maxY >= 19) {
        return;
      }
      setPosition((prev) => ({
        x: prev.x,
        y: prev.y + 1,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [currentPiece, position]);

  // User Movement
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        if (isWithinBounds(currentPiece, position.x - 1)) {
          setPosition((prev) => ({
            ...prev,
            x: prev.x - 1,
          }));
        }
      }

      if (event.key === "ArrowRight") {
        setPosition((prev) => ({
          ...prev,
          x: prev.x + 1,
        }));
      }

      if (event.key === "ArrowDown") {
        setPosition((prev) => ({
          ...prev,
          y: prev.y + 1,
        }));
      }

      if (event.key === "ArrowUp") {
        setCurrentPiece((prev) => ({
          ...prev,
          shape: rotateMatrixClockwise(prev.shape),
        }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <GameContext.Provider value={{ currentPiece, position }}>
      {children}
    </GameContext.Provider>
  );
}
