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
  mines: number[][];
  flags: boolean[][];
  revealed: boolean[][];
  checkMine: (x: number, y: number) => void;
  setFlag: (x: number, y: number) => void;
}

export const Row = (props: Props) => {
  const { width, columns, mines, flags, revealed, checkMine, setFlag } = props;
  const spaces = [...Array(columns).keys()].map((element) => (
    <Space
      key={element}
      x={width}
      y={element}
      mine={mines[width][element]}
      flag={flags[width][element]}
      revealed={revealed[width][element]}
      checkMine={checkMine}
      setFlag={setFlag}
    />
  ));

  return <div className={css(styles.row)}>{spaces}</div>;
};
