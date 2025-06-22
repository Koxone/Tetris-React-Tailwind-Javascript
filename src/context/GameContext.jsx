// GameContext.jsx
import { createContext, useContext, useEffect, useRef, useState } from "react";
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

  const positionRef = useRef(position);
  const pieceRef = useRef(currentPiece);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  useEffect(() => {
    pieceRef.current = currentPiece;
  }, [currentPiece]);

  // Lowest Wall Collition
  const getLowestBlockOffset = (shape) => {
    let lastRowWithBlock = 0;
    shape.forEach((row, rowIndex) => {
      if (row.some((cell) => cell === 1)) {
        lastRowWithBlock = rowIndex;
      }
    });
    return lastRowWithBlock;
  };

  // Pieces Rotation Clockwise
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

  // Pieces Collition for X Axis
  function xCollition(piece, positionX) {
    return piece.shape.some((row, y) => {
      return row.some((cell, x) => {
        if (cell === 1) {
          const newX = positionX + x;
          return newX < 0 || newX >= 10;
        }
        return false;
      });
    });
  }

  // Check if pieces reached bottom
  function reachedBottom(piece, posY) {
    const lowestOffset = getLowestBlockOffset(piece.shape);
    return posY + lowestOffset >= 19;
  }

  // Automatic Falling Movement
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
        const newX = positionRef.current.x - 1;
        if (
          !xCollition(pieceRef.current, newX) &&
          !reachedBottom(pieceRef.current, positionRef.current.y)
        ) {
          setPosition((prev) => ({
            ...prev,
            x: newX,
          }));
        }
      }

      if (event.key === "ArrowRight") {
        const newX = positionRef.current.x + 1;
        if (
          !xCollition(pieceRef.current, newX) &&
          !reachedBottom(pieceRef.current, positionRef.current.y)
        ) {
          setPosition((prev) => ({
            ...prev,
            x: newX,
          }));
        }
      }

      if (event.key === "ArrowDown") {
        const newY = positionRef.current.y + 1;
        if (!reachedBottom(pieceRef.current, positionRef.current.y)) {
          setPosition((prev) => ({
            ...prev,
            y: newY,
          }));
        }
      }

      if (event.key === "ArrowUp") {
        const newY = positionRef.current.y + 1;
        if (!reachedBottom(pieceRef.current, positionRef.current.y)) {
          setCurrentPiece((prev) => ({
            ...prev,
            shape: rotateMatrixClockwise(prev.shape),
          }));
        }
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
