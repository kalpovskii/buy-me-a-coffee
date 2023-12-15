import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import { NextUIProvider } from "@nextui-org/react";
import * as React from "react";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [infuraProvider({ apiKey: process.env.NEXT_PUBLIC_API_KEY! })]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit App",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <NextUIProvider>
        <RainbowKitProvider chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </NextUIProvider>
    </WagmiConfig>
  );
}

export default MyApp;
