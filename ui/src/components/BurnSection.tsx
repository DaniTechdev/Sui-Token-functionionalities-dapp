// // components/BurnSection.tsx
// import React, { useState } from "react";
// //@ts-ignore
// import { useToken } from "../hooks/useToken";

// const BurnSection: React.FC = () => {
//   const [coinObjectId, setCoinObjectId] = useState("");
//   const [amount, setAmount] = useState("");
//   const { burnTokens, loading } = useToken();

//   const handleBurn = async () => {
//     if (!coinObjectId) return;

//     const result = await burnTokens(coinObjectId, amount || undefined);
//     if (result.success) {
//       alert(`Tokens burned successfully! TX: ${result.digest}`);
//       setCoinObjectId("");
//       setAmount("");
//     } else {
//       alert(`Error: ${result.error}`);
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-lg p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">Burn Tokens</h2>

//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Coin Object ID to Burn
//           </label>
//           <input
//             type="text"
//             value={coinObjectId}
//             onChange={(e) => setCoinObjectId(e.target.value)}
//             placeholder="0x..."
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Amount to Burn (Optional - leave empty to burn entire coin)
//           </label>
//           <input
//             type="text"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             placeholder="Enter amount"
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
//           />
//         </div>
//       </div>

//       <button
//         onClick={handleBurn}
//         disabled={loading || !coinObjectId}
//         className="w-full mt-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
//       >
//         {loading ? "Burning..." : "Burn Tokens"}
//       </button>
//     </div>
//   );
// };

// export default BurnSection;

// components/BurnSection.tsx
import React, { useState } from "react";
import { useToken } from "../hooks/useToken";
import styles from "./BurnSection.module.css";

const BurnSection: React.FC = () => {
  const [coinObjectId, setCoinObjectId] = useState("");
  const [amount, setAmount] = useState("");
  const { burnTokens, loading } = useToken();

  const handleBurn = async () => {
    if (!coinObjectId) return;

    const result = await burnTokens(coinObjectId, amount || undefined);
    if (result.success) {
      alert(`Tokens burned successfully! TX: ${result.digest}`);
      setCoinObjectId("");
      setAmount("");
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Burn Tokens</h2>

      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Coin Object ID to Burn</label>
          <input
            type="text"
            value={coinObjectId}
            onChange={(e) => setCoinObjectId(e.target.value)}
            placeholder="0x..."
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>
            Amount to Burn{" "}
            <span className={styles.optional}>
              (Optional - leave empty to burn entire coin)
            </span>
          </label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className={styles.input}
          />
        </div>
      </div>

      <button
        onClick={handleBurn}
        disabled={loading || !coinObjectId}
        className={styles.button}
      >
        {loading ? "Burning..." : "Burn Tokens"}
      </button>
    </div>
  );
};

export default BurnSection;
