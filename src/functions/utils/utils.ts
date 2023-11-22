import { connections } from "./configs";

export const isAllowedPair = (pair: string) => {
  return Object.keys(connections).includes(pair);
};
