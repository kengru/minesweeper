import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, css } from "aphrodite";
import { cloneDeep } from "lodash";

import { Levels, PlayingState } from "../../App";
import { Row } from "./Row";
import { reveal } from "../../utils/functions";
import {
  BeginnerState,
  IntermediateState,
  ExpertState
} from "../../utils/difficulty-data";

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
    flexDirection: "column"
  }
});

interface Props {
  level: Levels;
  changePlayingState: (playState: PlayingState) => void;
}

export interface State {
  gridW: number;
  gridH: number;
  numMines: number;
  mines: number[][];
  flags: boolean[][];
  revealed: boolean[][];
}

export const Game = (props: Props) => {
  const [state, setState] = useState<State>(BeginnerState);

  useEffect(() => {
    switch (props.level) {
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

  const setFlag = (x: number, y: number) => {
    const newFlags = cloneDeep(state.flags);
    newFlags[x][y] = !newFlags[x][y];
    setState({
      ...state,
      flags: newFlags
    });
  };

  const checkMine = useCallback(
    (x: number, y: number) => {
      if (state.mines[x][y]) {
        console.log("explosions");
      } else {
        const newRevealed = reveal(
          cloneDeep(state.revealed),
          state.mines,
          x,
          y,
          state.gridW,
          state.gridH
        );
        setState({
          ...state,
          revealed: newRevealed
        });
      }
    },
    [state]
  );

  const resetGame = () => {
    props.changePlayingState(PlayingState.Playing);
    switch (props.level) {
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
  };

  const preventContext = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  const rows = [...Array(state.gridH).keys()].map((element) => (
    <Row
      key={element}
      width={element}
      columns={state.gridW}
      mines={state.mines}
      flags={state.flags}
      revealed={state.revealed}
      checkMine={checkMine}
      setFlag={setFlag}
    />
  ));

  return (
    <div onContextMenu={preventContext} className={css(styles.game)}>
      <button className={css(styles.startButton)} onClick={() => resetGame()}>
        Restart
      </button>
      <div className={css(styles.grid)}>{rows}</div>
    </div>
  );
};
