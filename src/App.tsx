import React, { useReducer, useCallback } from 'react';
import { StyleSheet, css } from "aphrodite";
import { Settings } from "./components/Settings";
import { Game } from "./components/Game";
import { Highscores } from "./components/Highscores";

import { changeLevel, changePState } from "./utils/messages";

type Message = changeLevel | changePState;

const styles = StyleSheet.create({
  app: {
    height: "100%",
    width: "100%",
    backgroundColor: "#f6f8fa"
  },
  header: {
    display: "flex",
    height: "15%",
    fontSize: "3em",
    justifyContent: "center",
    alignItems: "center"
  },
  main: {
    display: "flex",
    height: "75%"
  },
  footer: {
    display: "flex",
    height: "10%",
    margin: "2em"
  }
});

export enum Levels {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced"
};

export enum PlayingState {
  NotPlaying = 0,
  Playing = 1
}

interface State {
  level: Levels;
  playing: PlayingState;
};

function reducer(prev: State, msg: Message): State {
  switch(msg.type) {
    case "chgLvl":
      return {
        ...prev,
        level: msg.action,
      };
    case "chgPlay":
      return {
        ...prev,
        playing: msg.action
      };
    default:
      return prev;
  }
}

const initialState: State = {
  level: Levels.Beginner,
  playing: PlayingState.NotPlaying
};

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const changeDifficulty = useCallback((level: Levels) => {
    dispatch({ type: "chgLvl", action: level})
  }, []);

  return (
    <div className={css(styles.app)}>
      <header className={css(styles.header)}>Minesweeper</header>
      <main className={css(styles.main)}>
        <Settings level={state.level} changeDifficulty={changeDifficulty} />
        <Game level={state.level}/>
        <Highscores />
      </main>
      <footer className={css(styles.footer)}>
        <h6>kengru</h6>
      </footer>
    </div>
  );
}
