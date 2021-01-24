import { Link } from "gatsby"
import React, { useState, useEffect} from "react"
import { Layout, SEO, InteractionCard, EthEducationButton} from "../../components/"
import { ADDRESS } from "../../config"
import { useWeb3, useAccount} from "../../hooks"

const ETH_MANTISSA = 1e18;

const CUSDC_ABI = require('../../ABIs/cUSDC_ABI.json');
const CUSDC_DECIMALS = 1e8;
const USDC_ABI = require('../../ABIs/ERC20_ABI.json');
const USDC_DECIMALS = 1e6;

const BLOCKS_PER_YEAR = 4 * 60 * 24 * 365; // based on 4 blocks occurring every minute

const Compound101 = () => {
  // I realize there's a bug here if a user deposits more than once. Let's not worry about that yet :)
  const [currentWalletUSDCBalance, setCurrentWalletUSDCBalance] = useState(0.0);
  const [currentWalletETHBalance, setCurrentWalletETHBalance] = useState(0.0);
  const [currentAllowance, setCurrentAllowance] = useState(0.0);
  const [currentUSDCApy, setCurrentUSDCApy] = useState(0.0);
  const [depositBlock, setDepositBlock] = useState(0.0);
  const [depositAmount, setDepositAmount] = useState(0.0);
  const [usdcPerCusdcRate, setUsdcPerCusdcRate] = useState(0.0);
  const [earnings, setEarnings] = useState({block: 0, usdcEarned: 0, compEarned: 0});
  const [isTransactionPending, setIsTransactionPending] = useState(false);

  const { web3, loading: web3loading, transactionPendingObserver } = useWeb3();
  const txPending = (is) => {
    setIsTransactionPending(is);
    transactionPendingObserver.publish(is);
  }

  const { account, loading: accountLoading } = useAccount();

  useEffect(() => {
    if (web3loading || !web3 || accountLoading || !account) {
      return
    }
    const cUSDCContract = new web3.eth.Contract(CUSDC_ABI, ADDRESS.CUSDC);
    const USDCContract = new web3.eth.Contract(USDC_ABI, ADDRESS.USDC);
    const CUSDCContract = new web3.eth.Contract(CUSDC_ABI, ADDRESS.CUSDC);

    const pollIndefinitely = () => {
      cUSDCContract.methods.supplyRatePerBlock().call().then((ratePerBlock) => {
        const growthPerBlock = 1.0 + parseFloat(ratePerBlock) / ETH_MANTISSA;
        const usdcApy = 100 * (Math.pow(growthPerBlock, BLOCKS_PER_YEAR) - 1);
        setCurrentUSDCApy(usdcApy);
      });
      web3.eth.getBalance(account.address).then(parseFloat).then(a => a / ETH_MANTISSA).then(setCurrentWalletETHBalance);
      USDCContract.methods.balanceOf(account.address).call().then(parseFloat).then(a => a / USDC_DECIMALS).then(setCurrentWalletUSDCBalance);
      USDCContract.methods.allowance(account.address, ADDRESS.CUSDC).call().then(parseFloat).then(a => a / USDC_DECIMALS).then(setCurrentAllowance);
      CUSDCContract.methods.balanceOf(account.address).call().then(parseFloat).then(a => a / CUSDC_DECIMALS).then(setDepositAmount);
      CUSDCContract.methods.exchangeRateCurrent().call().then(parseFloat).then(a => a / (ETH_MANTISSA * USDC_DECIMALS * Math.pow(CUSDC_DECIMALS, -1))).then(setUsdcPerCusdcRate);
      setTimeout(pollIndefinitely, 10000)
    }
    pollIndefinitely(); // Start polling
  }, [web3loading, web3, accountLoading, account]);

  return (
    <Layout>
      <SEO title="Compound 101" />
      <div style={headerStyle} >
        <h1>Compound 101</h1>
        <p>Last updated January 20, 2021</p>
      </div>
      <p>Compound is a financial protocol that lets you deposit tokens like USDC, ETH, or DAI and earn a yield on them similar to a bank. However, the yield rates on compound are often larger than what your savings account would give you.</p>
      <p>Let’s get started. First you need to allow Compound to access to your USDC.</p>
      <div style={{textAlign: "center", marginBottom: 20}}><EthEducationButton onClick={()=>{approveButtonHandler(account, web3, txPending)}} disabled={isTransactionPending}>Approve</EthEducationButton></div>
      <p>Great, now we can deposit some of our USDC to earn yield. Please note, this action will lock your USDC. This means you can't send it to others until you withdraw it from Compound.</p>
      <InteractionCard title="Compound Deposit" sideTextTitle="Your Wallet" sideTextBody={<span>USDC Balance: {currentWalletUSDCBalance.toFixed(2)}<br/>ETH Balance: {currentWalletETHBalance.toFixed(2)}</span>} circleText={<span>APY {currentUSDCApy.toFixed(2)}%</span>} button={<EthEducationButton onClick={()=>{depositButtonHandler(account, web3, Math.floor(currentWalletUSDCBalance), txPending)}} disabled={currentAllowance < currentWalletUSDCBalance - .1 || isTransactionPending}>Deposit All USDC</EthEducationButton>} />
      <p>Awesome, now you’re earning yield. The yield you earn is measured as a percent of the amount you have deposited. For example, if yield is 10% annual percentage rate (APY) and you deposited $1000 then at the end of the year you’ll have earned $100 in interest.</p>
      <p>This yield accrues every 13 seconds with a new Ethereum block. This means you can watch your earnings grow in real time and withdraw them whenever you’d like.</p>
      <p>In the {earnings.block - depositBlock} blocks since you deposited, your balance has grown {earnings.usdcEarned} USDC, from {depositAmount * usdcPerCusdcRate} USDC to {depositAmount+earnings.usdcEarned} USDC. You’ve also earned {earnings.compEarned} COMP, the governance token. You can do xyz with the token, or exchange it for USDC on Uniswap.</p>
      <InteractionCard title="Compound Deposit" sideTextTitle="Time Since Deposit" sideTextBody={<span>{earnings.block - depositBlock} blocks</span>} circleText={<span>BALANCE <span style={{fontSize: 16}}>${/*(depositAmount+earnings.usdcEarned)*/(depositAmount * usdcPerCusdcRate).toString()}</span></span>} button={<EthEducationButton disabled={isTransactionPending}>Withdraw All USDC</EthEducationButton>} />
      <p>To understand where this yield is coming from it helps to go back to that analogy of the bank. When you deposit money in your bank, they lend it out to others who pay the bank interest. This may be in the form of a mortgage or a credit card loan. The banks take some of the interest which they earn and give you some amount of it back.</p>
      <p>The analogy goes a step further because compound just like your bank is lending out the money. Your money, along with the money others deposit, goes into a large pool. Borrowers can borrow money from this pool. The interest is set by supply and demand.</p>
      <Link to="https://medium.com/compound-finance/faq-1a2636713b69">Dive deep into how Compound works</Link>
    </Layout>
  )
}

const headerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap"
}

const signAndSendTx = async (account, web3, tx, txPending) => {
  tx = await account.signTransaction(tx)
  tx = tx.rawTransaction;
  txPending(true);
  const txReceipt = await web3.eth.sendSignedTransaction(tx, (error, result) => {
    if (error) {
      console.error("Transaction sending failed");
      console.error(error);
      txPending(false);
    } else {
      console.log("Transaction sending succeeded");
    }
  });
  txPending(false);
}

const depositButtonHandler = (account, web3, amount, txPending) => {
  const CUSDCContract = new web3.eth.Contract(CUSDC_ABI, ADDRESS.CUSDC);
  CUSDCContract.methods.mint(1 * USDC_DECIMALS).call().then(console.log);
  const tx = {
    from: account.address,
    to: ADDRESS.CUSDC,
    data: CUSDCContract.methods.mint(1 * USDC_DECIMALS).encodeABI(), //amount * USDC_DECIMALS
    gasPrice: 1,
    gas: 300000
  };
  signAndSendTx(account, web3, tx, txPending)
}

const approveButtonHandler = (account, web3, txPending) => {
  const USDCContract = new web3.eth.Contract(USDC_ABI, ADDRESS.USDC);
  const tx = {
    from: account.address,
    to: ADDRESS.USDC,
    data: USDCContract.methods.approve(ADDRESS.CUSDC, 1e3 * USDC_DECIMALS).encodeABI(),
    gasPrice: 1,
    gas: 300000
  };
  USDCContract.methods.approve(ADDRESS.CUSDC, 1e6 * USDC_DECIMALS).call().then(console.log);
  signAndSendTx(account, web3, tx, txPending)
}

export default Compound101
