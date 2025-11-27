// // components/TransferSection.tsx
// import React, { useState } from "react";
// import { useToken } from "../hooks/useToken";
// import { TokenObjects } from "../types/token";

// interface TransferSectionProps {
//   objects: TokenObjects;
// }

// const TransferSection: React.FC<TransferSectionProps> = ({ objects }) => {
//   const [coinObjectId, setCoinObjectId] = useState("");
//   const [recipient, setRecipient] = useState("");
//   const { safeTransfer, toggleTransfers, loading, tokenInfo } = useToken();

//   const handleTransfer = async () => {
//     if (!coinObjectId || !recipient) return;

//     const result = await safeTransfer(coinObjectId, recipient);
//     if (result.success) {
//       alert(`Transfer successful! TX: ${result.digest}`);
//       setCoinObjectId("");
//       setRecipient("");
//     } else {
//       alert(`Error: ${result.error}`);
//     }
//   };

//   const handleToggleTransfers = async (pause: boolean) => {
//     const result = await toggleTransfers(pause);
//     if (result.success) {
//       alert(`Transfers ${pause ? "paused" : "unpaused"}! TX: ${result.digest}`);
//     } else {
//       alert(`Error: ${result.error}`);
//     }
//   };

//   const canControlTransfers = objects.transferPause;

//   return (
//     <div className="bg-white rounded-xl shadow-lg p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">
//         Transfer Controls
//       </h2>

//       {/* Transfer Toggle */}
//       {canControlTransfers && (
//         <div className="mb-6">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-sm font-medium text-gray-700">
//               Transfer Status
//             </span>
//             <span
//               className={`px-2 py-1 rounded text-xs font-semibold ${tokenInfo?.isPaused ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
//             >
//               {tokenInfo?.isPaused ? "PAUSED" : "ACTIVE"}
//             </span>
//           </div>
//           <div className="flex space-x-2">
//             <button
//               onClick={() => handleToggleTransfers(true)}
//               disabled={loading || tokenInfo?.isPaused}
//               className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded transition-colors"
//             >
//               Pause Transfers
//             </button>
//             <button
//               onClick={() => handleToggleTransfers(false)}
//               disabled={loading || !tokenInfo?.isPaused}
//               className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded transition-colors"
//             >
//               Unpause Transfers
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Safe Transfer */}
//       <div className="space-y-4">
//         <h3 className="text-lg font-semibold text-gray-700">Safe Transfer</h3>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Coin Object ID
//           </label>
//           <input
//             type="text"
//             value={coinObjectId}
//             onChange={(e) => setCoinObjectId(e.target.value)}
//             placeholder="0x..."
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Recipient Address
//           </label>
//           <input
//             type="text"
//             value={recipient}
//             onChange={(e) => setRecipient(e.target.value)}
//             placeholder="0x..."
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//       </div>

//       <button
//         onClick={handleTransfer}
//         disabled={loading || !coinObjectId || !recipient || tokenInfo?.isPaused}
//         className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
//       >
//         {loading ? "Transferring..." : "Safe Transfer"}
//       </button>

//       {tokenInfo?.isPaused && (
//         <div className="mt-3 text-red-600 text-sm">
//           Transfers are currently paused. Unpause to enable transfers.
//         </div>
//       )}
//     </div>
//   );
// };

// export default TransferSection;

// components/TransferSection.tsx
import React, { useState } from "react";
import { useToken } from "../hooks/useToken";
import { TokenObjects } from "../types/token";
import styles from "./TransferSection.module.css";

interface TransferSectionProps {
  objects: TokenObjects;
}

const TransferSection: React.FC<TransferSectionProps> = ({ objects }) => {
  const [coinObjectId, setCoinObjectId] = useState("");
  const [recipient, setRecipient] = useState("");
  const { safeTransfer, toggleTransfers, loading, tokenInfo } = useToken();

  const handleTransfer = async () => {
    if (!coinObjectId || !recipient) return;

    const result = await safeTransfer(coinObjectId, recipient);
    if (result.success) {
      alert(`Transfer successful! TX: ${result.digest}`);
      setCoinObjectId("");
      setRecipient("");
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  const handleToggleTransfers = async (pause: boolean) => {
    const result = await toggleTransfers(pause);
    if (result.success) {
      alert(`Transfers ${pause ? "paused" : "unpaused"}! TX: ${result.digest}`);
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  const canControlTransfers = objects.transferPause;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Transfer Controls</h2>

      {/* Transfer Toggle */}
      {canControlTransfers && (
        <div className={styles.controls}>
          <div className={styles.statusRow}>
            <span className={styles.statusLabel}>Transfer Status</span>
            <span
              className={`${styles.statusBadge} ${tokenInfo?.isPaused ? styles.statusPaused : styles.statusActive}`}
            >
              {tokenInfo?.isPaused ? "PAUSED" : "ACTIVE"}
            </span>
          </div>
          <div className={styles.buttonGroup}>
            <button
              onClick={() => handleToggleTransfers(true)}
              disabled={loading || tokenInfo?.isPaused}
              className={`${styles.controlButton} ${styles.pauseButton}`}
            >
              Pause Transfers
            </button>
            <button
              onClick={() => handleToggleTransfers(false)}
              disabled={loading || !tokenInfo?.isPaused}
              className={`${styles.controlButton} ${styles.unpauseButton}`}
            >
              Unpause Transfers
            </button>
          </div>
        </div>
      )}

      {/* Safe Transfer */}
      <div className={styles.transferSection}>
        <h3 className={styles.sectionTitle}>Safe Transfer</h3>

        <div className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Coin Object ID</label>
            <input
              type="text"
              value={coinObjectId}
              onChange={(e) => setCoinObjectId(e.target.value)}
              placeholder="0x..."
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
          onClick={handleTransfer}
          disabled={
            loading || !coinObjectId || !recipient || tokenInfo?.isPaused
          }
          className={styles.transferButton}
        >
          {loading ? "Transferring..." : "Safe Transfer"}
        </button>

        {tokenInfo?.isPaused && (
          <div className={styles.warning}>
            Transfers are currently paused. Unpause to enable transfers.
          </div>
        )}
      </div>
    </div>
  );
};

export default TransferSection;
