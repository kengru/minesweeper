import React from "react";
import { StyleSheet, css } from "aphrodite";

import Flag from "../../../images/flagIcon.svg";

const styles = StyleSheet.create({
  space: {
    margin: "0.08em",
    height: "2em",
    width: "2em"
  },
  default: {
    backgroundColor: "#BDBDBD"
  },
  flag: {
    backgroundImage: `url(${Flag})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  },
  revealed: {
    backgroundColor: "#E3DCDC"
  }
});

interface Props {
  x: number;
  y: number;
  mine: number;
  flag: boolean;
  revealed: boolean;
  checkMine: (x: number, y: number) => void;
  setFlag: (x: number, y: number) => void;
}

export const Space = (props: Props) => {
  const { x, y, flag, revealed, checkMine, setFlag } = props;

  const leftClicked = () => {
    checkMine(x, y);
    console.log(`LeftClicked: ${x} ${y}`);
  };

  const rightClicked = (event: React.MouseEvent) => {
    event.preventDefault();
    setFlag(x, y);
    console.log(`RightClicked: ${x} ${y}`);
  };

  return (
    <div
      onClick={leftClicked}
      onContextMenu={rightClicked}
      className={css(
        styles.space,
        styles.default,
        flag ? styles.flag : styles.space,
        revealed ? styles.revealed : styles.space
      )}
    ></div>
  );
};
