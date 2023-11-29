import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { createConfig, configureChains, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { sepolia, mainnet } from "wagmi/chains";
import { MessageContextProvider } from "./context/MessageContext";
import { SetAuthContextProvider } from "./context/SetAuthContext";
import { SetContractContextProvider } from "./context/SetContractContext";

const { publicClient, webSocketPublicClient } = configureChains(
  [sepolia, mainnet],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <WagmiConfig config={config}>
      <MessageContextProvider>
        <SetAuthContextProvider>
          <SetContractContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </SetContractContextProvider>
        </SetAuthContextProvider>
      </MessageContextProvider>
    </WagmiConfig>
  </StrictMode>
);
