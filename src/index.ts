import express from "express";
import http from "http";
import { Server } from "ws";
import { getTipsForPair } from "./functions/utils/getTipsForPair";
import { initWebSocket } from "./functions/webSocket";
import { getEffectivePrice } from "./functions/utils/getEffectivePrice";

const app = express();
app.use(express.json());
export const server = http.createServer(app);

// Inicializar WebSocket para el par BTC-USD al levantar el servidor
const wss = new Server({ server });
initWebSocket(wss);

// Endpoint que recibe un par de divisas y devuelve el orderBook (por ejemplo, BTC/USDT)
app.get("/orderBook/:pair/tips", getTipsForPair);

app.post("/effectivePrice", getEffectivePrice);

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
