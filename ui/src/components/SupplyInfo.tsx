// // components/SupplyInfo.tsx
// import React from "react";
// import { TokenInfo } from "../types/token";

// interface SupplyInfoProps {
//   tokenInfo: TokenInfo;
// }

// const SupplyInfo: React.FC<SupplyInfoProps> = ({ tokenInfo }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">
//         Token Information
//       </h2>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <div className="text-center">
//           <div className="text-sm text-gray-500">Token Name</div>
//           <div className="text-lg font-semibold">{tokenInfo.name}</div>
//         </div>

//         <div className="text-center">
//           <div className="text-sm text-gray-500">Symbol</div>
//           <div className="text-lg font-semibold">{tokenInfo.symbol}</div>
//         </div>

//         <div className="text-center">
//           <div className="text-sm text-gray-500">Decimals</div>
//           <div className="text-lg font-semibold">{tokenInfo.decimals}</div>
//         </div>

//         <div className="text-center">
//           <div className="text-sm text-gray-500">Transfers</div>
//           <div
//             className={`text-lg font-semibold ${tokenInfo.isPaused ? "text-red-600" : "text-green-600"}`}
//           >
//             {tokenInfo.isPaused ? "Paused" : "Active"}
//           </div>
//         </div>
//       </div>

//       <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="bg-blue-50 rounded-lg p-4">
//           <div className="text-sm text-blue-600">Current Supply</div>
//           <div className="text-xl font-bold text-blue-800">
//             {tokenInfo.totalSupply}
//           </div>
//         </div>

//         <div className="bg-green-50 rounded-lg p-4">
//           <div className="text-sm text-green-600">Max Supply</div>
//           <div className="text-xl font-bold text-green-800">
//             {tokenInfo.maxSupply}
//           </div>
//         </div>

//         <div className="bg-purple-50 rounded-lg p-4">
//           <div className="text-sm text-purple-600">Remaining Mintable</div>
//           <div className="text-xl font-bold text-purple-800">
//             {tokenInfo.remainingSupply}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SupplyInfo;

// components/SupplyInfo.tsx
// import styles from "./SupplyInfo.module.css";
// import styles from "./SupplyInfo.module.css";
import styles from "./SupplyInfo.module.css";

import React from "react";
import { TokenInfo } from "../types/token";

interface SupplyInfoProps {
  tokenInfo: TokenInfo;
}

const SupplyInfo: React.FC<SupplyInfoProps> = ({ tokenInfo }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Token Information</h2>

      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <div className={styles.label}>Token Name</div>
          <div className={styles.value}>{tokenInfo.name}</div>
        </div>

        <div className={styles.infoItem}>
          <div className={styles.label}>Symbol</div>
          <div className={styles.value}>{tokenInfo.symbol}</div>
        </div>

        <div className={styles.infoItem}>
          <div className={styles.label}>Decimals</div>
          <div className={styles.value}>{tokenInfo.decimals}</div>
        </div>

        <div className={styles.infoItem}>
          <div className={styles.label}>Transfers</div>
          <div
            className={
              tokenInfo.isPaused ? styles.statusPaused : styles.statusActive
            }
          >
            {tokenInfo.isPaused ? "Paused" : "Active"}
          </div>
        </div>
      </div>

      <div className={styles.supplyGrid}>
        <div className={`${styles.supplyItem} ${styles.currentSupply}`}>
          <div className={styles.currentSupplyLabel}>Current Supply</div>
          <div className={styles.currentSupplyValue}>
            {tokenInfo.totalSupply}
          </div>
        </div>

        <div className={`${styles.supplyItem} ${styles.maxSupply}`}>
          <div className={styles.maxSupplyLabel}>Max Supply</div>
          <div className={styles.maxSupplyValue}>{tokenInfo.maxSupply}</div>
        </div>

        <div className={`${styles.supplyItem} ${styles.remainingSupply}`}>
          <div className={styles.remainingSupplyLabel}>Remaining Mintable</div>
          <div className={styles.remainingSupplyValue}>
            {tokenInfo.remainingSupply}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplyInfo;
