import React from "react";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  modal: {
    display: "flex",
    position: "absolute",
    width: "100%",
    height: "105%",
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(180, 180, 180, 0.40)"
  },
  paper: {
    display: "flex",
    height: "20%",
    width: "30%",
    opacity: 0.98,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "1em",
    backgroundColor: "#F4F4F4"
  },
  hidden: {
    display: "none"
  }
});

interface Props {
  open: boolean;
  message: string;
  close: () => void;
}

export const Modal = (props: Props) => {
  const { open, message, close } = props;

  return (
    <div
      className={css(open ? styles.modal : styles.hidden)}
      onClick={() => close()}
    >
      <div className={css(styles.paper)}>
        <h3>{message}</h3>
      </div>
    </div>
  );
};
