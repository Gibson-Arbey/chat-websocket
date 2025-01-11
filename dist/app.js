"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 3000 });
wss.on("connection", function connection(ws) {
    console.log("cliente conectado");
    ws.on("error", console.error);
    ws.on("message", function message(data) {
        console.log("received: %s", data);
    });
    ws.send("hola desde el servidor");
});
