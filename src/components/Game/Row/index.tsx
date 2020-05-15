import React from "react";
import { StyleSheet, css } from "aphrodite";

import { Space } from "../Space";

const styles = StyleSheet.create({
  row: {
    display: "flex"
  }
});

interface Props {
  width: number;
  columns: number;
  setFlag: (x: number, y: number) => void;
}

export const Row = (props: Props) => {
  const spaces = [...Array(props.columns).keys()].map((element) => (
    <Space key={element} x={props.width} y={element} setFlag={props.setFlag} />
  ));

  return <div className={css(styles.row)}>{spaces}</div>;
};
