import React, { useMemo } from "react";
import { StyleSheet, css } from "aphrodite";

import Flag from "../../../images/flagIcon.svg";

const styles = StyleSheet.create({
  space: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0.06em",
    height: "2em",
    width: "2em",
    backgroundColor: "#BDBDBD",
    transition: "background-color 500ms linear"
  },
  flag: {
    backgroundImage: `url(${Flag})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "20px 20px"
  },
  revealed: {
    backgroundColor: "#E3DCDC",
    transition: "background-color 150ms linear"
  },
  one: {
    color: "#00BFFF"
  },
  two: {
    color: "#228B22"
  },
  three: {
    color: "#DC143C"
  },
  four: {
    color: "#000080"
  },
  five: {
    color: "#4B0082"
  }
});

interface Props {
  x: number;
  y: number;
  nearValue: number;
  mine: number;
  flag: boolean;
  revealed: boolean;
  checkMine: (x: number, y: number) => void;
  setFlag: (x: number, y: number) => void;
}

export const Space = (props: Props) => {
  const { x, y, nearValue, flag, revealed, checkMine, setFlag } = props;

  const leftClicked = () => {
    if (!flag) checkMine(x, y);
  };

  const rightClicked = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!revealed) setFlag(x, y);
  };

  const spaceColor: object | null = useMemo(() => {
    switch (nearValue) {
      case 1:
        return styles.one;
      case 2:
        return styles.two;
      case 3:
        return styles.three;
      case 4:
        return styles.four;
      case 5:
        return styles.five;
      default:
        return null;
    }
  }, [nearValue]);

  return (
    <div
      onClick={leftClicked}
      onContextMenu={rightClicked}
      className={css(
        styles.space,
        spaceColor,
        flag ? styles.flag : null,
        revealed ? styles.revealed : null
      )}
    >
      {revealed ? (nearValue !== 0 ? nearValue : "") : ""}
    </div>
  );
};
