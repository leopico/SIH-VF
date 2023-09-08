import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { createConfig, configureChains, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { mainnet } from "wagmi/chains";
import { MessageContextProvider } from "./context/MessageContext";
import { SetDataContextProvider } from "./context/SetDataContext";

const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
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
        <SetDataContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SetDataContextProvider>
      </MessageContextProvider>
    </WagmiConfig>
  </StrictMode>
);
