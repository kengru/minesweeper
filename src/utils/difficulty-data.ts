import { create2DNumber, create2DBoolean } from "./functions";
import { State } from "../components/Game";

export const BeginnerState: State = {
  gridH: 9,
  gridW: 9,
  numMines: 10,
  mines: create2DNumber(9, 9),
  flags: create2DBoolean(9, 9),
  revealed: create2DBoolean(9, 9)
}

export const IntermediateState: State = {
  gridH: 16,
  gridW: 16,
  numMines: 40,
  mines: create2DNumber(9, 9),
  flags: create2DBoolean(9, 9),
  revealed: create2DBoolean(9, 9)
}

export const ExpertState: State = {
  gridH: 16,
  gridW: 30,
  numMines: 99,
  mines: create2DNumber(9, 9),
  flags: create2DBoolean(9, 9),
  revealed: create2DBoolean(9, 9)
}