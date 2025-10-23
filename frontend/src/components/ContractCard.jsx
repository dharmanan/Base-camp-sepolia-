export default function ContractCard({
  contract,
  contractStatus,
  deployStatus,   // cần prop này từ ContractDeployer
  deployContract,
  mintBadge,
}) {
  const deployedAddress = contractStatus?.address;

  // explorer address ưu tiên từ ownerCheck.target (địa chỉ trong contractsConfig),
  // nếu chưa có thì dùng deployedAddress (địa chỉ vừa deploy).
  const explorerAddress =
    contractStatus?.ownerCheck?.target || deployedAddress || null;

  const explorerLink = explorerAddress
    ? `https://sepolia.basescan.org/token/${explorerAddress}#readContract`
    : null;

  // Điều kiện riêng cho InheritanceSubmission
  const disableDeploy =
    contract.name === "InheritanceSubmission"
      ? !deployStatus["Salesperson"]?.address ||
        !deployStatus["EngineeringManager"]?.address
      : false;

  return (
    <div
      className="bg-slate-900/80 backdrop-blur-md p-6 shadow-xl border-2 border-white flex flex-col justify-between h-64 transition-transform duration-200 card-base-hover rounded-2xl hover:neon-red-border focus:neon-red-border"
    >
      {/* Contract name (clickable → Basescan readContract nếu có address) */}
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-2xl font-extrabold text-white drop-shadow-md m-0">
          {(() => {
            // Başlığı büyük harflerden kelime ayırarak göster
            const spacedName = contract.name.replace(/([A-Z])/g, ' $1').replace(/^ /, '');
            return explorerLink ? (
              <a
                href={explorerLink}
                target="_blank"
                rel="noopener noreferrer"
                className="decoration-dotted hover:opacity-90"
                title="Open on BaseScan (readContract)"
              >
                {spacedName}
              </a>
            ) : (
              spacedName
            );
          })()}
        </h2>
        {/* Owner check result (emoji başlık yanında) */}
        {contractStatus?.ownerCheck && (
          contractStatus.ownerCheck.isOwner === true ? (
            <span className="text-green-400 text-xs font-semibold" title="Owned">owned ✅</span>
          ) : contractStatus.ownerCheck.isOwner === false ? (
            <span className="text-red-400 text-xs font-semibold" title="Not owned">not owned ❌</span>
          ) : null
        )}
      </div>

      {/* Ghi chú riêng cho InheritanceSubmission */}
      {contract.name === "InheritanceSubmission" && disableDeploy && (
        <p className="text-xs text-yellow-400 mt-1">
          ⚠️ Please deploy <b>Salesperson</b> & <b>EngineeringManager</b> first
        </p>
      )}

      {/* Buttons */}
      <div className="flex gap-2 mt-4">
        {/* Deploy */}
        <button
          onClick={() => deployContract(contract)}
          disabled={disableDeploy}
          className="bg-linear-to-r from-blue-500 to-sky-600 
                     hover:from-blue-400 hover:to-sky-500 
                     text-white font-bold px-5 py-2 rounded-lg text-sm shadow-lg disabled:opacity-50 flex-1"
        >
          🚀 Deploy
        </button>
        {/* Mint NFT */}
        {contract.name === "Salesperson" || contract.name === "EngineeringManager" ? (
          <button
            className="bg-gray-500 text-white font-bold px-5 py-2 rounded-lg text-sm shadow-lg flex-1 cursor-not-allowed"
            disabled
          >
            No Need
          </button>
        ) : (
          <button
            className="bg-linear-to-r from-blue-500 to-sky-600 hover:from-blue-400 hover:to-sky-500 text-white font-bold px-5 py-2 rounded-lg text-sm shadow-lg disabled:opacity-50 flex-1"
            onClick={() => mintBadge(contract.name, deployedAddress)}
            disabled={!contractStatus?.canMint}
          >
            🪙 Mint NFT
          </button>
        )}
  {/* Buttons sonu */}
      </div>

      {/* Contract Address (clickable → Basescan readContract) */}
      {deployedAddress && (
        <p className="text-xs text-white mt-3 break-all">
          <strong>📜 Contract Address:</strong>{" "}
          <a
            href={`https://sepolia.basescan.org/token/${deployedAddress}#readContract`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-cyan-400 hover:text-cyan-200"
            title="Open on BaseScan (readContract)"
          >
            {deployedAddress}
          </a>
        </p>
      )}

      {/* Deploy Tx link */}
      {contractStatus?.tx && (
        <p className="text-xs text-white mt-1 break-all">
          🔗 Deploy Tx:&nbsp;
          <a
            href={`https://sepolia.basescan.org/tx/${contractStatus.tx}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-white hover:text-gray-300 font-semibold"
          >
            {contractStatus.tx}
          </a>
        </p>
      )}

      {/* Mint result */}
      {contractStatus?.minting && (
        <p className="text-xs text-emerald-300 mt-2 break-all">
          {contractStatus.minting}
          {contractStatus.mintTx && (
            <>
              {" - "}
              <a
                href={`https://sepolia.basescan.org/tx/${contractStatus.mintTx}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-cyan-400 hover:text-cyan-200"
              >
                {contractStatus.mintTx}
              </a>
            </>
          )}
        </p>
      )}

      {/* Error */}
      {contractStatus?.error && (
        <textarea
          readOnly
          value={`❌ Error: ${contractStatus.error}`}
          className="text-xs text-red-400 font-semibold wrap-break-word 
                     bg-slate-900/60 border border-red-500 rounded p-2 
                     mt-2 resize-none w-full max-h-24 overflow-auto"
        />
      )}
    {/* Card ana div sonu */}
  </div>
  );
}
