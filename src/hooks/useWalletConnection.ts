import { useState, useEffect } from 'react';
import { useEthers } from '@usedapp/core';

interface WalletInfo {
  account: string | null | undefined;
  library: any;
  chainId: number | null | undefined;
}

const arbitrumChainId = 42161; // Arbitrum One chain ID in decimal

const useWalletConnection = () => {
  const { activateBrowserWallet, deactivate, account, library, chainId, error } = useEthers();
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);

  useEffect(() => {
    if (account && library) {
      if (chainId === arbitrumChainId) {
        setWalletInfo({ account, library, chainId });
        console.log("Wallet info updated:", { account, library, chainId });
      } else {
        console.error(`Unsupported chain id: ${chainId}. Please switch to Arbitrum One.`);
        setWalletInfo(null);
      }
    } else {
      setWalletInfo(null);
    }
  }, [account, library, chainId]);

  const connectWallet = async () => {
    try {
      console.log("Connecting wallet...");
      await activateBrowserWallet();
      if (account) {
        console.log("Wallet connected successfully");
      } else {
        console.log("Wallet connection failed");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const disconnectWallet = () => {
    deactivate();
    setWalletInfo(null);
    console.log("Wallet disconnected");
  };

  useEffect(() => {
    if (error) {
      console.error("Wallet connection error:", error);
    }
  }, [error]);

  return { walletInfo, connectWallet, disconnectWallet };
};

export default useWalletConnection;
