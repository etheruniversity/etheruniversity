import React, { useState, useEffect} from "react"
import { Link } from "gatsby"
import { Layout, SEO, InteractionCard} from "../components/"
import ButtonLink from "ethereum-org-website/src/components/ButtonLink"
import { useWeb3, useAccount} from "../hooks"

// Source: https://github.com/compound-finance/compound-config
const CUSDC_MAINNET_ADDRESS = "0x39AA39c021dfbaE8faC545936693aC917d5E7563";
const CUSDC_ABI = require('../ABIs/cUSDC_ABI.json');
const CUSDC_DECIMALS = 1e18;
const BLOCKS_PER_YEAR = 4 * 60 * 24 * 365; // based on 4 blocks occurring every minute
const USDC_MAINNET_ADDRESS = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
const USDC_ABI = require('../ABIs/ERC20_ABI.json');
const USDC_DECIMALS = 1e6;

const Compound101 = () => {
  // I realize there's a bug here if a user deposits more than once. Let's not worry about that yet :)
  const [currentWalletUSDCBalance, setCurrentWalletUSDCBalance] = useState(0.0);
  const [currentWalletETHBalance, setCurrentWalletETHBalance] = useState(0.0);
  const [currentUSDCApy, setCurrentUSDCApy] = useState(0.0);
  const [averageTraditionalBankAPY, setAverageTraditionalBankAPY] = useState(0.0);
  const [deposit, setDeposit] = useState({block: 0, amount: 0});
  const [earnings, setEarnings] = useState({block: 0, usdcEarned: 0, compEarned: 0});
  const depositButton = <ButtonLink to="#">Deposit All USDC</ButtonLink>
  const withdrawButton = <ButtonLink to="#">Withdraw All USDC</ButtonLink>

  const { web3, loading: web3loading } = useWeb3();
  const { account, loading: accountLoading } = useAccount();

  useEffect(() => {
    if (web3loading || !web3) {
      return
    }
    const cUSDCContract = new web3.eth.Contract(CUSDC_ABI, CUSDC_MAINNET_ADDRESS);
    cUSDCContract.methods.supplyRatePerBlock().call().then((ratePerBlock) => {
      const growthPerBlock = 1.0 + parseFloat(ratePerBlock) / CUSDC_DECIMALS
      const usdcApy = 100 * (Math.pow(growthPerBlock, BLOCKS_PER_YEAR) - 1)
      setCurrentUSDCApy(usdcApy);
    });
    if (accountLoading || !account) {
      return
    }
    web3.eth.getBalance("0xD9C1f224b77484535c725C06CE5bD8C1A2B63344").then(parseFloat).then(a => a / 1e18).then(setCurrentWalletETHBalance);
    const USDCContract = new web3.eth.Contract(USDC_ABI, USDC_MAINNET_ADDRESS);
    USDCContract.methods.balanceOf("0xD9C1f224b77484535c725C06CE5bD8C1A2B63344").call().then(parseFloat).then(a => a / USDC_DECIMALS).then(setCurrentWalletUSDCBalance);
  });

  return (
    <Layout>
      <SEO title="Compound 101" />
      <div style={headerStyle} >
        <h1>Compound 101</h1>
        <p>Last updated January 20, 2021</p>
      </div>
      <p>The Compound protocol lets you deposit cryptoassets like ETH and USDC. You'll be rewarded for these deposits by earning inteest, similar to a savings account at your traditional bank. The Compound Protocol often gives higher interest rates than your bank. Sometimes, these interest rates get as high as 20% APY. Meanwhile, the average traditional bank savings account in the US currenlty only pays {averageTraditionalBankAPY.toFixed(2)}%. Compound also lets you take out loans, but we'll get to that in another quest.</p>
      <p>First, you'll need to give the Compound protocol the ability to withdraw your funds.</p>
      <div style={{textAlign: "center", marginBottom: 20}}><ButtonLink to="#">Approve</ButtonLink></div>
      <p>Awesome, now we can get to the real fun. Compound lets you earn interest on many types of cryptoassets. In this case, we'll deposit USDC. 1 USDC = $1 USD, so it's easier to compare to a traditional savings account. Once your USDC is deposited in Compound, you can't send it to others. The USDC is "locked" in Compound until you withdraw it.</p>
      <InteractionCard title="Compound Deposit" sideTextTitle="Your Wallet" sideTextBody={<span>USDC Balance: {currentWalletUSDCBalance.toFixed(2)}<br/>ETH Balance: {currentWalletETHBalance.toFixed(2)}</span>} circleText={<span>APY {currentUSDCApy.toFixed(2)}%</span>} button={depositButton} />
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor posuere ac ut consequat semper viverra nam. Arcu bibendum at varius vel pharetra vel turpis nunc. Quis viverra nibh cras pulvinar mattis. Tempus egestas sed sed risus pretium. Eros in cursus turpis massa tincidunt dui ut ornare. Cras sed felis eget velit. Consectetur libero id faucibus nisl tincidunt eget nullam non. Tellus id interdum velit laoreet. Morbi blandit cursus risus at ultrices.</p>
      <p>You earn interest every block. In the {earnings.block - deposit.block} blocks since you deposited, your balance has grown {earnings.usdcEarned} USDC, from {deposit.amount} USDC to {deposit.amount+earnings.usdcEarned} USDC. You’ve also earned {earnings.compEarned} COMP, the governance token. You can do xyz with the token, or exchange it for USDC on Uniswap.</p>
      <InteractionCard title="Compound Deposit" sideTextTitle="Time Since Deposit" sideTextBody={<span>{earnings.block - deposit.block} blocks</span>} circleText={<span>BALANCE ${deposit.amount+earnings.usdcEarned}</span>} button={withdrawButton} />
      <p>You might be wondering where your interest income is coming from. In a traditional bank savings account, the bank lends out your money to other people for them to buy homes. You're money is safe because if those people stop paying, the bank takes back their house and sells it. The Compound Protocol works in a similar fashion. But, it has stricter rules about when it lends out money and what happens if a borrower doesn't pay their loan. using youThis section is all about the technical TODO, talk about the asset pools and collaterlaization ratios.</p>
      <Link to="#">Dive deep into how Compound works</Link>
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

export default Compound101
