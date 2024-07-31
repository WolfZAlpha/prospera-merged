import { useState, useEffect } from 'react';
import { useEthers } from '@usedapp/core';
import { useWalletContext } from '@/context/WalletContext'; // Adjust the path as necessary

interface WalletInfo {
  account: string | null;
  library: any | null;
  chainId: number | null;
}

const arbitrumChainId = 42161; // Arbitrum One chain ID in decimal

const useWalletConnection = () => {
  const { activateBrowserWallet, deactivate, account, library, chainId, error } = useEthers();
  const { setIsWalletConnected } = useWalletContext();
  const [walletInfo, setWalletInfo] = useState<WalletInfo>({ account: null, library: null, chainId: null });

  useEffect(() => {
    if (account && library && chainId === arbitrumChainId) {
      setWalletInfo({ account, library, chainId });
      setIsWalletConnected(true);
      console.log("Wallet info updated:", { account, library, chainId });
    } else {
      setWalletInfo({ account: null, library: null, chainId: null });
      setIsWalletConnected(false);
    }
  }, [account, library, chainId, setIsWalletConnected]);

  const connectWallet = async () => {
    try {
      console.log("Connecting wallet...");
      await activateBrowserWallet();
      console.log("Wallet connected successfully");
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const disconnectWallet = () => {
    deactivate();
    setWalletInfo({ account: null, library: null, chainId: null });
    setIsWalletConnected(false);
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
