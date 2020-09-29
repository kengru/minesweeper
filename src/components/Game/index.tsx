import React, { useEffect, useCallback, useReducer } from "react";
import { StyleSheet, css } from "aphrodite";
import { cloneDeep } from "lodash";

import { Levels, PlayingState } from "../../App";
import { Row } from "./Row";
import { checkWin, reveal } from "../../utils/functions";
import {
  BeginnerState,
  IntermediateState,
  ExpertState,
  resetLevels
} from "../../utils/difficulty-data";
import { Modal } from "../Modal";

const styles = StyleSheet.create({
  game: {
    display: "flex",
    width: "70%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "@media (max-width: 800px)": {
      width: "100%"
    }
  },
  startButton: {
    margin: "3em 1em 1em 1em",
    height: "5%",
    width: "86px",
    fontSize: "0.7em",
    justifySelf: "flex-end"
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    border: "2px solid #EEE",
    borderRadius: "4px"
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
    }
  | {
      type: "gameWon";
    }
  | {
      type: "gameLost";
    }
  | {
      type: "closeModal";
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
      return {
        ...prev,
        numMines: msg.state.numMines,
        gridH: msg.state.gridH,
        gridW: msg.state.gridW,
        flags: msg.state.flags,
        mines: msg.state.mines,
        revealed: msg.state.revealed,
        seconds: 0
      };
    }
    case "gameWon": {
      return {
        ...prev,
        modalOpen: true,
        message: "You have won!"
      };
    }
    case "gameLost": {
      return {
        ...prev,
        modalOpen: true,
        message: "You lost!"
      };
    }
    case "closeModal": {
      return {
        ...prev,
        modalOpen: false
      };
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
  seconds: number;
  playing: boolean;
  gridW: number;
  gridH: number;
  numMines: number;
  mines: number[][];
  flags: boolean[][];
  revealed: boolean[][];
  modalOpen: boolean;
  message: string;
}

export const Game = (props: Props) => {
  const [state, dispatch] = useReducer(reducer, BeginnerState);
  const { level, changePlayingState } = props;

  useEffect(() => {
    switch (level) {
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
  }, [level]);

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

  const resetGame = useCallback(() => {
    changePlayingState(PlayingState.Playing);
    switch (level) {
      case Levels.Beginner:
        resetLevels(Levels.Beginner);
        dispatch({
          type: "setDifficulty",
          state: BeginnerState
        });
        break;
      case Levels.Intermediate:
        resetLevels(Levels.Intermediate);
        dispatch({
          type: "setDifficulty",
          state: IntermediateState
        });
        break;
      case Levels.Expert:
        resetLevels(Levels.Expert);
        dispatch({
          type: "setDifficulty",
          state: ExpertState
        });
        break;
      default:
    }
  }, [level, changePlayingState]);

  const checkMine = useCallback(
    (x: number, y: number) => {
      if (state.mines[x][y]) {
        dispatch({ type: "gameLost" });
        resetGame();
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
        if (checkWin(newRevealed, state.numMines)) {
          dispatch({ type: "gameWon" });
        }
      }
    },
    [
      state.revealed,
      state.mines,
      state.numMines,
      state.gridW,
      state.gridH,
      resetGame
    ]
  );

  const closeModal = useCallback(() => dispatch({ type: "closeModal" }), []);

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
      <Modal
        open={state.modalOpen}
        message={state.message}
        close={closeModal}
      />
      <div className={css(styles.grid)}>{rows}</div>
      <button className={css(styles.startButton)} onClick={() => resetGame()}>
        Restart
      </button>
    </div>
  );
};
