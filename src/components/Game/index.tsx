import React, { useEffect, useCallback, useReducer, useMemo } from "react";
import { StyleSheet, css } from "aphrodite";
import { cloneDeep } from "lodash";

import { Levels, PlayingState, Score } from "../../App";
import { Row } from "./Row";
import {
  checkStartPlay,
  checkWin,
  minesLeft,
  reveal
} from "../../utils/functions";
import {
  BeginnerState,
  IntermediateState,
  resetLevels
} from "../../utils/difficulty-data";
import { Modal } from "../Modal";

const styles = StyleSheet.create({
  game: {
    display: "flex",
    width: "60%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "@media (max-width: 900px)": {
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
    borderRadius: "4px",
    marginTop: "1em"
  },
  minesLeft: {
    marginRight: "10em"
  },
  minesNumber: {
    color: "#D00"
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
      type: "gameWonRecord";
    }
  | {
      type: "gameWonNoRecord";
    }
  | {
      type: "gameLost";
    }
  | {
      type: "closeModal";
    }
  | {
      type: "increaseSeconds";
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
    case "gameWonRecord": {
      return {
        ...prev,
        seconds: 0,
        modalOpen: true,
        newRecord: true,
        endTime: prev.seconds,
        message: `You have won in ${prev.seconds} seconds!`
      };
    }
    case "gameWonNoRecord": {
      return {
        ...prev,
        seconds: 0,
        modalOpen: true,
        message: `You have won in ${prev.seconds} seconds!`
      };
    }
    case "gameLost": {
      return {
        ...prev,
        seconds: 0,
        modalOpen: true,
        message: `You lost in ${prev.seconds} seconds!`
      };
    }
    case "closeModal": {
      return {
        ...prev,
        newRecord: false,
        modalOpen: false,
        endTime: 0
      };
    }
    case "increaseSeconds": {
      return {
        ...prev,
        seconds: prev.seconds + 1
      };
    }
    default:
      shouldNever(msg);
      return prev;
  }
}

interface Props {
  level: Levels;
  playingState: PlayingState;
  scores: Score[];
  changePlayingState: (playState: PlayingState) => void;
  sendScore: (name: string, time: number) => Promise<void>;
}

export interface State {
  seconds: number;
  gridW: number;
  gridH: number;
  numMines: number;
  mines: number[][];
  flags: boolean[][];
  revealed: boolean[][];
  modalOpen: boolean;
  message: string;
  newRecord: boolean;
  endTime: number;
}

export const Game = (props: Props) => {
  const [state, dispatch] = useReducer(reducer, BeginnerState);
  const { level, playingState, scores, changePlayingState, sendScore } = props;

  useEffect(() => {
    changePlayingState(PlayingState.NotPlaying);
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
      // case Levels.Expert:
      //   dispatch({
      //     type: "setDifficulty",
      //     state: ExpertState
      //   });
      //   break;
      default:
    }
  }, [level, changePlayingState]);

  useEffect(() => {
    let timer: number = 0;
    if (playingState === PlayingState.Playing) {
      timer = window.setInterval(
        () => dispatch({ type: "increaseSeconds" }),
        1000
      );
    } else {
      window.clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [playingState]);

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
    changePlayingState(PlayingState.NotPlaying);
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
      // case Levels.Expert:
      //   resetLevels(Levels.Expert);
      //   dispatch({
      //     type: "setDifficulty",
      //     state: ExpertState
      //   });
      //   break;
      default:
    }
  }, [level, changePlayingState]);

  const checkMine = useCallback(
    (x: number, y: number) => {
      if (checkStartPlay(state.revealed)) {
        changePlayingState(PlayingState.Playing);
      }
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
          scores.some((score) => state.seconds < score.time)
            ? dispatch({ type: "gameWonRecord" })
            : dispatch({ type: "gameWonNoRecord" });
        }
      }
    },
    [
      state.revealed,
      state.mines,
      state.gridW,
      state.gridH,
      state.numMines,
      state.seconds,
      scores,
      changePlayingState,
      resetGame
    ]
  );

  const mines = useMemo(() => minesLeft(state.flags, state.numMines), [
    state.flags,
    state.numMines
  ]);

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
        time={state.endTime}
        message={state.message}
        record={state.newRecord}
        close={closeModal}
        sendScore={sendScore}
      />
      <div className={css(styles.minesLeft)}>
        Mines left: <span className={css(styles.minesNumber)}>{mines}</span>
      </div>
      <div className={css(styles.grid)}>{rows}</div>
      <button className={css(styles.startButton)} onClick={() => resetGame()}>
        Restart
      </button>
    </div>
  );
};
