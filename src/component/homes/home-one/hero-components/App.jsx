"use client";

import { useState, useEffect, useCallback, forwardRef } from "react";
import { Snackbar, LinearProgress, Box, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useEtherBalance, useEthers } from '@usedapp/core';
import { ethers } from 'ethers';
import useWalletConnection from '@/hooks/useWalletConnection';
import ParbAbi from "./pros_abi.json";

// Provider and contract setup
const provider = new ethers.providers.JsonRpcProvider('https://arbitrum-one-rpc.publicnode.com');
const presaleContractAddress = "0x1806CD54631309778dE011A3ceeE6F88CA9c8DAf";

// Custom hook to fetch ICO data and provide buy functionality
const useIcoData = () => {
  const { account, library } = useEthers();
  const [icoData, setIcoData] = useState({
    isActive: false,
    currentTier: "Inactive",
    tokensSold: 0,
    totalSupply: 0,
    tokenPrice: 0,
    minBuy: 0,
    maxBuy: 0,
    ethUsdPrice: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIcoData = async () => {
      try {
        const contract = new ethers.Contract(presaleContractAddress, ParbAbi, provider);

        const icoState = await contract.getIcoState();
        const isActive = icoState._icoActive;
        const currentTier = icoState._currentTier;

        const tier1TokensBN = await contract.TIER1_TOKENS();
        const tier2TokensBN = await contract.TIER2_TOKENS();
        const tier3TokensBN = await contract.TIER3_TOKENS();
        const tier1PriceUSDBN = await contract.TIER1_PRICE_USD();
        const tier2PriceUSDBN = await contract.TIER2_PRICE_USD();
        const tier3PriceUSDBN = await contract.TIER3_PRICE_USD();
        const ethUsdPriceBN = await contract.getEthUsdPrice();

        const ethUsdPrice = parseFloat(ethers.utils.formatUnits(ethUsdPriceBN, 18));

        const tier1PriceUsd = parseFloat(tier1PriceUSDBN.toString()) / 100;
        const tier2PriceUsd = parseFloat(tier2PriceUSDBN.toString()) / 100;
        const tier3PriceUsd = parseFloat(tier3PriceUSDBN.toString()) / 100;

        let tokensSold, totalSupply, tokenPrice;

        if (currentTier === 0) {
          tokensSold = ethers.utils.formatUnits(icoState._tier1Sold, 0);
          totalSupply = ethers.utils.formatUnits(tier1TokensBN, 0);
          tokenPrice = tier1PriceUsd;
        } else if (currentTier === 1) {
          tokensSold = ethers.utils.formatUnits(icoState._tier2Sold, 0);
          totalSupply = ethers.utils.formatUnits(tier2TokensBN, 0);
          tokenPrice = tier2PriceUsd;
        } else if (currentTier === 2) {
          tokensSold = ethers.utils.formatUnits(icoState._tier3Sold, 0);
          totalSupply = ethers.utils.formatUnits(tier3TokensBN, 0);
          tokenPrice = tier3PriceUsd;
        }

        const tierLabels = ["Tier 1", "Tier 2", "Tier 3"];
        const tierLabel = isActive ? tierLabels[currentTier] : "Inactive";

        const minBuyUsd = 150;
        const maxBuyUsd = 500000;

        // Calculate min and max buy in ETH
        const minBuyEth = minBuyUsd / ethUsdPrice;
        const maxBuyEth = maxBuyUsd / ethUsdPrice;

        setIcoData({
          isActive,
          currentTier: tierLabel,
          tokensSold: parseInt(tokensSold),
          totalSupply: parseInt(totalSupply),
          tokenPrice: parseFloat(tokenPrice).toFixed(2),
          minBuy: minBuyEth.toFixed(6),
          maxBuy: maxBuyEth.toFixed(6),
          ethUsdPrice: ethUsdPrice,
        });
      } catch (error) {
        console.error('Error fetching ICO data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIcoData();
  }, [account]);

  const buyTokens = useCallback(async (tokenAmount, ethAmount) => {
    if (!account || !library) {
      throw new Error('Please connect your wallet to purchase tokens.');
    }

    const signer = library.getSigner();
    const contract = new ethers.Contract(presaleContractAddress, ParbAbi, signer);

    const tokenAmountBN = ethers.BigNumber.from(tokenAmount);
    const ethAmountBN = ethers.utils.parseEther(ethAmount);

    const minBuy = await contract.getMinIcoBuy();
    const maxBuy = await contract.getMaxIcoBuy();
    console.log(`Min Buy (ETH): ${ethers.utils.formatEther(minBuy)} ETH`);
    console.log(`Max Buy (ETH): ${ethers.utils.formatEther(maxBuy)} ETH`);
    console.log(`Attempting to buy: ${tokenAmount} tokens for ${ethAmount} ETH`);

    // Temporary fix: use hardcoded USD limits instead of contract-reported ETH limits
    const minBuyUsd = 150;
    const maxBuyUsd = 500000;
    const ethUsdPrice = icoData.ethUsdPrice;
    const ethAmountUsd = parseFloat(ethAmount) * ethUsdPrice;

    if (ethAmountUsd < minBuyUsd) {
      throw new Error(`USD amount ($${ethAmountUsd.toFixed(2)}) is below the minimum buy limit ($${minBuyUsd}).`);
    }
    if (ethAmountUsd > maxBuyUsd) {
      throw new Error(`USD amount ($${ethAmountUsd.toFixed(2)}) exceeds the maximum buy limit ($${maxBuyUsd}).`);
    }

    const gasLimit = ethers.BigNumber.from('30000000');
    console.log(`Gas Limit set to: ${gasLimit.toString()}`);

    try {
      const tx = await contract.buyTokens(tokenAmountBN, {
        value: ethAmountBN,
        gasLimit: gasLimit
      });

      await tx.wait();
      console.log("Tokens purchased successfully!");
    } catch (error) {
      console.error("Error during token purchase:", error);
      if (error.data && error.data.message) {
        console.error("Revert reason:", error.data.message);
      }
      throw new Error(error.data?.message || "Failed to purchase tokens.");
    }
  }, [account, library, icoData.ethUsdPrice]);

  return { icoData, isLoading, buyTokens };
};

const ProgressBar = ({ current, goal }) => {
  const progress = goal > 0 ? (current / goal) * 100 : 0;

  return (
    <Box sx={{ width: '100%', position: 'relative', bgcolor: 'black', border: '2px solid #01ff02', mt: 5 }}
      className="rounded-md shadow-green-500/50 shadow-[0_0_15px_5px_rgba(0,255,0,0.5)]"
    >
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: '45px',
          bgcolor: 'black',
          '& .MuiLinearProgress-bar': {
            bgcolor: '#01ff02'
          }
        }}
      />
      <Box sx={{ position: 'absolute', top: '50%', left: '4px', transform: 'translateY(-50%)', color: 'white' }}>
        <Typography
          variant="body2"
          noWrap
          sx={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            WebkitTextStroke: '.5px black',
            WebkitTextFillColor: 'white'
          }}
        >
          {current} $PROS
        </Typography>
      </Box>
      <Box sx={{ position: 'absolute', top: '50%', right: '4px', transform: 'translateY(-50%)', color: 'white' }}>
        <Typography
          variant="body2"
          noWrap
          sx={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            WebkitTextStroke: '.5px black',
            WebkitTextFillColor: 'white'
          }}
        >
          {goal} $PROS
        </Typography>
      </Box>
    </Box>
  );
};

function App() {
  const { account } = useEthers();
  const { icoData, isLoading, buyTokens } = useIcoData();
  const [amountUsd, setAmountUsd] = useState('0');
  const { walletInfo, connectWallet, disconnectWallet } = useWalletConnection();
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleError = (message) => {
    setErrorMessage(message);
    setOpenSnackbar(true);
    console.log(`Error: ${message}`);
  };

  const handleWalletConnect = (account) => {
    console.log("Wallet Info: ", account);
  };

  const handleAmountChange = (event) => {
    const value = event.target.value;
    const reg = /^\d*\.?\d*$/;

    if (reg.test(value)) {
      setAmountUsd(value);
    }
  };

  const handleMaxAmount = () => {
    if (!account) {
      handleError("Please connect your wallet to fetch available amount.");
      return;
    }

    setAmountUsd('500000'); // Set to max buy amount in USD
  };

  const handleBuy = async () => {
    if (!icoData.isActive) {
      handleError("ICO is not active.");
      return;
    }

    try {
      const usdAmount = parseFloat(amountUsd);

      // Check if the amount is within limits
      if (usdAmount < 150) {
        throw new Error('Amount is below the minimum buy limit of $150.');
      }
      if (usdAmount > 500000) {
        throw new Error('Amount exceeds the maximum buy limit of $500,000.');
      }

      // Convert USD amount to tokens
      const tokenAmount = Math.floor(usdAmount / parseFloat(icoData.tokenPrice)).toString();

      // Convert USD amount to ETH
      const ethAmount = (usdAmount / icoData.ethUsdPrice).toFixed(18);

      console.log(`Buying ${tokenAmount} tokens for $${usdAmount} (${ethAmount} ETH)`);

      // Call buyTokens with both token amount and ETH amount
      await buyTokens(tokenAmount, ethAmount);
      console.log("Tokens purchased successfully!");
    } catch (error) {
      console.error("Error during handleBuy:", error);
      handleError(error.message || "Failed to initiate token purchase.");
    }
  };

  useEffect(() => {
    if (!account) return;

    const contract = new ethers.Contract(presaleContractAddress, ParbAbi, provider);

    const tokensPurchasedFilter = contract.filters.TokensPurchased(account);
    const icoTierChangedFilter = contract.filters.IcoTierChanged();

    const handleTokensPurchased = (buyer, amount, price) => {
      console.log(`Tokens Purchased: ${amount} tokens for ${ethers.utils.formatEther(price)} ETH`);
      // You might want to refresh ICO data or update UI here
    };

    const handleIcoTierChanged = (newTier) => {
      console.log(`ICO Tier Changed to: ${newTier}`);
      // You might want to refresh ICO data or update UI here
    };

    contract.on(tokensPurchasedFilter, handleTokensPurchased);
    contract.on(icoTierChangedFilter, handleIcoTierChanged);

    return () => {
      contract.off(tokensPurchasedFilter, handleTokensPurchased);
      contract.off(icoTierChangedFilter, handleIcoTierChanged);
    };
  }, [account]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-column">
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%', fontSize: '1.25rem' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <main className="w-100 d-flex justify-content-center align-items-center ">
        <div className="container">
          <div className="row justify-content-center">
            <div className="">
                <div className="text-center mt-4 mb-4">
                  <h2 className="text-pros-green text-uppercase fw-semibold">
                    {icoData.isActive ? "PRESALE ACTIVE NOW!" : "PRESALE NOT ACTIVE"}
                  </h2>
                </div>

                <div className="mt-4 mb-4">
                  <h3 className="text-pros-green text-center fw-semibold">{icoData.currentTier}</h3>
                </div>

                <div className="w-100 mt-4 mb-4">
                  <ProgressBar current={icoData.tokensSold} goal={icoData.totalSupply} />
                </div>

                <div className="row g-4 mt-4 mb-5">
                  <div className="col-md-6">
                    <div className="bg-black p-4 rounded border border-pros-green h-100">
                      <h3 className="text-pros-green text-center fw-semibold mb-4">Token Information</h3>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Status:</span>
                        <span>{icoData.isActive ? "Active" : "Inactive"}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Price (USD):</span>
                        <span>{`$${icoData.tokenPrice}`}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Min Buy (USD):</span>
                        <span>$150</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Max Buy (USD):</span>
                        <span>$500,000</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="bg-black p-4 rounded border border-pros-green h-100">
                      <h3 className="text-pros-green text-center fw-semibold mb-4">Buy Tokens</h3>
                      <div className="mb-3">
                        <label className="form-label text-white">Amount (USD)</label>
                        <input
                          type="text"
                          value={amountUsd}
                          onChange={handleAmountChange}
                          className="form-control form-control-lg"
                        />
                      </div>
                      <button
                        onClick={handleMaxAmount}
                        className="btn btn-pros-green w-100 mb-3"
                      >
                        Max Amount
                      </button>
                      <button
                        onClick={handleBuy}
                        className="btn btn-pros-green w-100"
                        disabled={!icoData.isActive}
                      >
                        Buy Tokens
                      </button>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;