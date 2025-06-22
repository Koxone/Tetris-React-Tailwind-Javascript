import { TETROMINOES } from "./tetrominoes";

// Returns a random tetromino piece from the TETROMINOES object
export const getRandomPiece = () => {
  const keys = Object.keys(TETROMINOES);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return TETROMINOES[randomKey];
};

// Rotates a square matrix (tetromino shape) 90 degrees clockwise
export function rotateMatrixClockwise(matrix) {
  const size = matrix.length;
  const rotated = Array.from({ length: size }, () => Array(size).fill(0));
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      rotated[x][size - 1 - y] = matrix[y][x];
    }
  }
  return rotated;
}

export function isRotationValid(rotatedShape, position) {
  return rotatedShape.every((row, y) =>
    row.every((cell, x) => {
      if (cell === 1) {
        const newX = position.x + x;
        const newY = position.y + y;
        return newX >= 0 && newX < 10 && newY < 20;
      }
      return true;
    }),
  );
}

// Finds the index of the lowest row in the shape that contains a block (cell === 1)
export function getLowestBlockOffset(shape) {
  let lastRowWithBlock = 0;
  shape.forEach((row, rowIndex) => {
    if (row.some((cell) => cell === 1)) {
      lastRowWithBlock = rowIndex;
    }
  });
  return lastRowWithBlock;
}

// Checks if the piece collides with the left or right boundaries of the board
export function xCollition(piece, positionX) {
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

// Checks if the piece has reached the bottom of the board
export function reachedBottom(piece, posY) {
  const lowestOffset = getLowestBlockOffset(piece.shape);
  return posY + lowestOffset >= 19;
}
