import { ethers } from "ethers";
import { useState } from "react";
import contractAddresses from "../contracts/contractsConfig";

export default function OwnerChecker({ getSigner, setDeployStatus }) {
  const [checking, setChecking] = useState(false);
  const [summary, setSummary] = useState(null);

  const checkOwners = async () => {
    try {
      setChecking(true);

      const signer = await getSigner();
      if (!signer) {
        alert("⚠️ Please connect wallet first!");
        return;
      }

      const account = await signer.getAddress();
      const entries = Object.entries(contractAddresses);
      const totalCount = entries.length;
      let ownedCount = 0;

      for (const [name, cfg] of entries) {
        const target = cfg?.contractAddress_verify;
        if (!target) continue;

        try {
          const iface = new ethers.Interface([
            "function owners(address) view returns (bool)",
          ]);
          const data = iface.encodeFunctionData("owners", [account]);
          const raw = await signer.call({ to: target, data });
          const [isOwner] = iface.decodeFunctionResult("owners", raw);
          if (isOwner) ownedCount += 1;

          setDeployStatus((prev) => ({
            ...prev,
            [name]: {
              ...prev?.[name],
              ownerCheck: { address: account, isOwner, target, source: "contractsConfig" },
            },
          }));
        } catch {
          setDeployStatus((prev) => ({
            ...prev,
            [name]: {
              ...prev?.[name],
              ownerCheck: { address: account, isOwner: "❌ call reverted", target, source: "contractsConfig" },
            },
          }));
        }
      }

      setSummary({ address: account, ownedCount, totalCount });
    } finally {
      setChecking(false);
    }
  };

const btnClass =
  "w-full bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 " +
  "hover:from-blue-400 hover:via-sky-400 hover:to-cyan-300 " +
  "text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg " +
  "transition transform hover:scale-105 focus:outline-none focus:ring-2 " +
  "focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 " +
  "disabled:opacity-50 animate-border-glow";

return (
  <div className="mb-6 flex flex-col items-center gap-4">
    {/* Nút Check */}
    <div className="flex w-full max-w-md">
      <button onClick={checkOwners} disabled={checking} className={btnClass}>
        {checking ? "⏳ Checking..." : "Check My NFTs"}
      </button>
    </div>

    {/* Summary */}
    {summary && (
      <div className="text-white text-sm bg-slate-800/70 rounded-lg px-4 py-2 mt-1 w-full max-w-md text-center">
        Base Camp NFTs: <b>{summary.ownedCount}</b> / <b>{summary.totalCount}</b>
      </div>
    )}

    {/* Link Guild.xyz */}
    <div className="mt-4 text-center">
        <a
          href="https://era.guild.xyz/base"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-semibold text-cyan-300 hover:text-cyan-200 leading-tight decoration-cyan-400/40 hover:decoration-cyan-200"
        >
          Base on Guild
        </a>
    </div>
  </div>
);

}
