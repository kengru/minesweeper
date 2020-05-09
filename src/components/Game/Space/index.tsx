import React, { useCallback, useState } from "react";
import { StyleSheet, css } from "aphrodite";

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
    backgroundColor: ""
  },
  revealed: {
    backgroundColor: ""
  }
});

interface Props {
  x: number;
  y: number;
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
      console.log(`RightClicked: ${props.x} ${props.y}`);
    },
    [props.x, props.y]
  );

  return (
    <div
      onClick={leftClicked}
      onContextMenu={rightClicked}
      className={css(
        styles.space,
        styles.default,
        flag ? styles.flag : {},
        revealed ? styles.revealed : {}
      )}
    ></div>
  );
};
