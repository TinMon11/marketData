import { Request, Response } from "express";
import { getSnapshot } from "../webSocket";
import { isAllowedPair } from "./utils";

export function getEffectivePrice(req: Request, res: Response) {
  try {
    const { pair, operation, amount } = req.body;

    if (!isAllowedPair(pair))
      return res.status(400).send({
        message: "Pair not allowed",
        error: null,
      });
    // Obtener el snapshot más reciente para el par
    const snapshot = getSnapshot(pair);

    if (!snapshot.length) {
      return res
        .status(400)
        .json({ error: "No hay datos disponibles para este par" });
    }

    const bidPrice = snapshot[0].Bid;
    const askPrice = snapshot[0].Ask;

    let effectivePrice = 0;
    if (operation === "buy") {
      effectivePrice = bidPrice;
    } else if (operation === "sell") {
      effectivePrice = askPrice;
    } else {
      return res
        .status(400)
        .json({ error: "Not a valid operation. Use buy or sell" });
    }

    const totalCost = effectivePrice * parseFloat(amount);

    return res.status(200).json({
      pair,
      operation,
      amount: parseFloat(amount),
      effectivePrice,
      totalCost,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error. Contact Support" });
  }
}
