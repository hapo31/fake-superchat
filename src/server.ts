import express from "express";
import next from "next";
import { WebSocketServer, WebSocket } from "ws";

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const port = parseInt(process.env.PORT || "3000", 10);
const handle = nextApp.getRequestHandler();

const expressApp = express();

nextApp.prepare().then(() => {
  let connections: WebSocket[] = [];
  const wss = new WebSocketServer({ port: port + 1 });

  wss.on("connection", (ws) => {
    connections.push(ws);
    ws.on("message", (message) => {
      console.log("message: %s", message);
      ws.send("pong");
    });
    ws.on("close", (code, reason) => {
      console.log("close: %s", reason.toString("utf-8"));
    });
  });

  expressApp.all("*", (req, res) => {
    return handle(req, res);
  });
  expressApp.listen(port);
});
