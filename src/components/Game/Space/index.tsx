import React from "react";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  space: {
    backgroundColor: "black",
    margin: "0.1em",
    height: "2em",
    width: "2em"
  }
});

interface Props {
  x: number;
  y: number;
}

export const Space = (props: Props) => {
  return (
    <div className={css(styles.space)}>
      
    </div>
  );
};
