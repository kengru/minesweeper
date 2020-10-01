import React, { useRef, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  modal: {
    display: "flex",
    position: "absolute",
    top: "0px",
    width: "100%",
    height: "100%",
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
    textAlign: "center",
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
  const paperRef = useRef<HTMLDivElement>(null);

  const useClickedOutside = (ref: React.RefObject<HTMLDivElement>) => {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          close();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [ref]);
  };

  useClickedOutside(paperRef);

  return (
    <div className={css(open ? styles.modal : styles.hidden)}>
      <div ref={paperRef} className={css(styles.paper)}>
        <h3>{message}</h3>
      </div>
    </div>
  );
};
