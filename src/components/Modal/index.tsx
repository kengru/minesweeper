import React, { useRef, useEffect, useState } from "react";
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
    padding: "10px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: "1em",
    backgroundColor: "#F4F4F4"
  },
  littleSpan: {
    marginTop: "8px",
    fontSize: "8px"
  },
  hidden: {
    display: "none"
  }
});

interface Props {
  open: boolean;
  time: number;
  message: string;
  record: boolean;
  close: () => void;
  sendScore: (name: string, time: number) => Promise<void>;
}

export const Modal = (props: Props) => {
  const [name, setName] = useState("");
  const { open, time, message, record, close, sendScore } = props;
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

  const enterPressed = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      await sendScore(name, time);
      close();
    }
  };

  if (record) {
    return (
      <div className={css(open ? styles.modal : styles.hidden)}>
        <div ref={paperRef} className={css(styles.paper)}>
          <h3>{message}</h3>
          <h5>That's a new record.</h5>
          <input
            type="text"
            placeholder="Name..."
            value={name}
            onChange={(event) => setName(event.target.value)}
            onKeyDown={enterPressed}
          />
          <span className={css(styles.littleSpan)}>Press enter to save.</span>
        </div>
      </div>
    );
  }

  return (
    <div className={css(open ? styles.modal : styles.hidden)}>
      <div ref={paperRef} className={css(styles.paper)}>
        <h3>{message}</h3>
      </div>
    </div>
  );
};
