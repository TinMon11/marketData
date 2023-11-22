import { Server as WebSocketServer, WebSocket } from "ws";
import { connections } from "./utils/configs";

const snapshots: Record<string, any[]> = {};

const mapOfConnections: Record<number, string> = {};

export function initWebSocket(wss: WebSocketServer) {
  const ws = require("ws");

  const bitfinexWebSocket = new ws("wss://api-pub.bitfinex.com/ws/2");

  // For each connection, initialize the WebSocket connection
  Object.keys(connections).forEach((pair) => {
    bitfinexWebSocket.on("open", () => {
      const suscribeMsg = JSON.stringify({
        event: "subscribe",
        channel: "ticker",
        symbol: "t" + pair.replace("-", ""),
      });

      bitfinexWebSocket.send(suscribeMsg);
    });
  });

  bitfinexWebSocket.on("message", (message: string) => {
    const data = JSON.parse(message);

    // If it's the subscription confirmation message, add the connection to the map
    if (data.event === "subscribed") {
      mapOfConnections[data.chanId] = data.symbol;
      return;
    }

    if (data.length && data[1] !== "hb" && !data.event) {
      const responseData = {
        Bid: data[1][0],
        BidSize: data[1][1],
        Ask: data[1][2],
        AskSize: data[1][3],
        LastPrice: data[1][6],
      };

      const symbol = mapOfConnections[data[0]];
      snapshots[symbol] = [responseData];
    }
  });
}

// Util to get the last snapshot for a pair
export function getSnapshot(pair: string): any[] {
  const symbol = "t" + pair.replace("-", "");
  return snapshots[symbol] || [];
}
