// components/TokenDashboard.tsx
import React from "react";
// import { useWalletKit } from "@mysten/wallet-kit";
import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";

// import { useToken } from "../hooks/useToken";
import { useToken } from "../hooks/useToken";
// import SupplyInfo from "../hooks/SupplyInfo";

// import SupplyInfo from "./SupplyInfo";
import SupplyInfo from "./SupplyInfo";
import MintSection from "./MintSection";
import BurnSection from "./BurnSection";
import TransferSection from "./TransferSection";
import AdminSection from "./AdminSection";

// export const TokenDashboard: React.FC = () => {
//   //   const { currentAccount, connect } = useWalletKit();
//   const currentAccount = useCurrentAccount();

//   const { tokenInfo, objects, loading } = useToken();

//   if (!currentAccount) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
//           <h1 className="text-3xl font-bold text-gray-800 mb-4">
//             MY Token Dashboard
//           </h1>
//           <p className="text-gray-600 mb-6">
//             Connect your wallet to manage your token
//           </p>
//           {/* <button
//             onClick={connect}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
//           >
//             Connect Wallet
//           </button> */}
//           <ConnectButton />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-800 mb-2">
//             MY Token Dashboard
//           </h1>
//           <p className="text-gray-600">
//             Manage your custom Sui token with complete control
//           </p>
//           <div className="mt-2 text-sm text-gray-500">
//             Connected: {currentAccount.address.slice(0, 8)}...
//             {currentAccount.address.slice(-6)}
//           </div>
//         </div>

//         {loading && (
//           <div className="flex justify-center mb-6">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//           </div>
//         )}

//         {/* Supply Information */}
//         {tokenInfo && <SupplyInfo tokenInfo={tokenInfo} />}

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           {/* Mint Section */}
//           <MintSection objects={objects} />

//           {/* Burn Section */}
//           <BurnSection />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           {/* Transfer Section */}
//           <TransferSection objects={objects} />

//           {/* Admin Section */}
//           <AdminSection objects={objects} tokenInfo={tokenInfo} />
//         </div>
//       </div>
//     </div>
//   );
// };

// components/TokenDashboard.tsx
// import React from "react";
// import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
// import { useToken } from "../hooks/useToken";
// import SupplyInfo from "./SupplyInfo";
// import MintSection from "./MintSection";
// import BurnSection from "./BurnSection";
// import TransferSection from "./TransferSection";
// import AdminSection from "./AdminSection";
import styles from "./TokenDashboard.module.css";

export const TokenDashboard: React.FC = () => {
  const currentAccount = useCurrentAccount();
  const { tokenInfo, objects, loading } = useToken();

  if (!currentAccount) {
    return (
      <div className={styles.connectContainer}>
        <div className={styles.connectCard}>
          <h1 className={styles.title}>MY Token Dashboard</h1>
          <p className={styles.subtitle}>
            Connect your wallet to manage your token
          </p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>MY Token Dashboard</h1>
          <p className={styles.headerSubtitle}>
            Manage your custom Sui token with complete control
          </p>
          <div className={styles.address}>
            Connected: {currentAccount.address.slice(0, 8)}...
            {currentAccount.address.slice(-6)}
          </div>
        </div>

        {loading && (
          <div className={styles.loadingSpinner}>
            <div className={styles.spinner}></div>
          </div>
        )}

        {/* Supply Information */}
        {tokenInfo && <SupplyInfo tokenInfo={tokenInfo} />}

        <div className={styles.gridContainer}>
          {/* Mint Section */}
          <MintSection objects={objects} />

          {/* Burn Section */}
          <BurnSection />
        </div>

        <div className={styles.gridContainer}>
          {/* Transfer Section */}
          <TransferSection objects={objects} />

          {/* Admin Section */}
          <AdminSection objects={objects} tokenInfo={tokenInfo} />
        </div>
      </div>
    </div>
  );
};
