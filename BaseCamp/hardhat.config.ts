
require("@nomicfoundation/hardhat-toolbox");
import * as dotenv from "dotenv";
dotenv.config();
const PRIVATE_KEY: string =  process.env.PRIVATE_KEY || "";

module.exports = {
  defaultNetwork: "base",
  solidity: {
    compilers: [
      { version: "0.5.16" },
      { version: "0.8.0" },
      { version: "0.6.12", settings: { optimizer: { enabled: true, runs: 1000 } } },
      { version: "0.8.0", settings: { optimizer: { enabled: true, runs: 1000 } } },
  { version: "0.8.19", settings: { optimizer: { enabled: true, runs: 1000 } } },
  { version: "0.8.20", settings: { optimizer: { enabled: true, runs: 1000 } } }
    ]
  },
  networks: {
    base: {
      url: process.env.BASE_RPC_URL || "",
      accounts: PRIVATE_KEY !== "" ? [PRIVATE_KEY] : [],
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: PRIVATE_KEY !== "" ? [PRIVATE_KEY] : [],
    }
  }
};
