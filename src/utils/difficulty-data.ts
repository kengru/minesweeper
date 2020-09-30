import { create2DNumber, create2DBoolean, fillMines } from "./functions";
import { State } from "../components/Game";
import { Levels } from "../App";

export const BeginnerState: State = {
  seconds: 0,
  modalOpen: false,
  message: "",
  gridH: 9,
  gridW: 9,
  numMines: 10,
  mines: fillMines(create2DNumber(9, 9), 10, 9, 9),
  flags: create2DBoolean(9, 9),
  revealed: create2DBoolean(9, 9)
};

export const IntermediateState: State = {
  seconds: 0,
  modalOpen: false,
  message: "",
  gridH: 16,
  gridW: 16,
  numMines: 40,
  mines: fillMines(create2DNumber(16, 16), 40, 16, 16),
  flags: create2DBoolean(16, 16),
  revealed: create2DBoolean(16, 16)
};

export const ExpertState: State = {
  seconds: 0,
  modalOpen: false,
  message: "",
  gridH: 16,
  gridW: 30,
  numMines: 99,
  mines: fillMines(create2DNumber(30, 16), 99, 30, 16),
  flags: create2DBoolean(30, 16),
  revealed: create2DBoolean(30, 16)
};

export const resetLevels = (level: Levels) => {
  switch (level) {
    case Levels.Beginner:
      BeginnerState.mines = fillMines(create2DNumber(9, 9), 10, 9, 9);
      BeginnerState.flags = create2DBoolean(9, 9);
      BeginnerState.revealed = create2DBoolean(9, 9);
      break;
    case Levels.Intermediate:
      IntermediateState.mines = fillMines(create2DNumber(16, 16), 40, 16, 16);
      IntermediateState.flags = create2DBoolean(16, 16);
      IntermediateState.revealed = create2DBoolean(16, 16);
      break;
    case Levels.Expert:
      ExpertState.mines = fillMines(create2DNumber(30, 16), 99, 30, 16);
      ExpertState.flags = create2DBoolean(30, 16);
      ExpertState.revealed = create2DBoolean(30, 16);
      break;
    default:
  }
};
