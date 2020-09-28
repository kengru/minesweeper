import React, { useEffect, useCallback, useReducer } from "react";
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
    margin: "1em",
    marginLeft: "3em",
    height: "5%",
    width: "8%",
    fontSize: "0.7em",
    justifySelf: "flex-end"
  },
  grid: {
    display: "flex",
    flexDirection: "column"
  }
});

type Message =
  | {
      type: "setRevealed";
      revealed: boolean[][];
    }
  | {
      type: "setFlags";
      flags: boolean[][];
    }
  | {
      type: "setDifficulty";
      state: State;
    };

function shouldNever(_: never) {
  throw new Error(`Error: ${_}`);
}

function reducer(prev: State, msg: Message): State {
  switch (msg.type) {
    case "setRevealed": {
      return {
        ...prev,
        revealed: msg.revealed
      };
    }
    case "setFlags": {
      return {
        ...prev,
        flags: msg.flags
      };
    }
    case "setDifficulty": {
      return msg.state;
    }
    default:
      shouldNever(msg);
      return prev;
  }
}

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
  const [state, dispatch] = useReducer(reducer, BeginnerState);

  useEffect(() => {
    switch (props.level) {
      case Levels.Beginner:
        dispatch({
          type: "setDifficulty",
          state: BeginnerState
        });
        break;
      case Levels.Intermediate:
        dispatch({
          type: "setDifficulty",
          state: IntermediateState
        });
        break;
      case Levels.Expert:
        dispatch({
          type: "setDifficulty",
          state: ExpertState
        });
        break;
      default:
    }
  }, [props.level]);

  const setFlag = useCallback(
    (x: number, y: number) => {
      const newFlags = cloneDeep(state.flags);
      newFlags[x][y] = !newFlags[x][y];
      dispatch({
        type: "setFlags",
        flags: newFlags
      });
    },
    [state.flags]
  );

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
        dispatch({
          type: "setRevealed",
          revealed: newRevealed
        });
      }
    },
    [state.revealed, state.mines, state.gridW, state.gridH]
  );

  const resetGame = () => {
    props.changePlayingState(PlayingState.Playing);
    switch (props.level) {
      case Levels.Beginner:
        dispatch({
          type: "setDifficulty",
          state: BeginnerState
        });
        break;
      case Levels.Intermediate:
        dispatch({
          type: "setDifficulty",
          state: IntermediateState
        });
        break;
      case Levels.Expert:
        dispatch({
          type: "setDifficulty",
          state: ExpertState
        });
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
      <div className={css(styles.grid)}>{rows}</div>
      <button className={css(styles.startButton)} onClick={() => resetGame()}>
        Restart
      </button>
    </div>
  );
};
