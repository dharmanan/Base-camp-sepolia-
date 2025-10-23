import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useState } from "react";
import ContractDeployer from "./components/ContractDeployer";
import OwnerChecker from "./components/OwnerChecker";
import { useEffect } from "react";
import { trackPageView } from "./utils/analytics";

export default function App() {
  const [checking, setChecking] = useState(false);
  const [summary, setSummary] = useState(null);
  const getSigner = async () => {
    // ...getSigner fonksiyonu ContractDeployer'dan alınabilir...
    return null;
  };
  const setDeployStatus = () => {};
  const checkOwners = async () => {
    // OwnerChecker'daki checkOwners fonksiyonunu buraya taşıyabilirsin
  };
  useEffect(() => {
    // Track page view when app loads
    trackPageView('Main App', navigator.userAgent);
  }, []);

  const btnClass =
    "bg-gradient-to-r from-sky-500 to-blue-600 " +
    "hover:from-sky-400 hover:to-blue-500 " +
    "text-white font-semibold px-5 py-2.5 rounded-xl " +
    "text-sm shadow-lg transition";

  const { address, isConnected } = useAccount();
  const { connect, connectors, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className="w-screen min-h-screen flex flex-col text-white" style={{background: '#0000ff'}}>
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between px-8 py-6 border-b border-slate-800 gap-4">
        <div className="flex items-center gap-4">
          <img src="/base.png" alt="Base Logo" className="h-14 w-14" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-left">Base Camp Deploy</h1>
        </div>
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          {/* MetaMask bağlantı butonu */}
          {!isConnected ? (
            <button
              className={btnClass}
              onClick={() => connect({ connector: connectors[0] })}
              disabled={isLoading}
            >
              {isLoading && pendingConnector ? "Bağlanıyor..." : "MetaMask ile Bağlan"}
            </button>
          ) : (
            <button className={btnClass} onClick={() => disconnect()}>
              {address.slice(0, 6)}...{address.slice(-4)} (Çıkış Yap)
            </button>
          )}
        </div>
      </div>
      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <ContractDeployer />
      </div>
    </div>
  );

}
