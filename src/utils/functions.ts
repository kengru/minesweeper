const outBounds = (x: number, y: number, gridW: number, gridH: number) => {
  return x < 0 || y < 0 || x >= gridW || y >= gridH;
}

export const createTwoDArray = (x: number, y: number): number[][] => {
  const newArray = new Array(x);
  for (let i = 0; i < x; i++) {
    newArray[i] = new Array(y);
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