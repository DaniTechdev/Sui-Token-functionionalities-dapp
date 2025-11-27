// utils/sui.ts
// import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";

// import { Transaction } from "@mysten/sui.js/transactions";
import { Transaction } from "@mysten/sui/transactions";

import { TESTNET_HELLO_WORLD_PACKAGE_ID } from "../constants.ts";

export const suiClient = new SuiClient({ url: getFullnodeUrl("testnet") });

export const MODULE_PACKAGE_ID =
  TESTNET_HELLO_WORLD_PACKAGE_ID || "0xYOUR_PACKAGE_ID";
export const MODULE_NAME = "natochi";
export const COIN_TYPE = `${MODULE_PACKAGE_ID}::${MODULE_NAME}::NATOCHI`;

export const createTransaction = () => {
  return new Transaction();
};

export const executeTransaction = async (
  tx: Transaction,
  signAndExecute: any,
) => {
  return await signAndExecute({ transaction: tx });
};
