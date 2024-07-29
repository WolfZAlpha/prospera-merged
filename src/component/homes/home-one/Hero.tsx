import Image from "next/image"
import { DAppProvider, Chain } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'
import App from "./hero-components/App" // Import your dApp's main component
import hero_thumb from "@/assets/img/update/hero/hero-1-1.png"
import '@/styles/dapp-styles.css' // Import the dApp styles

const Hero = () => {
   const arbitrumChainId = 42161;
   const arbitrumChain: Chain = {
      chainId: arbitrumChainId,
      chainName: 'Arbitrum One',
      isTestChain: false,
      isLocalChain: false,
      multicallAddress: '0x842eC2c7D803033Edf55E478F461FC547Bc54EB2', // Arbitrum Multicall2 address
      getExplorerAddressLink: (address: string) => `https://arbiscan.io/address/${address}`,
      getExplorerTransactionLink: (transactionHash: string) => `https://arbiscan.io/tx/${transactionHash}`,
      // Add any other required properties for the Chain type
   };

   const config = {
      readOnlyChainId: arbitrumChainId,
      readOnlyUrls: {
         [arbitrumChainId]: getDefaultProvider('https://arbitrum-one-rpc.publicnode.com'),
      },
      networks: [arbitrumChain]
   };

   return (
      <div className="hero-wrapper hero-1 font-jakarta">
         <div className="hero-bg-gradient"></div>
         <div className="ripple-shape">
            <span className="ripple-1"></span>
            <span className="ripple-2"></span>
            <span className="ripple-3"></span>
            <span className="ripple-4"></span>
            <span className="ripple-5"></span>
         </div>

         <div className="container">
            <div className="hero-style1">
               <div className="row flex-row-reverse">
                  <div className="col-lg-3">
                     <div className="hero-thumb alltuchtopdown">
                        <Image src={hero_thumb} alt="img" />
                     </div>
                  </div>
                  <div className="col-lg-9 d-flex flex-column">
                     <h1 className="hero-title">
                        <span style={{ color: "#01ff02" }}>Prospera<h2 className="title style2">Pioneering The Future</h2></span>
                     </h1>
                  </div>
               </div>
            </div>
            <div className="hero-countdown-wrap dapp-container">
               <DAppProvider config={config}>
                  <App />
               </DAppProvider>
            </div>
         </div>
      </div>
   )
}

export default Hero