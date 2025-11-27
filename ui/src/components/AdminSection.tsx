// // components/AdminSection.tsx
// import React, { useState } from "react";
// import { useToken } from "../hooks/useToken";
// import { TokenObjects, TokenInfo } from "../types/token";

// interface AdminSectionProps {
//   objects: TokenObjects;
//   tokenInfo: TokenInfo | null;
// }

// const AdminSection: React.FC<AdminSectionProps> = ({ objects, tokenInfo }) => {
//   const [newOwner, setNewOwner] = useState("");
//   const [authorityType, setAuthorityType] = useState<
//     "treasuryCap" | "totalSupply" | "transferPause"
//   >("treasuryCap");
//   const { transferAuthority, loading } = useToken();

//   const handleTransferAuthority = async () => {
//     if (!newOwner) return;

//     const result = await transferAuthority(authorityType, newOwner);
//     if (result.success) {
//       alert(`Authority transferred successfully! TX: ${result.digest}`);
//       setNewOwner("");
//     } else {
//       alert(`Error: ${result.error}`);
//     }
//   };

//   const hasAnyAuthority =
//     objects.treasuryCap || objects.totalSupply || objects.transferPause;

//   if (!hasAnyAuthority) {
//     return (
//       <div className="bg-white rounded-xl shadow-lg p-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">
//           Admin Controls
//         </h2>
//         <div className="text-yellow-600 bg-yellow-50 p-4 rounded-lg">
//           No admin authority detected
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-xl shadow-lg p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Controls</h2>

//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Authority Type to Transfer
//           </label>
//           <select
//             value={authorityType}
//             onChange={(e) => setAuthorityType(e.target.value as any)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//           >
//             {objects.treasuryCap && (
//               <option value="treasuryCap">
//                 Minting Authority (TreasuryCap)
//               </option>
//             )}
//             {objects.totalSupply && (
//               <option value="totalSupply">Supply Tracker</option>
//             )}
//             {objects.transferPause && (
//               <option value="transferPause">Transfer Controller</option>
//             )}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             New Owner Address
//           </label>
//           <input
//             type="text"
//             value={newOwner}
//             onChange={(e) => setNewOwner(e.target.value)}
//             placeholder="0x..."
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//           />
//         </div>
//       </div>

//       <button
//         onClick={handleTransferAuthority}
//         disabled={loading || !newOwner}
//         className="w-full mt-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
//       >
//         {loading ? "Transferring..." : "Transfer Authority"}
//       </button>

//       <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//         <h3 className="font-semibold text-gray-700 mb-2">
//           Current Authorities:
//         </h3>
//         <div className="text-sm space-y-1">
//           {objects.treasuryCap && (
//             <div>
//               ✅ Minting Authority: {objects.treasuryCap.slice(0, 10)}...
//             </div>
//           )}
//           {objects.totalSupply && (
//             <div>✅ Supply Tracker: {objects.totalSupply.slice(0, 10)}...</div>
//           )}
//           {objects.transferPause && (
//             <div>
//               ✅ Transfer Controller: {objects.transferPause.slice(0, 10)}...
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminSection;

// components/AdminSection.tsx
import React, { useState } from "react";
import { useToken } from "../hooks/useToken";
import { TokenObjects, TokenInfo } from "../types/token";
import styles from "./AdminSection.module.css";

interface AdminSectionProps {
  objects: TokenObjects;
  tokenInfo: TokenInfo | null;
}

const AdminSection: React.FC<AdminSectionProps> = ({ objects, tokenInfo }) => {
  const [newOwner, setNewOwner] = useState("");
  const [authorityType, setAuthorityType] = useState<
    "treasuryCap" | "totalSupply" | "transferPause"
  >("treasuryCap");
  const { transferAuthority, loading } = useToken();

  const handleTransferAuthority = async () => {
    if (!newOwner) return;

    const result = await transferAuthority(authorityType, newOwner);
    if (result.success) {
      alert(`Authority transferred successfully! TX: ${result.digest}`);
      setNewOwner("");
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  const hasAnyAuthority =
    objects.treasuryCap || objects.totalSupply || objects.transferPause;

  if (!hasAnyAuthority) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Admin Controls</h2>
        <div className={styles.warning}>No admin authority detected</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin Controls</h2>

      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Authority Type to Transfer</label>
          <select
            value={authorityType}
            onChange={(e) => setAuthorityType(e.target.value as any)}
            className={styles.select}
          >
            {objects.treasuryCap && (
              <option value="treasuryCap">
                Minting Authority (TreasuryCap)
              </option>
            )}
            {objects.totalSupply && (
              <option value="totalSupply">Supply Tracker</option>
            )}
            {objects.transferPause && (
              <option value="transferPause">Transfer Controller</option>
            )}
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>New Owner Address</label>
          <input
            type="text"
            value={newOwner}
            onChange={(e) => setNewOwner(e.target.value)}
            placeholder="0x..."
            className={styles.input}
          />
        </div>
      </div>

      <button
        onClick={handleTransferAuthority}
        disabled={loading || !newOwner}
        className={styles.button}
      >
        {loading ? "Transferring..." : "Transfer Authority"}
      </button>

      <div className={styles.authorities}>
        <h3 className={styles.authoritiesTitle}>Current Authorities:</h3>
        <div className={styles.authoritiesList}>
          {objects.treasuryCap && (
            <div className={styles.authorityItem}>
              <span className={styles.checkmark}>✅</span>
              Minting Authority:{" "}
              <span className={styles.authorityId}>
                {objects.treasuryCap.slice(0, 10)}...
              </span>
            </div>
          )}
          {objects.totalSupply && (
            <div className={styles.authorityItem}>
              <span className={styles.checkmark}>✅</span>
              Supply Tracker:{" "}
              <span className={styles.authorityId}>
                {objects.totalSupply.slice(0, 10)}...
              </span>
            </div>
          )}
          {objects.transferPause && (
            <div className={styles.authorityItem}>
              <span className={styles.checkmark}>✅</span>
              Transfer Controller:{" "}
              <span className={styles.authorityId}>
                {objects.transferPause.slice(0, 10)}...
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSection;
