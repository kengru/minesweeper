import React from "react";
import { StyleSheet, css } from "aphrodite";

import { Levels } from "../../App";

const styles = StyleSheet.create({
  settings: {
    height: "100%",
    width: "15%"
  }
});

interface Props {
  changeDifficulty: (level: Levels) => void;
};

export const Settings = (props: Props) => {
  return (
    <div className={css(styles.settings)}></div>
  )
};