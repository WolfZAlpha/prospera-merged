"use client";

import React, { createContext, useContext, useState } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  return (
    <WalletContext.Provider value={{ isWalletConnected, setIsWalletConnected }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => useContext(WalletContext);
