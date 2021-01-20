import React, { useState } from "react"
import { Link } from "gatsby"
import { Layout, SEO, InteractionCard} from "../components/"
import ButtonLink from "ethereum-org-website/src/components/ButtonLink"

const Compound101 = () => {
  // I realize there's a bug here if a user deposits more than once. Let's not worry about that yet :)
  const [currentWalletUSDCBalance, setCurrentWalletUSDCBalance] = useState(0.0);
  const [currentWalletETHBalance, setCurrentWalletETHBalance] = useState(0.0);
  const [currentUSDCApy, setCurrentUSDCApy] = useState(0.0);
  const [deposit, setDeposit] = useState({block: 0, amount: 0});
  const [earnings, setEarnings] = useState({block: 0, usdcEarned: 0, compEarned: 0});
  const depositButton = <ButtonLink to="#">Deposit All USDC</ButtonLink>
  return (
    <Layout>
      <SEO title="Compound 101" />
      <div style={headerStyle} >
        <h1>Compound 101</h1>
        <p>Last updated January 20, 2021</p>
      </div>
      <p>This section is all about why anyone would want to deposit assets into Compound. We can talk about higher APYs than savings accounts and other cool benefits like the ability to take a loan.</p>
      <p>First, approve the contract so it can take money out of your account.</p>
      <div style={{textAlign: "center", marginBottom: 20}}><ButtonLink to="#">Approve</ButtonLink></div>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor posuere ac ut consequat semper viverra nam. Arcu bibendum at varius vel pharetra vel turpis nunc. Quis viverra nibh cras pulvinar mattis. Tempus egestas sed sed risus pretium. Eros in cursus turpis massa tincidunt dui ut ornare. Cras sed felis eget velit. Consectetur libero id faucibus nisl tincidunt eget nullam non. Tellus id interdum velit laoreet. Morbi blandit cursus risus at ultrices.</p>
      <InteractionCard title="Compound Deposit" sideTextTitle="Your Wallet" sideTextBody={<span>USDC Balance: {currentWalletUSDCBalance.toFixed(2)}<br/>ETH Balance: {currentWalletETHBalance.toFixed(2)}</span>} circleText={<span>APY {currentUSDCApy.toFixed(2)}%</span>} button={depositButton} />
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor posuere ac ut consequat semper viverra nam. Arcu bibendum at varius vel pharetra vel turpis nunc. Quis viverra nibh cras pulvinar mattis. Tempus egestas sed sed risus pretium. Eros in cursus turpis massa tincidunt dui ut ornare. Cras sed felis eget velit. Consectetur libero id faucibus nisl tincidunt eget nullam non. Tellus id interdum velit laoreet. Morbi blandit cursus risus at ultrices.</p>
      <p>You earn interest every block. In the {earnings.block - deposit.block} blocks since you deposited, your balance has grown {earnings.usdcEarned} USDC, from {deposit.amount} USDC to {deposit.amount+earnings.usdcEarned} USDC. You’ve also earned {earnings.compEarned} COMP, the governance token. You can do xyz with the token, or exchange it for USDC on Uniswap.</p>
      <InteractionCard title="Compound Deposit" sideTextTitle="Time Since Deposit" sideTextBody={<span>{earnings.block - deposit.block} blocks</span>} circleText={<span>BALANCE ${deposit.amount+earnings.usdcEarned}</span>} />
      <p>This section is all about the technical mechanics of how compound works under the hood. We’ll talk about the asset pools and collaterlaization ratios.</p>

    </Layout>
  )
}

const headerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center"
}

export default Compound101
