import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const wsRef = useRef<WebSocket>();
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("initial socket");
    wsRef.current = new WebSocket("ws://localhost:3001");
    const { current: ws } = wsRef;

    ws.addEventListener("open", () => {
      console.log("open socket");
      ws.send("test");
    });
    ws.addEventListener("message", (msg) => {
      console.log({ msg });
      setMessage(msg.data);
    });
  }, []);

  return <div className={styles.container}>hello, world {message}</div>;
};

export default Home;
