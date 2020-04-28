import React from "react";
import { StyleSheet, css } from "aphrodite";

import { Levels, Score } from "../../App";

const styles = StyleSheet.create({
  highscores: {
    display: "flex",
    width: "15%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});

interface Props {
  level: Levels;
  scores: Score[];
}

export const Highscores = (props: Props) => {
  const scores = props.scores.map((score) =>
    score.level === props.level ? (
      <li key={score.name}>{`${score.name} - ${score.time}s`}</li>
    ) : null
  );

  return (
    <div className={css(styles.highscores)}>
      <h2>Top Scores:</h2>
      <ol>{scores}</ol>
    </div>
  );
};
