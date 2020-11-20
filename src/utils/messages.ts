import { Levels, PlayingState, Score } from "../App";

interface changeLevel {
  type: "chgLvl";
  action: Levels;
}
interface changePState {
  type: "chgPlay";
  action: PlayingState;
}
interface getScores {
  type: "getScs";
  action: Score[];
}

interface addScore {
  type: "addScs";
  action: Score;
}

export type Message = changeLevel | changePState | getScores | addScore;
