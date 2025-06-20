import { create } from "zustand";
import { TETROMINOES } from "../logic/tetrominoes";

const usePieceStore = create((set) => ({
  currentPiece: null,
  position: { x: 3, y: 0 },
  rotation: 0,

  setNewPiece: () => {
    const keys = Object.keys(TETROMINOES);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const piece = TETROMINOES[randomKey];

    set({
      currentPiece: piece,
      position: { x: 3, y: 0 },
      rotation: 0,
    });
  },

  movePiece: (dx, dy) =>
    set((state) => ({
      position: {
        x: state.position.x + dx,
        y: state.position.y + dy,
      },
    })),

  rotatePiece: () =>
    set((state) => ({
      rotation: (state.rotation + 1) % state.currentPiece.shape.length,
    })),
}));

export default usePieceStore;
