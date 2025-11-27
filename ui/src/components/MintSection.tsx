// // components/MintSection.tsx
// import React, { useState } from "react";
// // @ts-ignore
// import { useToken } from "../hooks/useToken";
// import { TokenObjects } from "../types/token";

// interface MintSectionProps {
//   objects: TokenObjects;
// }

// const MintSection: React.FC<MintSectionProps> = ({ objects }) => {
//   const [amount, setAmount] = useState("");
//   const [recipient, setRecipient] = useState("");
//   const { mintTokens, loading } = useToken();

//   const handleMint = async () => {
//     if (!amount || !recipient) return;

//     const result = await mintTokens(amount, recipient);
//     if (result.success) {
//       alert(`Tokens minted successfully! TX: ${result.digest}`);
//       setAmount("");
//       setRecipient("");
//     } else {
//       alert(`Error: ${result.error}`);
//     }
//   };

//   const canMint = objects.treasuryCap && objects.totalSupply;

//   return (
//     <div className="bg-white rounded-xl shadow-lg p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">Mint Tokens</h2>

//       {!canMint ? (
//         <div className="text-yellow-600 bg-yellow-50 p-4 rounded-lg">
//           You don't have minting authority
//         </div>
//       ) : (
//         <>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Amount to Mint
//               </label>
//               <input
//                 type="text"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 placeholder="Enter amount"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Recipient Address
//               </label>
//               <input
//                 type="text"
//                 value={recipient}
//                 onChange={(e) => setRecipient(e.target.value)}
//                 placeholder="0x..."
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//           </div>

//           <button
//             onClick={handleMint}
//             disabled={loading || !amount || !recipient}
//             className="w-full mt-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
//           >
//             {loading ? "Minting..." : "Mint Tokens"}
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default MintSection;

// components/MintSection.tsx
import React, { useState } from "react";
import { useToken } from "../hooks/useToken";
import { TokenObjects } from "../types/token";
import styles from "./MintSection.module.css";

interface MintSectionProps {
  objects: TokenObjects;
}

const MintSection: React.FC<MintSectionProps> = ({ objects }) => {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const { mintTokens, loading } = useToken();

  const handleMint = async () => {
    if (!amount || !recipient) return;

    const result = await mintTokens(amount, recipient);
    if (result.success) {
      alert(`Tokens minted successfully! TX: ${result.digest}`);
      setAmount("");
      setRecipient("");
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  const canMint = objects.treasuryCap && objects.totalSupply;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Mint Tokens</h2>

      {!canMint ? (
        <div className={styles.warning}>You don't have minting authority</div>
      ) : (
        <>
          <div className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Amount to Mint</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Recipient Address</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="0x..."
                className={styles.input}
              />
            </div>
          </div>

          <button
            onClick={handleMint}
            disabled={loading || !amount || !recipient}
            className={styles.button}
          >
            {loading ? "Minting..." : "Mint Tokens"}
          </button>
        </>
      )}
    </div>
  );
};

export default MintSection;
