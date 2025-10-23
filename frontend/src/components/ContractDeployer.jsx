import { useState, useEffect } from "react";
import { useWalletClient, useChainId, useSwitchChain } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { ethers } from "ethers";

import contractAddresses from "../contracts/contractsConfig";
import contractsList from "../contracts/contractsList";

import ContractCard from "./ContractCard";
import OwnerChecker from "./OwnerChecker";

export default function ContractDeployer() {
  const { data: walletClient } = useWalletClient();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const [deployStatus, setDeployStatus] = useState({});

  // Auto switch sang Base Sepolia
  useEffect(() => {
    if (chainId && chainId !== baseSepolia.id) {
      switchChain({ chainId: baseSepolia.id });
    }
  }, [chainId, switchChain]);

  // Lấy signer
  const getSigner = async () => {
    if (!walletClient) return null;
    const { account, chain } = walletClient;
    const provider = new ethers.BrowserProvider(window.ethereum, chain?.id);
    return provider.getSigner(account.address);
  };

  // Deploy contract
  const deployContract = async (contract) => {
    try {
      const signer = await getSigner();
      if (!signer) {
        alert("⚠️ Please connect wallet first!");
        return;
      }

      let deployArgs = contract.args || [];

      // InheritanceSubmission cần 2 address
      if (contract.name === "InheritanceSubmission") {
        const salespersonAddress = deployStatus["Salesperson"]?.address;
        const engineeringManagerAddress = deployStatus["EngineeringManager"]?.address;

        if (!salespersonAddress || !engineeringManagerAddress) {
          alert("⚠️ Deploy Salesperson và EngineeringManager trước!");
          return;
        }

        deployArgs = [salespersonAddress, engineeringManagerAddress];
      }

      setDeployStatus((prev) => ({
        ...prev,
        [contract.name]: { step: "🖊️ Waiting for signature on Metamask..." },
      }));

      const factory = new ethers.ContractFactory(contract.abi, contract.bytecode, signer);
      const contractTx = await factory.deploy(...deployArgs);

      setDeployStatus((prev) => ({
        ...prev,
        [contract.name]: {
          step: "⏳ Broadcasting tx...",
          tx: contractTx.deploymentTransaction().hash,
        },
      }));

      await contractTx.waitForDeployment();

      setDeployStatus((prev) => ({
        ...prev,
        [contract.name]: {
          step: "✅ Deployed (waiting 2s before mint...)",
          address: contractTx.target,
          tx: contractTx.deploymentTransaction().hash,
          canMint: false,
        },
      }));

      // Delay 2s rồi enable mint
      setTimeout(() => {
        setDeployStatus((prev) => ({
          ...prev,
          [contract.name]: {
            ...prev[contract.name],
            step: "✅ Deployed",
            canMint: true,
          },
        }));
      }, 2000);
    } catch (error) {
      console.error(error);
      setDeployStatus((prev) => ({
        ...prev,
        [contract.name]: { step: "❌ Failed", error: error.message },
      }));
    }
  };

  // Mint badge
  const mintBadge = async (contractName, deployedAddress) => {
    if (contractName === "Salesperson" || contractName === "EngineeringManager") {
      // İşlevsiz: Mint yapılmayacak
      return;
    }
    try {
      const signer = await getSigner();
      if (!signer) {
        alert("⚠️ Please connect wallet first!");
        return;
      }

      const graderAddress = contractAddresses[contractName]?.contractAddress_verify;
      if (!graderAddress) {
        alert("❌ No grader address found in config for " + contractName);
        return;
      }

      const iface = new ethers.Interface([
        "function testContract(address _submissionAddress)",
      ]);
      const data = iface.encodeFunctionData("testContract", [deployedAddress]);

      const tx = await signer.sendTransaction({ to: graderAddress, data });

      setDeployStatus((prev) => ({
        ...prev,
        [contractName]: {
          ...prev[contractName],
          minting: "⏳ Minting in progress...",
          mintTx: tx.hash,
        },
      }));

      await tx.wait();

      setDeployStatus((prev) => ({
        ...prev,
        [contractName]: {
          ...prev[contractName],
          minting: "✅ Mint success!",
          mintTx: tx.hash,
        },
      }));
    } catch (error) {
      console.error(error);
      setDeployStatus((prev) => ({
        ...prev,
        [contractName]: {
          ...prev[contractName],
          minting: `❌ Mint failed: ${error.message}`,
        },
      }));
    }
  };

  return (
  <div className="w-full max-w-[1800px] mx-auto">
      {/* Button check owners */}
      <OwnerChecker
        contractsList={contractsList}
        deployStatus={deployStatus}
        getSigner={getSigner}
        setDeployStatus={setDeployStatus}
      />

  {/* Grid contracts */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2">
        {contractsList.map((c, i) => (
          <ContractCard
            key={i}
            contract={c}
            contractStatus={deployStatus[c.name]}
            deployStatus={deployStatus}
            deployContract={deployContract}
            mintBadge={mintBadge}
          />
        ))}
      </div>
    </div>
  );
}
