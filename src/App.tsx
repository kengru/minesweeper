import React, { useReducer, useCallback, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";
import { Settings } from "./components/Settings";
import { Game } from "./components/Game";
import { Highscores } from "./components/Highscores";

import { odin } from "./utils/axios";
import { Message } from "./utils/messages";

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
    alignItems: "center",
    "@media (max-width: 800px)": {
      fontSize: "2em"
    }
  },
  main: {
    display: "flex",
    height: "75%"
  },
  footer: {
    display: "flex",
    height: "10%",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: "0em 2em 0em 2em"
  }
});

export enum Levels {
  Beginner = "Beginner",
  Intermediate = "Intermediate"
  // Expert = "Expert"
}

export enum PlayingState {
  NotPlaying = 0,
  Playing = 1
}

export type Score = {
  name: string;
  time: number;
  level: Levels;
};

interface State {
  level: Levels;
  playing: PlayingState;
  scores: Score[];
}

function reducer(prev: State, msg: Message): State {
  switch (msg.type) {
    case "chgLvl":
      return {
        ...prev,
        level: msg.action
      };
    case "chgPlay":
      return {
        ...prev,
        playing: msg.action
      };
    case "getScs":
      return {
        ...prev,
        scores: msg.action
      };
    case "addScs":
      const newScores = [...prev.scores, msg.action];
      newScores.sort((prev, next) =>
        prev.time < next.time ? -1 : prev.time > next.time ? 1 : 0
      );
      return {
        ...prev,
        scores: newScores
      };
    default:
      return prev;
  }
}

const initialState: State = {
  level: Levels.Beginner,
  playing: PlayingState.NotPlaying,
  scores: []
};

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchItems = async () => {
      const scores = await odin.get(`/minesweeper/scores`);
      dispatch({ type: "getScs", action: scores.data.data as Score[] });
    };

    fetchItems();
  }, []);

  const sendScore = useCallback(
    async (name: string, time: number) => {
      try {
        await odin.post(`/minesweeper/scores`, {
          name,
          time,
          level: state.level
        });
        dispatch({
          type: "addScs",
          action: {
            name,
            time,
            level: state.level
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    [state.level]
  );

  const changeDifficulty = useCallback((level: Levels) => {
    dispatch({ type: "chgLvl", action: level });
  }, []);

  const changePlayState = useCallback((playState: PlayingState) => {
    dispatch({ type: "chgPlay", action: playState });
  }, []);

  return (
    <div className={css(styles.app)}>
      <header className={css(styles.header)}>Minesweeper</header>
      <main className={css(styles.main)}>
        <Settings level={state.level} changeDifficulty={changeDifficulty} />
        <Game
          level={state.level}
          playingState={state.playing}
          scores={state.scores}
          changePlayingState={changePlayState}
          sendScore={sendScore}
        />
        <Highscores level={state.level} scores={state.scores} />
      </main>
      <footer className={css(styles.footer)}>
        <h4>kengru</h4>
      </footer>
    </div>
  );
};
