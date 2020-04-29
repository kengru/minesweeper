import React, { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";

import { Levels, PlayingState } from "../../App";
import { Row } from "./Row";
import { calculateNear } from "../../utils/functions";
import { BeginnerState, IntermediateState, ExpertState } from "../../utils/difficulty-data";

const styles = StyleSheet.create({
  game: {
    display: "flex",
    width: "70%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  startButton: {
    height: "5%",
    width: "10%",
    fontSize: "1.2em"
  },
  grid: {
    display: "flex",
    flexDirection: "column",
  }
});

interface Props {
  level: Levels;
  changePlayingState: (playState: PlayingState) => void;
};

export interface State {
  gridW: number;
  gridH: number;
  numMines: number;
  mines: number[][];
  flags: boolean[][];
  revealed: boolean[][];
};

export const Game = (props: Props) => {
  const [state, setState] = useState<State>(BeginnerState);
  const rows = [...Array(state.gridH).keys()].map(element => (
    <Row width={element} columns={state.gridW} />
  ));

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
      <button className={css(styles.startButton)} onClick={() => props.changePlayingState(PlayingState.Playing)}>Start</button>
      <div className={css(styles.grid)}>
        {rows}
      </div>
    </div>
  );
};