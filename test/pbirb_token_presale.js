const Pbirb = artifacts.require("Parrotly");
const PbirbTokenPresale = artifacts.require("PbirbTokenPresale");
const { assert } = require("chai");
const truffleAssert = require("truffle-assertions");

contract("PbirbTokenPresale", (accounts) => {
  let token;
  let contract;
  const deployer = accounts[0];
  const wallet = accounts[3];
  const whitelistSalePbirbCap = 187500000000;
  const publicSalePbirbCap = 287500000000;
  const maxCap = web3.utils.toWei(`${whitelistSalePbirbCap + publicSalePbirbCap}`);

  beforeEach("Setup contract", async () => {
    token = await Pbirb.new();
    contract = await PbirbTokenPresale.new(1, wallet, token.address);
  });

  context("#constructor", async () => {
    context("With initial deployment", async () => {
      it("Sets presale information", async () => {
        assert.equal(await contract.rate(), 1);
        assert.equal(await contract.wallet(), wallet);
        assert.equal(await contract.token(), token.address);
      });
    });
  });

  context("#purchasing", async () => {
    context("#receive", async () => {
      it("Emits TokensPurchased event", async () => {
        await token.enableTrading();
        await token.transfer(contract.address, maxCap, { from: deployer });
        await contract.lockSaleParameters();
        await contract.setWhitelistSaleActive(true);
        await contract.addAddressToWhitelist(accounts[1]);

        truffleAssert.eventEmitted(
          await contract.sendTransaction({ from: accounts[1], value: 1 }),
          "TokensPurchased",
          (ev) => {
            return ev.purchaser === accounts[1]
              && ev.beneficiary === accounts[1]
              && parseInt(ev.value) === 1
              && parseInt(ev.amount) === 5000000;
          });
      });
    });

    context("#fallback", async () => {
      it("Emits TokensPurchased event", async () => {
        await token.enableTrading();
        await token.transfer(contract.address, maxCap, { from: deployer });
        await contract.lockSaleParameters();
        await contract.setWhitelistSaleActive(true);
        await contract.addAddressToWhitelist(accounts[1]);

        truffleAssert.eventEmitted(
          await contract.sendTransaction({ from: accounts[1], value: 1, data: "123" }),
          "TokensPurchased",
          (ev) => {
            return ev.purchaser === accounts[1]
              && ev.beneficiary === accounts[1]
              && parseInt(ev.value) === 1
              && parseInt(ev.amount) === 5000000;
          });
      });
    });

    context("#buyTokens", async () => {
      context("Any time beneficiary buys tokens", async () => {
        it("Fails when beneficiary is zero address", async () => {
          await contract.lockSaleParameters();
          await truffleAssert.fails(
            contract.buyTokens("0x0000000000000000000000000000000000000000", { value: 1 }),
            "Beneficiary is the zero address"
          );
        });

        it("Fails when amount is zero", async () => {
          await contract.lockSaleParameters();
          await truffleAssert.fails(
            contract.buyTokens(accounts[1], { from: accounts[1], value: 0 }),
            "weiAmount is 0"
          );
        });

        it("Fails when sale parameters are not locked", async () => {
          await truffleAssert.fails(
            contract.buyTokens(accounts[1], { from: accounts[1], value: 1 }),
            "Sale parameters are not locked"
          );
        });

        it("Fails when whitelist sale and public presale are both not active", async () => {
          await contract.lockSaleParameters();
          await truffleAssert.fails(
            contract.buyTokens(accounts[1], { from: accounts[1], value: 1 }),
            "Whitelist sale and public sale are both not active"
          );
        });
      });

      context("During the whitelist sale", async () => {
        beforeEach("Send tokens to presale contract and whitelist an address", async () => {
          await token.enableTrading();
          await token.transfer(contract.address, maxCap, { from: deployer });
          await contract.addAddressToWhitelist(accounts[1]);
        });

        it("Fails when beneficiary address is not whitelisted", async () => {
          await contract.lockSaleParameters();
          await contract.setWhitelistSaleActive(true);
          await truffleAssert.fails(
            contract.buyTokens(accounts[2], { from: accounts[2], value: 1 }),
            "Beneficiary address is not whitelisted"
          );
        });

        it("Fails when amount exceeds maximum buy amount", async () => {
          await contract.lockSaleParameters();
          await contract.setWhitelistSaleActive(true);
          const maxPbirbPerAddress = await contract.getMaxPbirbPerAddress();
          const whitelistSaleRate = await contract.getWhitelistSaleRate();
          const maxMaticPerAddress = maxPbirbPerAddress / whitelistSaleRate;
          const value = web3.utils.toBN(maxMaticPerAddress).add(new web3.utils.BN(1));
          await truffleAssert.fails(
            contract.buyTokens(accounts[1], { from: accounts[1], value: value }),
            "Exceeds maximum buy amount"
          );
        });

        it("Fails when amount exceeds cap", async () => {
          const whitelistSaleRate = await contract.getPublicSaleRate();
          await contract.setWhitelistSalePbirbCap(whitelistSaleRate - 1);
          await contract.lockSaleParameters();
          await contract.setWhitelistSaleActive(true);
          await truffleAssert.fails(
            contract.buyTokens(accounts[1], { from: accounts[1], value: 1 }),
            "Exceeds whitelist cap"
          );
        });

        it("Fails when beneficiary address total exceeds maximum buy amount", async () => {
          await contract.lockSaleParameters();
          await contract.setWhitelistSaleActive(true);
          await contract.buyTokens(accounts[1], { from: accounts[1], value: web3.utils.toWei("250") })
          await truffleAssert.fails(
            contract.buyTokens(accounts[1], { from: accounts[1], value: 1 }),
            "Beneficiary address total exceeds maximum buy amount"
          );
        });

        it("Sends token to beneficiary", async () => {
          await contract.lockSaleParameters();
          await contract.setWhitelistSaleActive(true);
          const walletBalanceBefore = await web3.eth.getBalance(wallet);
          await contract.buyTokens(accounts[1], { from: accounts[1], value: 1 });
          const walletBalanceAfter = await web3.eth.getBalance(wallet);
          const whitelistSaleRate = await contract.getWhitelistSaleRate();
          assert.equal((await token.balanceOf(accounts[1])).toString(), whitelistSaleRate.toString());
          assert.equal(await contract.weiRaised(), 1);
          assert.equal((await contract.getWhitelistSalePbirbSold()).toString(), whitelistSaleRate.toString());
          assert.equal(walletBalanceAfter - 1, walletBalanceBefore);
        });
      });

      context("During the public sale", async () => {
        beforeEach("Send tokens to presale contract", async () => {
          await token.enableTrading();
          await token.transfer(contract.address, maxCap, { from: deployer });          
        });

        it("Fails when amount exceeds maximum buy amount", async () => {
          await contract.lockSaleParameters();
          await contract.setWhitelistSaleActive(true);
          await contract.setPublicSaleActive(true);
          const maxPbirbPerAddress = await contract.getMaxPbirbPerAddress();
          const publicSaleRate = await contract.getPublicSaleRate();
          const maxMaticPerAddress = Math.floor(maxPbirbPerAddress / publicSaleRate);
          const value = web3.utils.toBN(maxMaticPerAddress).add(new web3.utils.BN(1));
          await truffleAssert.fails(
            contract.buyTokens(accounts[1], { from: accounts[1], value: web3.utils.toWei(value) }),
            "Exceeds maximum buy amount"
          );
        });

        it("Fails when amount exceeds cap", async () => {
          const publicSaleRate = await contract.getPublicSaleRate();
          await contract.setWhitelistSalePbirbCap(0); // prevent rolling WL tokens to public sale
          await contract.setPublicSalePbirbCap(publicSaleRate - 1);
          await contract.lockSaleParameters();
          await contract.setWhitelistSaleActive(true);
          await contract.setPublicSaleActive(true);
          await truffleAssert.fails(
            contract.buyTokens(accounts[1], { from: accounts[1], value: 1 }),
            "Exceeds public cap"
          );
        });

        it("Fails when beneficiary address total exceeds maximum buy amount", async () => {
          await contract.lockSaleParameters();
          await contract.setWhitelistSaleActive(true);
          await contract.setPublicSaleActive(true);
          await contract.buyTokens(accounts[1], { from: accounts[1], value: web3.utils.toWei("275") });
          await truffleAssert.fails(
            contract.buyTokens(accounts[1], { from: accounts[1], value: 1 }),
            "Beneficiary address total exceeds maximum buy amount"
          );
        });

        it("Sends token to beneficiary", async () => {
          await contract.lockSaleParameters();
          await contract.setWhitelistSaleActive(true);
          await contract.setPublicSaleActive(true);
          const walletBalanceBefore = await web3.eth.getBalance(wallet);
          await contract.buyTokens(accounts[1], { from: accounts[1], value: 1 });
          const walletBalanceAfter = await web3.eth.getBalance(wallet);
          const publicSaleRate = await contract.getPublicSaleRate();
          assert.equal((await token.balanceOf(accounts[1])).toString(), publicSaleRate.toString());
          assert.equal(await contract.weiRaised(), 1);
          assert.equal((await contract.getPublicSalePbirbSold()).toString(), publicSaleRate.toString());
          assert.equal(walletBalanceAfter - 1, walletBalanceBefore);
        });
      });

      context("During the whitelist sale then the public sale", async () => {
        beforeEach("Send tokens to presale contract", async () => {
          await token.enableTrading();
          await token.transfer(contract.address, maxCap, { from: deployer });
          await contract.lockSaleParameters();
          await contract.addAddressToWhitelist(accounts[1]);
          await contract.setWhitelistSaleActive(true);
        });

        const getTotal = async (whitelistSaleMaticPurchase, publicSaleMaticPurchase) => {
          const whitelistSaleRate = await contract.getWhitelistSaleRate();
          const publicSaleRate = await contract.getPublicSaleRate();
          const whitelistSalePbirbTotal = whitelistSaleMaticPurchase * whitelistSaleRate;
          const publicSalePbirbTotal = publicSaleMaticPurchase * publicSaleRate;
          const totalPbirb = whitelistSalePbirbTotal + publicSalePbirbTotal;
          // console.log(`WL pbirb: ${whitelistSalePbirbTotal}`);
          // console.log(`psale pbirb: ${publicSalePbirbTotal}`);
          // console.log(`total pbirb: ${totalPbirb}`);
          return totalPbirb;
        }

        it("Sends token to beneficiary 200/55", async () => {
          const whitelistMaticPurchase = "200";
          const publicMaticPurchase = "55";
          const totalPurchase = await getTotal(whitelistMaticPurchase, publicMaticPurchase);
          await contract.buyTokens(accounts[1], { from: accounts[1], value: web3.utils.toWei(whitelistMaticPurchase) });
          await contract.setPublicSaleActive(true);
          await contract.buyTokens(accounts[1], { from: accounts[1], value: web3.utils.toWei(publicMaticPurchase) });
          assert.equal((await token.balanceOf(accounts[1])).toString(), web3.utils.toWei(totalPurchase.toString()));
        });

        it("Sends token to beneficiary 199.75/55.25", async () => {
          const whitelistMaticPurchase = "199.75";
          const publicMaticPurchase = "55.25";
          const totalPurchase = await getTotal(whitelistMaticPurchase, publicMaticPurchase);
          await contract.buyTokens(accounts[1], { from: accounts[1], value: web3.utils.toWei(whitelistMaticPurchase) });
          await contract.setPublicSaleActive(true);
          await contract.buyTokens(accounts[1], { from: accounts[1], value: web3.utils.toWei(publicMaticPurchase) });
          assert.equal((await token.balanceOf(accounts[1])).toString(), web3.utils.toWei(totalPurchase.toString()));
        });

        it("Sends token to beneficiary 199.5/55.5", async () => {
          const whitelistMaticPurchase = "199.5";
          const publicMaticPurchase = "55.5";
          const totalPurchase = await getTotal(whitelistMaticPurchase, publicMaticPurchase);
          await contract.buyTokens(accounts[1], { from: accounts[1], value: web3.utils.toWei(whitelistMaticPurchase) });
          await contract.setPublicSaleActive(true);
          await contract.buyTokens(accounts[1], { from: accounts[1], value: web3.utils.toWei(publicMaticPurchase) });
          assert.equal((await token.balanceOf(accounts[1])).toString(), web3.utils.toWei(totalPurchase.toString()));
        });

        it("Sends token to beneficiary 199.25/55.75", async () => {
          const whitelistMaticPurchase = "199.25";
          const publicMaticPurchase = "55.75";
          const totalPurchase = await getTotal(whitelistMaticPurchase, publicMaticPurchase);
          await contract.buyTokens(accounts[1], { from: accounts[1], value: web3.utils.toWei(whitelistMaticPurchase) });
          await contract.setPublicSaleActive(true);
          await contract.buyTokens(accounts[1], { from: accounts[1], value: web3.utils.toWei(publicMaticPurchase) });
          assert.equal((await token.balanceOf(accounts[1])).toString(), web3.utils.toWei(totalPurchase.toString()));
        });
      });
    });
  });

  context("#endSale", async () => {
    it("Fails when public sale is not active", async () => {
      await truffleAssert.fails(
        contract.endSale(),
        "Public sale has not started"
      );
    });
    
    it("Sends pbirb to the owner wallet", async () => {
      const originalTokenCap = await token.balanceOf(deployer);
      await token.enableTrading();
      await token.transfer(contract.address, maxCap, { from: deployer });
      assert.equal(await token.balanceOf(contract.address), maxCap);
      await contract.lockSaleParameters();
      await contract.setWhitelistSaleActive(true);
      await contract.setPublicSaleActive(true);
      await contract.endSale();
      assert.equal((await token.balanceOf(contract.address)).toString(), "0");
      assert.equal((await token.balanceOf(deployer)).toString(), originalTokenCap.toString());
    });

    it("Makes publicSaleActive equal to false", async () => {
      await token.enableTrading();
      await contract.lockSaleParameters();
      await contract.setWhitelistSaleActive(true);
      await contract.setPublicSaleActive(true);
      await contract.endSale();
      assert.isFalse(await contract.getPublicSaleActive());
    });
  });

  context("#properties", async () => {
    context("#addAddressToWhitelist", async () => {
      it("Adds the address to the whitelist", async () => {
        assert.equal(await contract.isAddressWhitelisted(deployer), false);
        await contract.addAddressToWhitelist(deployer);
        assert.equal(await contract.isAddressWhitelisted(deployer), true);
      });
    });

    context("#addAddressesToWhitelist", async () => {
      it("Adds one address to the whitelist", async () => {
        assert.equal(await contract.isAddressWhitelisted(deployer), false);
        await contract.addAddressToWhitelist(deployer);
        assert.equal(await contract.isAddressWhitelisted(deployer), true);
      });

      it("Adds single address to the whitelist", async () => {
        assert.equal(await contract.isAddressWhitelisted(deployer), false);
        await contract.addAddressesToWhitelist([deployer]);
        assert.equal(await contract.isAddressWhitelisted(deployer), true);
      });

      it("Adds multiple addresses to the whitelist", async () => {
        assert.equal(await contract.isAddressWhitelisted(deployer), false);
        assert.equal(await contract.isAddressWhitelisted(accounts[1]), false);
        await contract.addAddressesToWhitelist([deployer, accounts[1]]);
        assert.equal(await contract.isAddressWhitelisted(deployer), true);
        assert.equal(await contract.isAddressWhitelisted(accounts[1]), true);
      });
    });

    context("#singleAddressCheck", async () => {
      beforeEach("Send tokens to presale contract", async () => {
        await token.enableTrading();
        await token.transfer(contract.address, maxCap, { from: deployer });
        await contract.addAddressToWhitelist(accounts[1]);
        await contract.lockSaleParameters();
        await contract.setWhitelistSaleActive(true);
      });

      it("Checks if caller address is whitelisted", async () => {
        assert.equal(await contract.singleAddressCheckWhitelist({ from: accounts[1] }), true);
      });

      it("Returns pbirb amount purchased by caller address", async () => {
        const whitelistSaleRate = await contract.getWhitelistSaleRate();
        const weiSpent = 1;
        await contract.buyTokens(accounts[1], { from: accounts[1], value: weiSpent });
        const expectedPurchaseAmount = whitelistSaleRate * weiSpent;
        const actualPurchasedAmount = await contract.singleAddressCheckPbirbAmountPurchased({ from: accounts[1] });
        assert.equal(actualPurchasedAmount.toString(), expectedPurchaseAmount.toString());
      });

      it("Returns pbirb amount left for purchase by caller address", async () => {
        const whitelistSaleRate = await contract.getWhitelistSaleRate();
        const maxPbirbPerAddress = await contract.getMaxPbirbPerAddress();
        const weiSpent = 1;
        await contract.buyTokens(accounts[1], { from: accounts[1], value: weiSpent });
        const expectedAmountLeft = maxPbirbPerAddress.sub(web3.utils.toBN(whitelistSaleRate * weiSpent));
        const actualAmountLeft = await contract.singleAddressCheckPbirbAmountAvailable({ from: accounts[1] });
        assert.equal(actualAmountLeft.toString(), expectedAmountLeft.toString());
      });
    });

    context("#removeAddressFromWhitelist", async () => {
      beforeEach("Add address to whitelist", async () => {
        await contract.addAddressToWhitelist(deployer);
      });

      it("Removes the address from the whitelist", async () => {
        await contract.removeAddressFromWhitelist(deployer);
        assert.equal(await contract.isAddressWhitelisted(deployer), false);
      });
    });

    context("#saleParametersLocked", async () => {
      it("Gets saleParametersLocked", async () => {
        assert.equal(await contract.getSaleParametersLocked(), false);
      });

      it("Sets saleParametersLocked", async () => {
        await contract.lockSaleParameters();
        await contract.setWhitelistSaleActive(true);
        assert.equal(await contract.getSaleParametersLocked(), true);
      });
    });

    context("#whitelistSaleActive", async () => {
      it("Gets whitelistSaleActive", async () => {
        assert.equal(await contract.getWhitelistSaleActive(), false);
      });

      it("Sets whitelistSaleActive", async () => {
        await contract.lockSaleParameters();
        await contract.setWhitelistSaleActive(true);
        assert.equal(await contract.getWhitelistSaleActive(), true);
      });

      it("Cannot be set until sale parameters are locked", async () => {
        await truffleAssert.fails(
          contract.setWhitelistSaleActive(true),
          "Sale parameters are not locked"
        );
      });

      it("When whitelist sale ends then setwhitelistSaleActive true fails", async () => {
        await contract.lockSaleParameters();
        await contract.setWhitelistSaleActive(true);
        await contract.setPublicSaleActive(true);
        await truffleAssert.fails(
          contract.setWhitelistSaleActive(true),
          "Whitelist sale has ended"
        );
      });
    });

    context("#publicSaleActive", async () => {
      it("Gets publicSaleActive", async () => {
        assert.equal(await contract.getPublicSaleActive(), false);
      });

      it("Sets publicSaleActive", async () => {
        await contract.lockSaleParameters();
        await contract.setWhitelistSaleActive(true);
        await contract.setPublicSaleActive(true);
        assert.equal(await contract.getPublicSaleActive(), true);
      });

      it("Cannot be set until sale parameters are locked", async () => {      
        await truffleAssert.fails(
          contract.setPublicSaleActive(true),
          "Sale parameters are not locked"
        );
      });

      it("When whitelist sale is not active then setPublicSaleActive fails", async () => {
        await contract.lockSaleParameters();
        await truffleAssert.fails(
          contract.setPublicSaleActive(true),
          "Whitelist sale has not started"
        );
      });

      it("Adjusts maxPbirbPerAddress when activated", async () => {
        await contract.lockSaleParameters();
        await contract.setWhitelistSaleActive(true);
        await contract.setPublicSaleActive(true);
        assert.equal((await contract.getMaxPbirbPerAddress()).toString(), web3.utils.toWei("1250000125").toString())
      });

      it("Transfers whitelist tokens to public cap when activated", async () => {
        await token.enableTrading();
        await token.transfer(contract.address, maxCap, { from: deployer });
        await contract.addAddressToWhitelist(accounts[1]);
        await contract.lockSaleParameters();

        const buyAmount = web3.utils.toWei("100");
        const publicSaleCap = web3.utils.toBN(await contract.getPublicSalePbirbCap());
        await contract.setWhitelistSaleActive(true);
        await contract.buyTokens(accounts[1], { from: accounts[1], value: buyAmount });
        await contract.setPublicSaleActive(true);

        const getWhitelistSalePbirbSold = web3.utils.toBN(await contract.getWhitelistSalePbirbSold());
        const whitelistSaleCap = web3.utils.toBN(await contract.getWhitelistSalePbirbCap());
        const newPublicSaleCap = publicSaleCap.add(whitelistSaleCap.sub(getWhitelistSalePbirbSold));

        assert.isTrue(web3.utils.toBN(await contract.getPublicSalePbirbCap()).eq(newPublicSaleCap));
      });

      it("Does not transfer whitelist tokens more than once", async () => {
        await token.enableTrading();
        await token.transfer(contract.address, maxCap, { from: deployer });
        await contract.addAddressToWhitelist(accounts[1]);
        await contract.lockSaleParameters();

        const buyAmount = web3.utils.toWei("100");
        const publicSaleCap = web3.utils.toBN(await contract.getPublicSalePbirbCap());
        await contract.setWhitelistSaleActive(true);
        await contract.buyTokens(accounts[1], { from: accounts[1], value: buyAmount });
        await contract.setPublicSaleActive(true);
        await contract.setPublicSaleActive(false);
        await contract.setPublicSaleActive(true);

        const whitelistSalePbirbSold = web3.utils.toBN(await contract.getWhitelistSalePbirbSold());
        const whitelistSaleCap = web3.utils.toBN(await contract.getWhitelistSalePbirbCap());
        const newPublicSaleCap = publicSaleCap.add(whitelistSaleCap.sub(whitelistSalePbirbSold));

        assert.isTrue(web3.utils.toBN(await contract.getPublicSalePbirbCap()).eq(newPublicSaleCap));
      });
    });

    context("#maxPbirbPerAddress", async () => {
      it("Gets maxPbirbPerAddress", async () => {
        assert.equal(await contract.getMaxPbirbPerAddress(), web3.utils.toWei("1250000000"));
      });

      it("Sets maxPbirbPerAddress", async () => {
        await contract.setMaxPbirbPerAddress(web3.utils.toWei("200"));
        assert.equal(await contract.getMaxPbirbPerAddress(), web3.utils.toWei("200"));
      });

      it("Cannot be set once sale parameters are locked", async () => {
        await contract.lockSaleParameters();
        await truffleAssert.fails(
          contract.setMaxPbirbPerAddress(web3.utils.toWei("200")),
          "Sale parameters are locked"
        );
      });
    });

    context("#whitelistSaleRate", async () => {
      it("Gets whitelistSaleRate", async () => {
        assert.equal(await contract.getWhitelistSaleRate(), 5000000);
      });

      it("Sets whitelistSaleRate", async () => {
        await contract.setWhitelistSaleRate(200);
        assert.equal(await contract.getWhitelistSaleRate(), 200);
      });

      it("Cannot be set once sale parameters are locked", async () => {
        await contract.lockSaleParameters();
        await truffleAssert.fails(
          contract.setWhitelistSaleRate(200),
          "Sale parameters are locked"
        );
      });
    });

    context("#publicSaleRate", async () => {
      it("Gets publicSaleRate", async () => {
        assert.equal((await contract.getPublicSaleRate()).toString(), "4545455");
      });

      it("Sets publicSaleRate", async () => {
        await contract.setPublicSaleRate(100);
        assert.equal(await contract.getPublicSaleRate(), 100);
      });

      it("Cannot be set once sale parameters are locked", async () => {
        await contract.lockSaleParameters();
        await truffleAssert.fails(
          contract.setPublicSaleRate(100),
          "Sale parameters are locked"
        );
      });
    });

    context("#whitelistSalePbirbCap", async () => {
      it("Gets whitelistSalePbirbCap", async () => {
        assert.equal(await contract.getWhitelistSalePbirbCap(), web3.utils.toWei("187500000000"));
      });

      it("Sets whitelistSalePbirbCap", async () => {
        await contract.setWhitelistSalePbirbCap(200);
        assert.equal(await contract.getWhitelistSalePbirbCap(), 200);
      });

      it("Cannot be set once sale parameters are locked", async () => {
        await contract.lockSaleParameters();
        await truffleAssert.fails(
          contract.setWhitelistSalePbirbCap(200),
          "Sale parameters are locked"
        );
      });
    });

    context("#publicSalePbirbCap", async () => {
      it("Gets publicSalePbirbCap", async () => {
        assert.equal(await contract.getPublicSalePbirbCap(), web3.utils.toWei("287500000000"));
      });

      it("Sets publicSalePbirbCap", async () => {
        await contract.setPublicSalePbirbCap(100);
        assert.equal(await contract.getPublicSalePbirbCap(), 100);
      });

      it("Cannot be set once sale parameters are locked", async () => {
        await contract.lockSaleParameters();
        await truffleAssert.fails(
          contract.setPublicSalePbirbCap(100),
          "Sale parameters are locked"
        );
      });
    });
  });
});
