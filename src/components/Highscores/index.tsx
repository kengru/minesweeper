import React from "react";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  highscores: {
    height: "100%",
    width: "15%"
  }
});

export const Highscores = () => {
  return (
    <div className={css(styles.highscores)}></div>
  )
};