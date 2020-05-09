import { cloneDeep } from "lodash";

const outBounds = (x: number, y: number, gridW: number, gridH: number) => {
  return x < 0 || y < 0 || x >= gridW || y >= gridH;
}

export const create2DNumber = (x: number, y: number): number[][] => {
  const newArray = new Array(x);
  for (let i = 0; i < x; i++) {
    const yArray = [];
    for (let j = 0; j < y; j++) {
      yArray.push(0);
    }
    newArray[i] = yArray;
  }
  return newArray
}

export const fillMines = (mines: number[][], amount: number, gridW: number, gridH: number): number[][] => {
  let i = 0;
  const filled = cloneDeep(mines);
  while (i < amount) {
    const x = Math.floor(Math.random() * gridW);
    const y = Math.floor(Math.random() * gridH);
    if (filled[x][y] === 1) continue;
    filled[x][y] = 1;
    i++;
  }
  return filled;
}

export const clearMines = (mines: number[][], gridW: number, gridH: number): number[][] => {
  const filled = cloneDeep(mines);
  for (let i = 0; i < gridW; i++) {
    for (let j = 0; i < gridH; j++) {
      filled[i][j] = 0;
    }
  }
  return filled;
}

export const create2DBoolean = (x: number, y: number): boolean[][] => {
  const newArray = new Array(x);
  for (let i = 0; i < x; i++) {
    const yArray = [];
    for (let j = 0; j < y; j++) {
      yArray.push(false);
    }
    newArray[i] = yArray;
  }
  return newArray
}

export const calculateNear = (mines: number[][], x: number, y: number, gridW: number, gridH: number): number => {
  if (outBounds(x, y, gridW, gridH)) return 0;
  let i = 0;
  for (let offsetX = -1; offsetX <= 1; offsetX++) {
    for (let offsetY = -1; offsetY <= 1; offsetY++) {
      i += mines[offsetX + x][offsetY + y];
    }
  }
  return i;
}

export const reveal = (revealed: boolean[][], mines: number[][], x: number, y: number, gridW: number, gridH: number): void => {
  if (outBounds(x, y, gridW, gridH)) return;
  if (revealed[x][y]) return;
  revealed[x][y] = true;
  if (calculateNear(mines, x, y, gridW, gridH) !== 0) return;
  reveal(revealed, mines, x - 1, y - 1, gridW, gridH);
  reveal(revealed, mines, x - 1, y + 1, gridW, gridH);
  reveal(revealed, mines, x + 1, y - 1, gridW, gridH);
  reveal(revealed, mines, x + 1, y + 1, gridW, gridH);
  reveal(revealed, mines, x - 1, y, gridW, gridH);
  reveal(revealed, mines, x + 1, y, gridW, gridH);
  reveal(revealed, mines, x, y - 1, gridW, gridH);
  reveal(revealed, mines, x, y + 1, gridW, gridH);
}