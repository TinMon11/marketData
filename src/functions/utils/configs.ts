import { WebSocket } from "ws";

export const connections: Record<string, WebSocket[]> = {
  "BTC-USD": [],
  "ETH-USD": [],
};
