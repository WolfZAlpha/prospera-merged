"use client";

import { DAppProvider, Config, Chain } from '@usedapp/core';
import { getDefaultProvider } from 'ethers';
import "../styles/index.css";

const arbitrumChainId = 42161; // Arbitrum One chain ID in decimal

const arbitrumOne: Chain = {
  chainId: arbitrumChainId,
  chainName: 'Arbitrum One',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11', // Actual multicall address for Arbitrum
  getExplorerAddressLink: (address: string) => `https://arbiscan.io/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://arbiscan.io/tx/${transactionHash}`,
};

const config: Config = {
  readOnlyChainId: arbitrumChainId,
  readOnlyUrls: {
    [arbitrumChainId]: getDefaultProvider('https://arbitrum-one-rpc.publicnode.com'), // Official Arbitrum public RPC
  },
  networks: [arbitrumOne],
};

const isDev = process.env.NODE_ENV === 'development';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={isDev}>
      <head>
        <meta name="description" content="PROSPERA – is a cutting-edge De-Fi company at the forefront of innovation in the Artificial Intelligence sector." />
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body suppressHydrationWarning={true}>
        <DAppProvider config={config}>
          {children}
        </DAppProvider>
      </body>
    </html>
  );
}
