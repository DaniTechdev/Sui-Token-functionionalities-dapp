// hooks/useToken.ts
import { useState, useEffect } from "react";
// import { useWalletKit } from "@mysten/wallet-kit";
import {
  useSignAndExecuteTransaction,
  useSuiClient,
  useSuiClientQuery,
  useCurrentAccount,
} from "@mysten/dapp-kit";
import {
  suiClient,
  MODULE_PACKAGE_ID,
  COIN_TYPE,
  createTransaction,
  MODULE_NAME,
  executeTransaction,
} from "../utils/sui";
import { TokenInfo, TokenObjects, TransactionResult } from "../types/token";

export const useToken = () => {
  //   const { currentAccount, signAndExecuteTransaction } = useWalletKit();
  const currentAccount = useCurrentAccount();
  // const { signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction(); // Fixed this line

  // const [tokenInfo, setTokenInfo] = useState(null);
  const [tokenInfo, setTokenInfo] = useState<TokenInfo>({
    name: "Natochi",
    symbol: "Nat",
    decimals: 9,
    totalSupply: "0",
    maxSupply: "0",
    remainingSupply: "0",
    isPaused: false,
  });

  console.log("tokenInfo", tokenInfo);

  const [objects, setObjects] = useState<TokenObjects>({
    treasuryCap: null,
    totalSupply: null,
    transferPause: null,
    metadata: null,
  });
  const [loading, setLoading] = useState(false);

  // // Fetch token objects for the current account
  // const fetchTokenObjects = async () => {
  //   if (!currentAccount) return;

  //   try {
  //     const ownedObjects = await suiClient.getOwnedObjects({
  //       owner: currentAccount.address,
  //       options: { showContent: true },
  //     });

  //     const coinType =
  //       "0x51f1fca8a9d0dc6c29ebb6490e227e7da053431fa4b3001bdd075c3501679c10::natochi::NATOCHI";
  //     const metadata = await suiClient.getCoinMetadata({ coinType });
  //     if (metadata) {
  //       console.log("Token Metadata:", metadata);
  //       // Update your token info state
  //       setTokenInfo((prev) => ({
  //         ...prev,
  //         name: metadata.name,
  //         symbol: metadata.symbol,
  //         decimals: metadata.decimals,
  //         description: metadata.description,
  //         iconUrl: metadata.iconUrl,
  //       }));
  //     } else {
  //       console.log("Metadata not found for this coin type.");
  //     }

  //     const owned = await suiClient.getOwnedObjects({
  //       owner:
  //         "0x87d0f68dfe132fe3244dd4dca2ec1875f1727995d7325e558808736801c7831e",
  //       options: { showContent: true, showType: true },
  //     });
  //     // console.log(owned.data.map((o) => o.data?.content?.type));

  //     // console.log("OwnedObjects:", ownedObjects);

  //     // const newObjects = {
  //     //   treasuryCap: null,
  //     //   totalSupply: null,
  //     //   transferPause: null,
  //     //   metadata: null,
  //     // };
  //     // Initialize with proper types that match TokenObjects interface
  //     const newObjects: TokenObjects = {
  //       treasuryCap: null,
  //       totalSupply: null,
  //       transferPause: null,
  //       metadata: null,
  //     };

  //     // Hardcode metadata since CoinMetadata object doesn't exist
  //     const hardcodedMetadata = {
  //       name: "Natochi Token",
  //       symbol: "NATOCHI",
  //       decimals: 9,
  //       description: "",
  //       iconUrl: "",
  //     };

  //     setTokenInfo((prev) => ({
  //       ...prev,
  //       // ...hardcodedMetadata,
  //       name: hardcodedMetadata.name,
  //       symbol: hardcodedMetadata.symbol,
  //       decimals: hardcodedMetadata.decimals,
  //     }));

  //     ownedObjects.data.forEach((obj) => {
  //       // console.log("OwnObject", obj);

  //       const content = obj.data?.content;
  //       if (content?.dataType === "moveObject") {
  //         const type = content.type;

  //         // console.log("object types", type);

  //         if (type.includes("TreasuryCap")) {
  //           newObjects.treasuryCap = obj.data?.objectId || null;
  //         } else if (type.includes("TotalSupply")) {
  //           newObjects.totalSupply = obj.data?.objectId || null;
  //           // Extract supply info
  //           const fields = content.fields as any;
  //           setTokenInfo((prev) => ({
  //             ...prev,
  //             totalSupply: fields.current_supply,
  //             maxSupply: fields.max_supply,
  //             remainingSupply: (
  //               fields.max_supply - fields.current_supply
  //             ).toString(),
  //           }));
  //         } else if (type.includes("TransferPause")) {
  //           newObjects.transferPause = obj.data?.objectId || null;
  //           const fields = content.fields as any;
  //           setTokenInfo((prev) => ({
  //             ...prev,
  //             isPaused: fields.paused,
  //           }));
  //         } else if (type.includes("MetadataCap")) {
  //           console.log("type metadataa", type);

  //           console.log("content . field", content.fields);

  //           newObjects.metadata = obj.data?.objectId || null;
  //           const fields = content.fields as any;
  //           setTokenInfo((prev) => ({
  //             ...prev,
  //             name: fields.name,
  //             symbol: fields.symbol,
  //             decimals: fields.decimals,
  //           }));
  //         }
  //       }
  //     });

  //     setObjects(newObjects);
  //   } catch (error) {
  //     console.error("Error fetching token objects:", error);
  //   }
  // };

  // const fetchTokenObjects = async () => {
  //   if (!currentAccount) return;

  //   try {
  //     const ownedObjects = await suiClient.getOwnedObjects({
  //       owner: currentAccount.address,
  //       options: { showContent: true },
  //     });

  //     // Look for TreasuryCap to extract coin type dynamically
  //     let coinType: any = null;

  //     console.log("CoinType", coinType);

  //     const newObjects: TokenObjects = {
  //       treasuryCap: null,
  //       totalSupply: null,
  //       transferPause: null,
  //       metadata: null,
  //     };

  //     // First pass: find TreasuryCap to get coin type
  //     ownedObjects.data.forEach(async (obj) => {
  //       const content = obj.data?.content;
  //       if (content?.dataType === "moveObject") {
  //         const type = content.type;

  //         if (type.includes("TreasuryCap")) {
  //           // Extract coin type from TreasuryCap type
  //           const match = type.match(/TreasuryCap<([^>]+)>/);
  //           if (match && match[1]) {
  //             coinType = await match[1];
  //             // const metadata = await suiClient.getCoinMetadata({
  //             //   coinType: match[1],
  //             // });

  //             // console.log("coint MetaData", metadata);

  //             // console.log("match, match[1]", match[1]);

  //             const objects = await suiClient.getOwnedObjects({
  //               owner: currentAccount.address,
  //               filter: {
  //                 StructType: `0x2::coin::CoinMetadata<${coinType}>`,
  //               },
  //               options: { showContent: true },
  //             });

  //             console.log("Found CoinMetadata objects:", objects);
  //           }
  //           newObjects.treasuryCap = obj.data?.objectId || null;
  //         }
  //       }
  //     });

  //     // Fetch metadata if we found coin type
  //     if (coinType) {
  //       const metadata = await suiClient.getCoinMetadata({ coinType });

  //       console.log("coin metaData", metadata);

  //       if (metadata) {
  //         console.log("Token Metadata:", metadata);
  //         setTokenInfo((prev) => ({
  //           ...prev,
  //           name: metadata.name,
  //           symbol: metadata.symbol,
  //           decimals: metadata.decimals,
  //           description: metadata.description,
  //           iconUrl: metadata.iconUrl,
  //         }));
  //       } else {
  //         console.log("Metadata not found for coin type:", coinType);
  //       }
  //     }

  //     // Second pass: process other objects
  //     ownedObjects.data.forEach((obj) => {
  //       const content = obj.data?.content;
  //       if (content?.dataType === "moveObject") {
  //         const type = content.type;

  //         if (type.includes("TotalSupply")) {
  //           newObjects.totalSupply = obj.data?.objectId || null;
  //           const fields = content.fields as any;
  //           setTokenInfo((prev) => ({
  //             ...prev,
  //             totalSupply: fields.current_supply,
  //             maxSupply: fields.max_supply,
  //             remainingSupply: (
  //               fields.max_supply - fields.current_supply
  //             ).toString(),
  //           }));
  //         } else if (type.includes("TransferPause")) {
  //           newObjects.transferPause = obj.data?.objectId || null;
  //           const fields = content.fields as any;
  //           setTokenInfo((prev) => ({
  //             ...prev,
  //             isPaused: fields.paused,
  //           }));
  //         }
  //       }
  //     });

  //     setObjects(newObjects);
  //   } catch (error) {
  //     console.error("Error fetching token objects:", error);
  //   }
  // };
  // Mint tokens

  // const fetchTokenObjects = async () => {
  //   if (!currentAccount) return;

  //   try {
  //     const ownedObjects = await suiClient.getOwnedObjects({
  //       owner: currentAccount.address,
  //       options: { showContent: true, showType: true },
  //     });

  //     const newObjects: any = {
  //       treasuryCap: null,
  //       totalSupply: null,
  //       transferPause: null,
  //       metadata: null,
  //     };

  //     // Helper to decode vector<u8> → string
  //     const decodeBytes = (b: any) => {
  //       if (!b) return "";
  //       const arr = Array.isArray(b) ? b : (b.bytes ?? b.vec ?? []);
  //       return String.fromCharCode(...arr);
  //     };

  //     for (const obj of ownedObjects.data) {
  //       const content = obj.data?.content;
  //       if (!content || content.dataType !== "moveObject") continue;

  //       const type = content.type;

  //       // 🔥 STEP 1 — detect MetadataCap
  //       if (type.includes("MetadataCap")) {
  //         const metadataCapId = obj?.data?.objectId;
  //         newObjects.metadata = metadataCapId;

  //         console.log("-- METADATA CAP FOUND --", metadataCapId);

  //         // 🔥 STEP 2 — fetch MetadataCap fields
  //         const capObj = await suiClient.getObject({
  //           objectId: metadataCapId,
  //           options: { showContent: true },
  //         });

  //         const capFields = capObj.data?.content?.fields;
  //         console.log("MetadataCap fields:", capFields);

  //         // There is ALWAYS:  metadata_object field
  //         const realMetadataId = capFields.metadata_object;
  //         console.log("Real metadata object id:", realMetadataId);

  //         // 🔥 STEP 3 — fetch actual metadata object
  //         const metaObj = await suiClient.getObject({
  //           objectId: realMetadataId,
  //           options: { showContent: true },
  //         });

  //         const metaFields = metaObj.data?.content?.fields;
  //         console.log("Real metadata fields:", metaFields);

  //         // 🔥 STEP 4 — decode & push to state
  //         setTokenInfo((prev) => ({
  //           ...prev,
  //           name: decodeBytes(metaFields.name),
  //           symbol: decodeBytes(metaFields.symbol),
  //           decimals: metaFields.decimals,
  //           description: decodeBytes(metaFields.description),
  //           iconUrl: decodeBytes(metaFields.icon_url),
  //         }));
  //       }

  //       // existing TotalSupply, TreasuryCap, etc...
  //     }

  //     setObjects(newObjects);
  //   } catch (err) {
  //     console.error("Error fetching token objects:", err);
  //   }
  // };

  const fetchTokenObjects = async () => {
    if (!currentAccount) return;

    try {
      const ownedObjects = await suiClient.getOwnedObjects({
        owner: currentAccount.address,
        options: { showContent: true, showType: true },
      });

      const newObjects: TokenObjects = {
        treasuryCap: null,
        totalSupply: null,
        transferPause: null,
        metadata: null,
      };

      // Helper to decode vector<u8>
      const decodeBytes = (value: any) => {
        if (!value) return "";
        const arr = Array.isArray(value)
          ? value
          : (value.bytes ?? value.vec ?? []);
        return String.fromCharCode(...arr);
      };

      // Loop owned objects
      for (const obj of ownedObjects.data) {
        const content = obj.data?.content;
        if (!content || content.dataType !== "moveObject") continue;

        const type = content.type;

        // ============================
        // 🔥 METADATA CAP HANDLING
        // ============================
        if (type.includes("MetadataCap")) {
          const metadataCapId = obj.data!.objectId;
          newObjects.metadata = metadataCapId;

          console.log("Found MetadataCap:", metadataCapId);

          // 1️⃣ Fetch MetadataCap object
          const capObj = await suiClient.getObject({
            id: metadataCapId,
            options: { showContent: true },
          });

          const capFields = capObj.data?.content?.fields;
          console.log("MetadataCap fields:", capFields);

          // Must find "metadata_object" field
          const realMetadataId = capFields?.metadata_object;
          console.log("Real Metadata Object ID:", realMetadataId);

          if (!realMetadataId) continue;

          // 2️⃣ Fetch REAL metadata object
          const metaObj = await suiClient.getObject({
            id: realMetadataId,
            options: { showContent: true },
          });

          const metaFields = metaObj.data?.content?.fields;
          console.log("REAL Metadata Fields:", metaFields);

          // 3️⃣ Update state with decoded values
          setTokenInfo((prev) => ({
            ...prev,
            name: decodeBytes(metaFields.name),
            symbol: decodeBytes(metaFields.symbol),
            decimals: metaFields.decimals,
            description: decodeBytes(metaFields.description),
            iconUrl: decodeBytes(metaFields.icon_url),
          }));
        }

        // ============================
        // 🔥 TREASURY CAP
        // ============================
        if (type.includes("TreasuryCap")) {
          newObjects.treasuryCap = obj.data!.objectId;
        }

        // ============================
        // 🔥 TOTAL SUPPLY
        // ============================
        // if (type.includes("TotalSupply")) {
        //   const fields = content.fields as any;

        //   newObjects.totalSupply = obj.data!.objectId;

        //   setTokenInfo((prev) => ({
        //     ...prev,
        //     totalSupply: fields.current_supply,
        //     maxSupply: fields.max_supply,
        //     remainingSupply: (
        //       fields.max_supply - fields.current_supply
        //     ).toString(),
        //   }));
        // }

        const formatTokenAmount = (
          raw: string | number,
          decimals: number,
          symbol: string,
        ) => {
          const rawStr = raw.toString();
          const padded = rawStr.padStart(decimals + 1, "0");

          const integer = padded.slice(0, padded.length - decimals);
          const fractional = padded
            .slice(padded.length - decimals)
            .replace(/0+$/, ""); // trim trailing zeros

          return fractional
            ? `${integer}.${fractional} ${symbol}`
            : `${integer} ${symbol}`;
        };

        if (type.includes("TotalSupply")) {
          const fields = content.fields as any;

          newObjects.totalSupply = obj.data!.objectId;

          setTokenInfo((prev) => {
            const formattedSupply = formatTokenAmount(
              fields.current_supply,
              prev.decimals ?? 9, // decimals loaded later from metadata
              prev.symbol ?? "NATOCHI", // symbol loaded later from metadata
            );

            const formattedMax = formatTokenAmount(
              fields.max_supply,
              prev.decimals ?? 9,
              prev.symbol ?? "NATOCHI",
            );

            const remaining = fields.max_supply - fields.current_supply;
            const formattedRemaining = formatTokenAmount(
              remaining,
              prev.decimals ?? 9,
              prev.symbol ?? "NATOCHI",
            );

            return {
              ...prev,
              totalSupply: formattedSupply,
              maxSupply: formattedMax,
              remainingSupply: formattedRemaining,
            };
          });
        }

        // ============================
        // 🔥 TRANSFER PAUSE
        // ============================
        if (type.includes("TransferPause")) {
          const fields = content.fields as any;

          newObjects.transferPause = obj.data!.objectId;

          setTokenInfo((prev) => ({
            ...prev,
            isPaused: fields.paused,
          }));
        }
      }

      setObjects(newObjects);
    } catch (error) {
      console.error("Error fetching token objects:", error);
    }
  };

  // const mintTokens = async (amount, recipient) => {

  //   if (!objects.treasuryCap || !objects.totalSupply) {
  //     return { success: false, error: "Missing required objects" };
  //   }

  //   setLoading(true);
  //   try {
  //     const tx = createTransaction();

  //     tx.moveCall({
  //       target: `${MODULE_PACKAGE_ID}::${MODULE_NAME}::mint`,
  //       arguments: [
  //         tx.object(objects.treasuryCap),
  //         tx.object(objects.totalSupply),
  //         tx.pure.u64(amount),
  //         tx.pure.address(recipient),
  //       ],
  //     });

  //     // const result = await executeTransaction(tx, signAndExecuteTransaction);
  //     // Use signAndExecuteTransaction directly

  //     const result = await signAndExecuteTransaction({
  //       transaction: tx,
  //     });

  //     console.log("result", result);

  //     await fetchTokenObjects(); // Refresh data

  //     // return { success: true, digest: result };
  //   } catch (error) {
  //     return { success: false, error: error };
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Burn tokens

  const toRawAmount = (amountStr, decimals) => {
    const [integer, fraction = ""] = amountStr.split(".");

    // Pad fractional to correct decimals
    const paddedFraction = (fraction + "0".repeat(decimals)).slice(0, decimals);

    return BigInt(integer + paddedFraction).toString();
  };

  const mintTokens = async (amount, recipient) => {
    if (!objects.treasuryCap || !objects.totalSupply) {
      return { success: false, error: "Missing required objects" };
    }

    if (!tokenInfo.decimals || !tokenInfo.symbol) {
      return { success: false, error: "Token metadata missing" };
    }

    setLoading(true);
    try {
      // Convert human-readable amount → raw u64 for contract
      const rawAmount = toRawAmount(amount.toString(), tokenInfo.decimals);

      console.log("Minting raw amount:", rawAmount);

      const tx = createTransaction();

      tx.moveCall({
        target: `${MODULE_PACKAGE_ID}::${MODULE_NAME}::mint`,
        arguments: [
          tx.object(objects.treasuryCap),
          tx.object(objects.totalSupply),
          tx.pure.u64(rawAmount), // <-- FIXED: always raw amount
          tx.pure.address(recipient),
        ],
      });

      const result = await signAndExecuteTransaction({
        transaction: tx,
      });

      console.log("Mint result:", result);

      await fetchTokenObjects(); // Refresh UI

      return { success: true, digest: result.digest };
    } catch (error) {
      console.error("Mint error:", error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const burnTokens = async (coinObjectId, amount) => {
    console.log("coinObjectId", "amount", coinObjectId, amount);

    if (!objects.treasuryCap || !objects.totalSupply) {
      return { success: false, error: "Missing required objects" };
    }

    setLoading(true);
    try {
      const tx = createTransaction();

      if (amount) {
        // If amount specified, split first then burn
        const coin = tx.object(coinObjectId);
        const splitCoin = tx.moveCall({
          // target: `0x2::coin::split`,
          target: `${MODULE_PACKAGE_ID}::${MODULE_NAME}::safe_split`,
          arguments: [coin, tx.pure.u64(amount)],
        });

        tx.moveCall({
          target: `${MODULE_PACKAGE_ID}::${MODULE_NAME}::burn`,
          arguments: [
            tx.object(objects.treasuryCap),
            tx.object(objects.totalSupply),
            splitCoin,
          ],
        });
      } else {
        // Burn entire coin
        tx.moveCall({
          target: `${MODULE_PACKAGE_ID}::${MODULE_NAME}::burn`,
          arguments: [
            tx.object(objects.treasuryCap),
            tx.object(objects.totalSupply),
            tx.object(coinObjectId),
          ],
        });
      }

      // const result = await executeTransaction(tx, signAndExecuteTransaction);
      // Use signAndExecuteTransaction directly
      const result = await signAndExecuteTransaction({
        transaction: tx,
      });

      // console.log("Full result:", JSON.stringify(result, null, 2));
      // console.log("Result digest:", result.digest);
      // console.log("Result properties:", Object.keys(result));
      await fetchTokenObjects();
      // console.log("Full result:", JSON.stringify(result, null, 2));

      return { success: true };
    } catch (error) {
      return { success: false, error: error };
    } finally {
      setLoading(false);
    }
  };

  // Pause/Unpause transfers
  const toggleTransfers = async (pause) => {
    if (!objects.transferPause) {
      return { success: false, error: "Transfer pause object not found" };
    }

    setLoading(true);
    try {
      const tx = createTransaction();
      const functionName = pause ? "pause_transfers" : "unpause_transfers";

      tx.moveCall({
        target: `${MODULE_PACKAGE_ID}::${MODULE_NAME}::${functionName}`,
        arguments: [tx.object(objects.transferPause)],
      });

      // const result = await executeTransaction(tx, signAndExecuteTransaction);
      const result = await signAndExecuteTransaction({
        transaction: tx,
      });
      await fetchTokenObjects();

      return { success: true, digest: result.digest };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Transfer authority
  const transferAuthority = async (objectType, newOwner) => {
    const objectId = objects[objectType];
    if (!objectId) {
      return { success: false, error: `${objectType} not found` };
    }

    setLoading(true);
    try {
      const tx = createTransaction();
      const functionName = `transfer_${objectType === "treasuryCap" ? "minting_authority" : objectType === "totalSupply" ? "supply_tracker" : "pause_controller"}`;

      tx.moveCall({
        target: `${MODULE_PACKAGE_ID}::${MODULE_NAME}::${functionName}`,
        arguments: [tx.object(objectId), tx.pure.address(newOwner)],
      });

      const result = await executeTransaction(tx, signAndExecuteTransaction);
      await fetchTokenObjects();

      return { success: true, digest: result.digest };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Safe transfer
  const safeTransfer = async (coinObjectId, recipient) => {
    if (!objects.transferPause) {
      return { success: false, error: "Transfer pause object not found" };
    }

    setLoading(true);
    try {
      const tx = createTransaction();

      tx.moveCall({
        target: `${MODULE_PACKAGE_ID}::${MODULE_NAME}::safe_transfer`,
        arguments: [
          tx.object(objects.transferPause),
          tx.object(coinObjectId),
          tx.pure.address(recipient),
        ],
      });

      const result = await executeTransaction(tx, signAndExecuteTransaction);

      return { success: true, digest: result.digest };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentAccount) {
      fetchTokenObjects();
    }
  }, [currentAccount]);

  return {
    tokenInfo,
    objects,
    loading,
    mintTokens,
    burnTokens,
    toggleTransfers,
    transferAuthority,
    safeTransfer,
    refreshData: fetchTokenObjects,
  };
};
