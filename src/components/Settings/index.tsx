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
  level: Levels;
  changeDifficulty: (level: Levels) => void;
};

export const Settings = (props: Props) => {
  const onChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.changeDifficulty(Levels[event.currentTarget.value as keyof typeof Levels]);
  }

  const levels = () => {
    return Object.values(Levels).map(level => (
      <div key={level} className="radio">
        <label>
          <input type="radio" value={level} checked={props.level === level} onChange={onChangeRadio} />
            {level}
        </label>
      </div>
    ));
  }

  return (
    <div className={css(styles.settings)}>
      <form>{levels()}</form>
    </div>
  )
};