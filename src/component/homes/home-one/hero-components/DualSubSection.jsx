import React from "react";
import buybutton from "./../assets/images/buy-button.svg";
import countdownBox from "./../assets/images/countdown-bg.png";

const DualSubSection = ({ status, statusType, minBuy, maxBuy, amount, isMaxAmount, handleAmountChange, handleMaxAmount, handleBuy }) => {
  return (
    <div className="mt-10 w-full">
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-10 justify-center items-center">
        {/* First Section */}
        <section
          className="overflow-hidden relative bg-no-repeat bg-contain"
          style={{
            backgroundImage: `url(${countdownBox})`,
            backgroundPosition: "center",
            minHeight: "25em",
          }}
        >
          <div className="text-white p-4 md:p-6 lg:p-20 grid">
            <div className="text-sm sm:text-sm md:text-base lg:text-xl text-white p-4 sm:p-4 sm:mt-20 md:p-6 lg:p-20 grid grid-cols-2 md:grid-cols-2 items-center">
              <div className="flex flex-col space-y-2.5 justify-center">
                <div>Status</div>
                <div>Sale type</div>
                <div>Minimum buy</div>
                <div>Maximum buy</div>
              </div>
              <div className="flex flex-col space-y-2.5 items-end justify-center">
                <div>{status}</div>
                <div>{statusType}</div>
                <div>{minBuy}</div>
                <div>{maxBuy}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Second Section */}
        <section
  className="overflow-hidden relative bg-no-repeat bg-contain"
  style={{
    backgroundImage: `url(${countdownBox})`,
    backgroundPosition: "center",
    minHeight: "25em",
  }}
>
  <div className="text-white p-4 md:p-6 lg:p-20 grid place-items-center h-full">
    <div className="flex flex-col items-center justify-center h-full">
      <div className="mt-10">AMOUNT OF TOKENS</div>
      <div className="mt-10">
        <div
          className="flex items-center justify-between rounded-lg"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            height: "60px",
            maxWidth: "80%",
            margin: "0 auto",
          }}
        >
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            className="w-full h-full pl-4 pr-12 text-xs md:text-sm lg:text-2xl outline-none appearance-none bg-transparent"
            min="0"
            max="1"
          />
          <button onClick={handleMaxAmount} className="px-4 text-xs md:text-sm lg:text-2xl bg-transparent" disabled={isMaxAmount}>
            MAX
          </button>
        </div>
      </div>
      {/* Ensure this is correctly using className for JSX */}
      <p className="text-center mt-4">Price per PARB = .0000000058 ETH</p>
      <div className="mt-4 w-auto">
        <button className="bg-transparent w-full flex justify-center items-center" onClick={handleBuy}>
          <img src={buybutton} alt="buy" style={{ maxHeight: "60px" }} />
        </button>
      </div>
    </div>
  </div>
</section>
      </div>
    </div>
  );
};

export default DualSubSection;
