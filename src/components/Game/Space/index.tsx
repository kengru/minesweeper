import React, { useCallback, useState } from "react";
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
  setFlag: (x: number, y: number) => void;
}

export const Space = (props: Props) => {
  const [flag, setFlag] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const leftClicked = useCallback(() => {
    console.log(`LeftClicked: ${props.x} ${props.y}`);
  }, [props.x, props.y]);

  const rightClicked = useCallback(
    (event) => {
      event.preventDefault();
      props.setFlag(props.x, props.y);
      setFlag(!flag);
      console.log(`RightClicked: ${props.x} ${props.y}`);
    },
    [flag, props]
  );

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
