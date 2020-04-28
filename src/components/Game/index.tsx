import React, { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";

import { Levels, PlayingState } from "../../App";
import { calculateNear } from "../../utils/functions";
import { BeginnerState, IntermediateState, ExpertState } from "../../utils/difficulty-data";

const styles = StyleSheet.create({
  game: {
    display: "flex",
    width: "70%",
    height: "100%",
  }
});

interface Props {
  level: Levels;
  changePlayingState: (level: PlayingState) => void;
};

export interface State {
  gridW: number;
  gridH: number;
  numMines: number;
  mines: number[][];
  flags: number[][];
  revealed: number[][];
};

export const Game = (props: Props) => {
  const [state, setState] = useState<State>(BeginnerState);

  useEffect(() => {
    switch(props.level) {
      case Levels.Beginner:
        setState(BeginnerState);
        break;
      case Levels.Intermediate:
        setState(IntermediateState);
        break;
      case Levels.Expert:
        setState(ExpertState);
        break;
      default:
    }
  }, [props.level]);

  return (
    <div className={css(styles.game)}>
      {props.level}
    </div>
  )
};