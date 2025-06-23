import { createContext, useContext, useRef, useState, useEffect } from "react";
import { getRandomPiece } from "../logic/tetrominoUtils";

const GameContext = createContext();

export function useGameContext() {
  return useContext(GameContext);
}

export function GameProvider({ children }) {
  const createEmptyBoard = () => {
    return Array.from({ length: 20 }, () =>
      Array.from({ length: 10 }, () => ({ value: 0, color: "" })),
    );
  };

  const [board, setBoard] = useState(createEmptyBoard());
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

  return (
    <GameContext.Provider
      value={{
        currentPiece,
        setCurrentPiece,
        position,
        setPosition,
        positionRef,
        pieceRef,
        board,
        setBoard,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
