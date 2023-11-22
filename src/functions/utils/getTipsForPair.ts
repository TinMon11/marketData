import axios from "axios";
import { Request, Response } from "express";
import { getSnapshot } from "../webSocket";
import { isAllowedPair } from "./utils";

export async function getTipsForPair(req: Request, res: Response) {
  try {
    const { pair } = req.params;
    if (!isAllowedPair(pair))
      return res.status(400).send({
        message: "Pair not allowed",
        error: null,
      });

    const snapshot = getSnapshot(pair);
    return res.status(200).send({
      message: "Last Data for Pair",
      data: snapshot[0],
      error: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send({
      data: null,
      error: "Internal Server Error. Please contact Support",
    });
  }
}
