import { createTwoDArray } from "./functions";
import { State } from "../components/Game";

export const BeginnerState: State = {
  gridH: 9,
  gridW: 9,
  numMines: 10,
  mines: createTwoDArray(9, 9),
  flags: createTwoDArray(9, 9),
  revealed: createTwoDArray(9, 9)
}

export const IntermediateState: State = {
  gridH: 16,
  gridW: 16,
  numMines: 40,
  mines: createTwoDArray(9, 9),
  flags: createTwoDArray(9, 9),
  revealed: createTwoDArray(9, 9)
}

export const ExpertState: State = {
  gridH: 30,
  gridW: 16,
  numMines: 99,
  mines: createTwoDArray(9, 9),
  flags: createTwoDArray(9, 9),
  revealed: createTwoDArray(9, 9)
}