import Link from "ethereum-org-website/src/components/Link"
import React, { useState, useEffect} from "react"
import { Layout, SEO, InteractionCard, EthEducationButton} from "../../components/"
import { ADDRESS, TESTNET_NAME, FAUCET_LINK, GAS_PRICE } from "../../config"
import Modal from "ethereum-org-website/src/components/Modal"
import { H2 } from "ethereum-org-website/src/components/SharedStyledComponents"
import { useWeb3, useAccount} from "../../hooks"
import { capitalize } from "lodash"

const ETH_MANTISSA = 1e18;

const CUSDC_ABI = require('../../ABIs/cUSDC_ABI.json');
const CUSDC_DECIMALS = 1e8;
const USDC_ABI = require('../../ABIs/ERC20_ABI.json');
const USDC_DECIMALS = 1e6;
const VIEW_CONTRACT_ABI = require('../../ABIs/Compound101_ABI.json');

const BLOCKS_PER_YEAR = 4 * 60 * 24 * 365; // based on 4 blocks occurring every minute

class Poller {
  constructor(pollOnce) {
    this.pollOnce = pollOnce
    this.pollIndefinitely = () => {
      this.pollOnce();
      this.timer = setTimeout(this.pollIndefinitely, 10000)
    }
  }
  startPolling() {
    this.pollOnce();
    this.timer = setTimeout(this.pollIndefinitely, 10000)
  }
  stopPolling() {
    clearTimeout(this.timer);
  }
}

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
  const [shouldShowUSDCFaucet, setShouldShowUSDCFaucet] = useState(false);
  const [isApproveComplete, setIsApproveComplete] = useState(false);
  const [isDepositComplete, setIsDepositComplete] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

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
    const USDCContract = new web3.eth.Contract(USDC_ABI, ADDRESS.USDC);
    const VIEWCONTRACT = new web3.eth.Contract(VIEW_CONTRACT_ABI, ADDRESS.COMPOUNDVIEW);

    USDCContract.methods.balanceOf(account.address).call().then(parseFloat).then(a => a / USDC_DECIMALS).then(a => a < 10.0).then(setShouldShowUSDCFaucet);

    const poller = new Poller(() => {
      VIEWCONTRACT.methods.getViewModel(account.address).call().then(result => {
        const growthPerBlock = 1.0 + parseFloat(result.supplyRatePerBlock) / ETH_MANTISSA;
        const usdcApy = 100 * (Math.pow(growthPerBlock, BLOCKS_PER_YEAR) - 1);
        setCurrentUSDCApy(usdcApy);

        const ethBal = parseFloat(result.ethBalance) / ETH_MANTISSA;
        setCurrentWalletETHBalance(ethBal);

        const cTokenBalance = parseFloat(result.cTokenBalance) / CUSDC_DECIMALS;
        setDepositAmount(cTokenBalance);

        const exchangeRate = parseFloat(result.tokenPerCtokenRate) / (ETH_MANTISSA * USDC_DECIMALS * Math.pow(CUSDC_DECIMALS, -1));
        setUsdcPerCusdcRate(exchangeRate);

        const usdcBalance = parseFloat(result.tokenBalance) / USDC_DECIMALS;
        setCurrentWalletUSDCBalance(usdcBalance);
        setIsDepositComplete(usdcBalance < 0.01 && exchangeRate * cTokenBalance > 1.0);

        const allowance = parseFloat(result.currentAllowance) / USDC_DECIMALS;
        setCurrentAllowance(allowance);
        setIsApproveComplete(allowance > 1e8 && allowance > usdcBalance);
      });
    });
    poller.startPolling();
    return poller.stopPolling;
  }, [web3loading, web3, accountLoading, account]);

  let usdcFaucet = <></>
  if (shouldShowUSDCFaucet) {
    if (TESTNET_NAME === "mainnet") {
      usdcFaucet = <p>You need to aquire some USDC. You can ask a friend or use Uniswap. You can also switch to testnet where we can give you free USDC.</p>
    } else {
      usdcFaucet = <><p>You need to request some USDC from our testnet faucet.</p><div style={{textAlign: "center", marginBottom: 20}}><EthEducationButton onClick={()=>{if (currentWalletETHBalance === 0.0) {setIsAccountModalOpen(true)} else {printUsdc(account, web3, txPending)}}} disabled={isTransactionPending}>Request Testnet USDC</EthEducationButton></div></>
    }
  }
  return (
    <Layout>
      <SEO title="Compound 101" description="Earn yield on your dollars with Compound in 5 minutes. Practice on a testnet!" />
      <div style={headerStyle} >
        <h1>Compound 101</h1>
        <p>Last updated January 20, 2021</p>
      </div>
      <p>Compound is a financial protocol that lets you deposit tokens like USDC, ETH, or DAI and earn a yield on them similar to a bank. However, the yield rates on compound are often larger than what your savings account would give you.</p>
      <p>Let’s get started.</p>
      {usdcFaucet}
      <p>You need to allow Compound access to your USDC.</p>
      <div style={{textAlign: "center", marginBottom: 20}}><EthEducationButton onClick={()=>{if (currentWalletETHBalance === 0.0) {setIsAccountModalOpen(true)} else {approveButtonHandler(account, web3, txPending)}}} disabled={isTransactionPending || isApproveComplete}>{isApproveComplete ? "Approved" : "Approve"}</EthEducationButton></div>
      <p>Great, now we can deposit some of our USDC to earn yield. Please note, this action will lock your USDC. This means you can't send it to others until you withdraw it from Compound.</p>
      <InteractionCard title="Compound Deposit" sideTextTitle="Your Wallet" sideTextBody={<span>USDC Balance: {currentWalletUSDCBalance.toFixed(2)}<br/>ETH Balance: {currentWalletETHBalance.toFixed(2)}</span>} circleText={<span>APY {currentUSDCApy.toFixed(2)}%</span>} button={<EthEducationButton onClick={()=>{if (currentWalletETHBalance === 0.0) {setIsAccountModalOpen(true)} else {depositButtonHandler(account, web3, Math.floor(currentWalletUSDCBalance), txPending)}}} disabled={currentAllowance < currentWalletUSDCBalance - .1 || isTransactionPending || isDepositComplete}>{isDepositComplete ? "Deposited" : "Deposit All USDC"}</EthEducationButton>} />
      <p>Awesome, now you’re earning yield. The yield you earn is measured as a percent of the amount you have deposited. For example, if yield is 10% annual percentage rate (APY) and you deposited $1000 then at the end of the year you’ll have earned $100 in interest.</p>
      <p>This yield accrues every 13 seconds with a new Ethereum block. This means you can watch your earnings grow in real time and withdraw them whenever you’d like.</p>
      <p>In the {earnings.block - depositBlock} blocks since you deposited, your balance has grown {earnings.usdcEarned} USDC, from {depositAmount * usdcPerCusdcRate} USDC to {depositAmount+earnings.usdcEarned} USDC. Most of your interest was paid in USDC, but you’ve also earned some {earnings.compEarned} COMP, the governance token. You can learn more about COMP token in <Link to="/c">this quest (coming soon)</Link> or exchange it for USDC by following the <Link to="/c">Uniswap quest (coming soon)</Link>.</p>
      <InteractionCard title="Compound Deposit" sideTextTitle="Time Since Deposit" sideTextBody={<span>{earnings.block - depositBlock} blocks</span>} circleText={<span>BALANCE <span style={{fontSize: 16}}>${/*(depositAmount+earnings.usdcEarned)*/(depositAmount * usdcPerCusdcRate).toString()}</span></span>} button={<EthEducationButton disabled={isTransactionPending}>Withdraw All USDC</EthEducationButton>} />
      <p>To understand where this yield is coming from it helps to go back to that analogy of the bank. When you deposit money in your bank, they lend it out to others who pay the bank interest. This may be in the form of a mortgage or a credit card loan. The banks split their profit with you. In this scenario, they have a lot of control.</p>
      <p>The analogy works well with the Compound Protocol as a replacement for the bank. Just like your bank, Compound is lending out the money. Your money, along with the money others deposit, goes into a large pool. Borrowers can borrow money from this pool provided they have proof they'll pay back their debt. Instead of the bank setting interest rates for borrowers and depositors, the interest rate is set by supply and demand.</p>
      <Link href="https://medium.com/compound-finance/faq-1a2636713b69">Dive deep into how Compound works</Link>
      <Modal isOpen={isAccountModalOpen} setIsOpen={setIsAccountModalOpen}>
        <H2 style={{ marginTop: 0 }}>Get Some ETH</H2>
        <p>
          We've created an account for you on the{" "}
          <b>{capitalize(TESTNET_NAME)}</b> network.
        </p>
        {TESTNET_NAME !== "mainnet" && (
          <p>
            The {capitalize(TESTNET_NAME)} network is an Ethereum{" "}
            <b>testnet</b>, meaning your ETH has no real value. The network is
            just used for testing.
          </p>
        )}
        <p>
          Your address is <b>{account?.address}</b>.
        </p>
        <p>
          Since your balance is low, you first need to get some ETH {TESTNET_NAME !== "mainnet" ? <>at the Faucet <Link to={FAUCET_LINK}>here</Link>.</> : ". You (or a friend) can send ETH to the address above."}
        </p>
      </Modal>
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
    data: CUSDCContract.methods.mint(amount * USDC_DECIMALS).encodeABI(),
    gasPrice: GAS_PRICE,
    gas: 300000
  };
  signAndSendTx(account, web3, tx, txPending)
}

const approveButtonHandler = (account, web3, txPending) => {
  const USDCContract = new web3.eth.Contract(USDC_ABI, ADDRESS.USDC);
  const tx = {
    from: account.address,
    to: ADDRESS.USDC,
    data: USDCContract.methods.approve(ADDRESS.CUSDC, 1e9 * USDC_DECIMALS).encodeABI(),
    gasPrice: GAS_PRICE,
    gas: 300000
  };
  USDCContract.methods.approve(ADDRESS.CUSDC, 1e6 * USDC_DECIMALS).call().then(console.log);
  signAndSendTx(account, web3, tx, txPending)
}

const printUsdc = (account, web3, txPending) => {
  const USDCContract = new web3.eth.Contract(USDC_ABI, ADDRESS.USDC);
  const tx = {
    from: account.address,
    to: ADDRESS.USDC,
    data: USDCContract.methods.allocateTo(account.address, 1e3 * USDC_DECIMALS).encodeABI(),
    gasPrice: GAS_PRICE,
    gas: 300000
  };
  signAndSendTx(account, web3, tx, txPending)
}

export default Compound101
