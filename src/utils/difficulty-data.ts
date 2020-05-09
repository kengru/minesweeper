import { create2DNumber, create2DBoolean, fillMines } from "./functions";
import { State } from "../components/Game";

export const BeginnerState: State = {
  gridH: 9,
  gridW: 9,
  numMines: 10,
  mines: fillMines(create2DNumber(9, 9), 10, 9, 9),
  flags: create2DBoolean(9, 9),
  revealed: create2DBoolean(9, 9)
}

export const IntermediateState: State = {
  gridH: 16,
  gridW: 16,
  numMines: 40,
  mines: fillMines(create2DNumber(16, 16), 40, 16, 16),
  flags: create2DBoolean(16, 16),
  revealed: create2DBoolean(16, 16)
}

export const ExpertState: State = {
  gridH: 16,
  gridW: 30,
  numMines: 99,
  mines: fillMines(create2DNumber(16, 30), 99, 16, 30),
  flags: create2DBoolean(9, 9),
  revealed: create2DBoolean(9, 9)
}