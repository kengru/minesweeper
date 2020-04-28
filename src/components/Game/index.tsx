import React from "react";
import { StyleSheet, css } from "aphrodite";

import { Levels } from "../../App";

const styles = StyleSheet.create({
  game: {
    height: "100%",
    width: "70%"
  }
});

interface Props {
  level: Levels;
};

export const Game = (props: Props) => {
  return (
    <div className={css(styles.game)}>
      {props.level}
    </div>
  )
};