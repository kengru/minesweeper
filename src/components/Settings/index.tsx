import React from "react";
import { StyleSheet, css } from "aphrodite";

import { Levels } from "../../App";

const styles = StyleSheet.create({
  settings: {
    height: "100%",
    width: "20%",
    "@media (max-width: 900px)": {
      display: "none"
    }
  },
  form: {
    display: "flex",
    height: "100%",
    marginLeft: "2em",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  radio: {
    margin: "2em 0em 2em 0em"
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    fontSize: "1.5em",
    "@media (max-width: 1200px)": {
      fontSize: "1em"
    }
  },
  radioInput: {
    height: "2.2em",
    width: "2.2em",
    margin: "0em 1em 0em 0em"
  }
});

interface Props {
  level: Levels;
  changeDifficulty: (level: Levels) => void;
}

export const Settings = (props: Props) => {
  const onChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.changeDifficulty(
      Levels[event.currentTarget.value as keyof typeof Levels]
    );
  };

  const levels = Object.values(Levels).map((level) => (
    <div key={level} className={css(styles.radio)}>
      <label className={css(styles.radioLabel)}>
        <input
          type="radio"
          className={css(styles.radioInput)}
          value={level}
          checked={props.level === level}
          onChange={onChangeRadio}
        />
        {level}
      </label>
    </div>
  ));

  return (
    <div className={css(styles.settings)}>
      <form className={css(styles.form)}>{levels}</form>
    </div>
  );
};
