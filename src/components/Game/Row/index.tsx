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
}

export const Row = (props: Props) => {
  const spaces = [...Array(props.columns).keys()].map((element) => (
    <Space key={element} x={props.width} y={element} />
  ));

  return <div className={css(styles.row)}>{spaces}</div>;
};
