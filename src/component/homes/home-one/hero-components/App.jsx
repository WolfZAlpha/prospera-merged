"use client";

import React, { useState, useEffect, useCallback, forwardRef } from "react";
import { Snackbar, LinearProgress, Box, Typography } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { ethers } from "ethers";
import { useWalletContext } from "@/context/WalletContext"; // Adjust the path as necessary
import useWalletConnection from "@/hooks/useWalletConnection"; // Adjust the path as necessary
import ParbAbi from "./pros_abi.json";

// Provider and contract setup
const provider = new ethers.providers.JsonRpcProvider(
  "https://arbitrum-one-rpc.publicnode.com"
);
const presaleContractAddress = "0x637124d60bb8584a83e64055C5c1266ff7093Be6";

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

  const fetchIcoData = useCallback(async () => {
    try {
      const contract = new ethers.Contract(
        presaleContractAddress,
        ParbAbi,
        provider
      );

      const icoState = await contract.getIcoState();
      const isActive = icoState[0];
      const currentTier = icoState[1];
      const tier1Sold = icoState[2];
      const tier2Sold = icoState[3];
      const tier3Sold = icoState[4];

      const tier1TokensBN = await contract.TIER1_TOKENS();
      const tier2TokensBN = await contract.TIER2_TOKENS();
      const tier3TokensBN = await contract.TIER3_TOKENS();
      const tierPriceUSD = await contract.getCurrentTierPriceUSD();
      const ethUsdPriceBN = await contract.getLatestPrice();

      const ethUsdPrice = parseFloat(
        ethers.utils.formatUnits(ethUsdPriceBN, 8)
      );
      const tokenPrice = parseFloat(ethers.utils.formatUnits(tierPriceUSD, 8));

      let tokensSold, totalSupply;

      if (currentTier === 0) {
        tokensSold = tier1Sold;
        totalSupply = tier1TokensBN;
      } else if (currentTier === 1) {
        tokensSold = tier2Sold;
        totalSupply = tier2TokensBN;
      } else if (currentTier === 2) {
        tokensSold = tier3Sold;
        totalSupply = tier3TokensBN;
      }

      const tierLabels = ["Tier 1", "Tier 2", "Tier 3"];
      const tierLabel = isActive ? tierLabels[currentTier] : "Inactive";

      const minBuyUsd = await contract.MIN_BUY_USD();
      const maxBuyUsd = await contract.MAX_BUY_USD();

      setIcoData({
        isActive,
        currentTier: tierLabel,
        tokensSold: parseInt(tokensSold.toString()),
        totalSupply: parseInt(totalSupply.toString()),
        tokenPrice: tokenPrice,
        minBuy: parseFloat(ethers.utils.formatUnits(minBuyUsd, 8)),
        maxBuy: parseFloat(ethers.utils.formatUnits(maxBuyUsd, 8)),
        ethUsdPrice: ethUsdPrice,
      });
    } catch (error) {
      console.error("Error fetching ICO data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIcoData();
  }, [fetchIcoData, account]);

  const buyTokens = useCallback(
    async (tokenAmount, ethAmount) => {
      if (!account || !library) {
        throw new Error("Please connect your wallet to purchase tokens.");
      }

      const signer = library.getSigner();
      const contract = new ethers.Contract(
        presaleContractAddress,
        ParbAbi,
        signer
      );

      const tokenAmountBN = ethers.BigNumber.from(tokenAmount);
      const ethAmountBN = ethers.utils.parseEther(ethAmount);

      const minBuy = await contract.getMinIcoBuy();
      const maxBuy = await contract.getMaxIcoBuy();
      console.log(`Min Buy (ETH): ${ethers.utils.formatEther(minBuy)} ETH`);
      console.log(`Max Buy (ETH): ${ethers.utils.formatEther(maxBuy)} ETH`);
      console.log(
        `Attempting to buy: ${tokenAmount} tokens for ${ethAmount} ETH`
      );

      // Temporary fix: use hardcoded USD limits instead of contract-reported ETH limits
      const minBuyUsd = 150;
      const maxBuyUsd = 500000;
      const ethUsdPrice = icoData.ethUsdPrice;
      const ethAmountUsd = parseFloat(ethAmount) * ethUsdPrice;

      if (ethAmountUsd < minBuyUsd) {
        throw new Error(
          `USD amount ($${ethAmountUsd.toFixed(
            2
          )}) is below the minimum buy limit ($${minBuyUsd}).`
        );
      }
      if (ethAmountUsd > maxBuyUsd) {
        throw new Error(
          `USD amount ($${ethAmountUsd.toFixed(
            2
          )}) exceeds the maximum buy limit ($${maxBuyUsd}).`
        );
      }

      const gasLimit = ethers.BigNumber.from("30000000");
      console.log(`Gas Limit set to: ${gasLimit.toString()}`);

      try {
        const tx = await contract.buyTokens(tokenAmountBN, {
          value: ethAmountBN,
          gasLimit: gasLimit,
        });

        await tx.wait();
        console.log("Tokens purchased successfully!");
        await fetchIcoData(); // Refresh ICO data after successful purchase
      } catch (error) {
        console.error("Error during token purchase:", error);
        if (error.data && error.data.message) {
          console.error("Revert reason:", error.data.message);
        }
        throw new Error(error.data?.message || "Failed to purchase tokens.");
      }
    },
    [account, library, icoData.ethUsdPrice, fetchIcoData]
  );

  return { icoData, isLoading, buyTokens, fetchIcoData };
};

const ProgressBar = ({ current, goal, styles }) => {
  const progress = goal > 0 ? (current / goal) * 100 : 0;

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        bgcolor: "black",
        border: "2px solid #01ff02",
        mt: 5,
      }}
      className="rounded-md shadow-green-500/50 shadow-[0_0_15px_5px_rgba(0,255,0,0.5)]"
    >
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: "45px",
          bgcolor: "black",
          "& .MuiLinearProgress-bar": {
            bgcolor: "#01ff02",
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "4px",
          transform: "translateY(-50%)",
          color: "white",
        }}
      >
        <Typography
          variant="body2"
          noWrap
          sx={{
            fontSize: styles.progressBarText.fontSize,
            fontWeight: "bold",
            WebkitTextStroke: ".5px black",
            WebkitTextFillColor: "white",
          }}
        >
          {current} $PROS
        </Typography>
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          right: "4px",
          transform: "translateY(-50%)",
          color: "white",
        }}
      >
        <Typography
          variant="body2"
          noWrap
          sx={{
            fontSize: styles.progressBarText.fontSize,
            fontWeight: "bold",
            WebkitTextStroke: ".5px black",
            WebkitTextFillColor: "white",
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
  const { icoData, isLoading, buyTokens, fetchIcoData } = useIcoData();
  const [amountUsd, setAmountUsd] = useState("0");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { isWalletConnected } = useWalletContext();
  const { walletInfo, connectWallet, disconnectWallet } = useWalletConnection();

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
    if (isWalletConnected) {
      console.log("Wallet connected");
    }
  }, [isWalletConnected]);

  const handleError = (message) => {
    setErrorMessage(message);
    setOpenSnackbar(true);
    console.log(`Error: ${message}`);
  };

  const handleAmountChange = (event) => {
    const value = event.target.value;
    const reg = /^\d*\.?\d*$/;

    if (reg.test(value)) {
      setAmountUsd(value);
    }
  };

  const handleMaxAmount = () => {
    if (!isWalletConnected) {
      handleError("Please connect your wallet to fetch the available amount.");
      return;
    }

    setAmountUsd(icoData.maxBuy.toString());
  };

  const handleBuy = async () => {
    if (!icoData.isActive) {
      handleError("ICO is not active.");
      return;
    }

    try {
      const usdAmount = parseFloat(amountUsd);

      // Check if the amount is within limits
      if (usdAmount < icoData.minBuy) {
        throw new Error(
          `Amount is below the minimum buy limit of $${icoData.minBuy}.`
        );
      }
      if (usdAmount > icoData.maxBuy) {
        throw new Error(
          `Amount exceeds the maximum buy limit of $${icoData.maxBuy}.`
        );
      }

      // Convert USD amount to ETH
      const ethAmount = (usdAmount / icoData.ethUsdPrice).toFixed(18);

      // Calculate tokens to be received (based on 90% of the ETH amount after tax deduction)
      const effectiveUsdAmount = usdAmount * 0.9; // 10% tax is deducted
      const tokenAmount = Math.floor(
        effectiveUsdAmount / icoData.tokenPrice
      ).toString();

      console.log(
        `Buying approximately ${tokenAmount} tokens for $${usdAmount} (${ethAmount} ETH)`
      );

      // Call buyTokens with token amount and ETH amount
      await buyTokens(tokenAmount, ethAmount);
      console.log("Tokens purchased successfully!");
      await fetchIcoData(); // Refresh ICO data after successful purchase
    } catch (error) {
      console.error("Error during handleBuy:", error);
      handleError(error.message || "Failed to initiate token purchase.");
    }
  };

  useEffect(() => {
    if (!account) return;

    const contract = new ethers.Contract(
      presaleContractAddress,
      ParbAbi,
      provider
    );

    const tokensPurchasedFilter = contract.filters.TokensPurchased(account);
    const icoTierChangedFilter = contract.filters.IcoTierChanged();

    const handleTokensPurchased = async (buyer, amount, price) => {
      console.log(
        `Tokens Purchased: ${amount} tokens for ${ethers.utils.formatEther(
          price
        )} ETH`
      );
      await fetchIcoData(); // Refresh ICO data after token purchase
    };

    const handleIcoTierChanged = async (newTier) => {
      console.log(`ICO Tier Changed to: ${newTier}`);
      await fetchIcoData(); // Refresh ICO data after tier change
    };

    contract.on(tokensPurchasedFilter, handleTokensPurchased);
    contract.on(icoTierChangedFilter, handleIcoTierChanged);

    return () => {
      contract.off(tokensPurchasedFilter, handleTokensPurchased);
      contract.off(icoTierChangedFilter, handleIcoTierChanged);
    };
  }, [account, fetchIcoData]);

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Helper function to get responsive styles
  const getResponsiveStyles = () => {
    const width = windowWidth;

    if (width <= 576) {
      return {
        largeText: { fontSize: "1rem" },
        progressBarText: { fontSize: "0.8rem" }, // Smaller font for progress bar
        mediumText: { fontSize: "0.9rem" },
        smallText: { fontSize: "0.8rem" },
        buttonText: { fontSize: "0.8rem", padding: "6px 12px" },
      };
    } else if (width <= 992) {
      return {
        largeText: { fontSize: "1.25rem" },
        progressBarText: { fontSize: "1rem" },
        mediumText: { fontSize: "1.1rem" },
        smallText: { fontSize: "0.9rem" },
        buttonText: { fontSize: "0.9rem", padding: "8px 16px" },
      };
    } else {
      return {
        largeText: { fontSize: "1.5rem" },
        progressBarText: { fontSize: "1.25rem" },
        mediumText: { fontSize: "1.25rem" },
        smallText: { fontSize: "1rem" },
        buttonText: { fontSize: "1rem", padding: "10px 20px" },
      };
    }
  };

  const styles = getResponsiveStyles();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-column">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          sx={{ width: "100%", fontSize: "1.25rem" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
      <main className="w-100 d-flex justify-content-center align-items-center ">
        <div className="container">
          <div className="row justify-content-center">
            <div className="">
              <div className="text-center mt-4 mb-4">
                <h2
                  className="text-pros-green text-uppercase fw-semibold"
                  style={styles.largeText}
                >
                  {icoData.isActive
                    ? "PRESALE ACTIVE NOW!"
                    : "PRESALE NOT ACTIVE"}
                </h2>
              </div>

              <div className="mt-4 mb-4">
                <h3
                  className="text-pros-green text-center fw-semibold"
                  style={styles.mediumText}
                >
                  {icoData.currentTier}
                </h3>
              </div>

              <div className="w-100 mt-4 mb-4">
                <ProgressBar
                  current={icoData.tokensSold}
                  goal={icoData.totalSupply}
                  styles={styles}
                />
              </div>

              <div className="row g-4 mt-4 mb-5">
                <div className="col-md-6">
                  <div className="bg-black p-4 rounded border border-pros-green h-100">
                    <h3
                      className="text-pros-green text-center fw-semibold mb-4"
                      style={styles.mediumText}
                    >
                      Token Information
                    </h3>
                    <div
                      className="d-flex justify-content-between mb-2"
                      style={styles.smallText}
                    >
                      <span>Status:</span>
                      <span>{icoData.isActive ? "Active" : "Inactive"}</span>
                    </div>
                    <div
                      className="d-flex justify-content-between mb-2"
                      style={styles.smallText}
                    >
                      <span>Price (USD):</span>
                      <span>{`$${icoData.tokenPrice.toFixed(2)}`}</span>
                    </div>
                    <div
                      className="d-flex justify-content-between mb-2"
                      style={styles.smallText}
                    >
                      <span>Min Buy (USD):</span>
                      <span>${icoData.minBuy.toFixed(2)}</span>
                    </div>
                    <div
                      className="d-flex justify-content-between mb-2"
                      style={styles.smallText}
                    >
                      <span>Max Buy (USD):</span>
                      <span>${icoData.maxBuy.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="bg-black p-4 rounded border border-pros-green h-100">
                    <h3
                      className="text-pros-green text-center fw-semibold mb-4"
                      style={styles.mediumText}
                    >
                      Buy Tokens
                    </h3>
                    <div className="mb-3">
                      <label
                        className="form-label text-white"
                        style={styles.smallText}
                      >
                        Amount (USD)
                      </label>
                      <input
                        type="text"
                        value={amountUsd}
                        onChange={handleAmountChange}
                        className="form-control form-control-lg"
                        style={styles.smallText}
                      />
                      {parseFloat(amountUsd) > 0 && (
                        <div
                          className="mt-2 text-white"
                          style={styles.smallText}
                        >
                          <p>
                            Approximate tokens to receive:{" "}
                            {Math.floor(
                              (parseFloat(amountUsd) * 0.9) /
                              icoData.tokenPrice
                            )}
                          </p>
                          <p>
                            ETH to send:{" "}
                            {(
                              parseFloat(amountUsd) / icoData.ethUsdPrice
                            ).toFixed(6)}{" "}
                            ETH
                          </p>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={handleMaxAmount}
                      className="btn btn-pros-green w-100 mb-3"
                      style={styles.buttonText}
                    >
                      Max Amount
                    </button>
                    <button
                      onClick={handleBuy}
                      className="btn btn-pros-green w-100"
                      disabled={!icoData.isActive}
                      style={styles.buttonText}
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
