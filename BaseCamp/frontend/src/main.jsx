import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./cardBaseHover.css";
import "./neonRedBorder.css";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

import { WagmiConfig, createConfig } from "wagmi";
import { injected } from "wagmi/connectors";
import { baseSepolia } from "wagmi/chains";

const config = createConfig({
  autoConnect: true,
  connectors: [injected({ chains: [baseSepolia] })],
  chains: [baseSepolia],
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <App />
        <Analytics />
        <SpeedInsights />
      </WagmiConfig>
    </QueryClientProvider>
  </React.StrictMode>
);
