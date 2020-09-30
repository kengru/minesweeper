import { Levels, PlayingState } from "../App";

export interface changeLevel {
  type: "chgLvl";
  action: Levels;
}

export interface changePState {
  type: "chgPlay";
  action: PlayingState;
}
