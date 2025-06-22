// GameContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { TETROMINOES } from "../logic/tetrominoes";

const GameContext = createContext();

export function useGameContext() {
  return useContext(GameContext);
}

export function GameProvider({ children }) {
  const [currentPiece, setCurrentPiece] = useState(TETROMINOES.Z);
  const shapeHeight = currentPiece.shape.length;
  const shapeWidth = currentPiece.shape[0].length;
  const [position, setPosition] = useState({ x: 3, y: 0 });

  // Automatic Movement
  useEffect(() => {
    const interval = setInterval(() => {
      if (position.y + shapeHeight >= 20) {
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
    
  });

  return (
    <GameContext.Provider value={{ currentPiece, position }}>
      {children}
    </GameContext.Provider>
  );
}
