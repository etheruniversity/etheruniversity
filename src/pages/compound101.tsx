import React, { useState } from "react"
import { Link } from "gatsby"
import { Layout, SEO } from "../components/"
import Card from "ethereum-org-website/src/components/Card"
import ButtonLink from "ethereum-org-website/src/components/ButtonLink"

const Compound101 = () => {
  // I realize there's a bug here if a user deposits more than once. Let's not worry about that yet :)
  const [currentWalletUSDCBalance, setCurrentWalletUSDCBalance] = useState(0.0);
  const [currentUSDCApy, setCurrentUSDCApy] = useState(0.0);
  const [deposit, setDeposit] = useState({block: 0, amount: 0});
  const [earnings, setEarnings] = useState({block: 0, usdcEarned: 0, compEarned: 0});

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
      <div style={cardContainerStyle}>
        <Card title="Compound Deposit" emoji=":bank:">
          <div style={dataStyle}>
            <div style={{textAlign: "left"}}>
            <p>
            <span style={{fontWeight: "bold"}}>Your Wallet</span><br/>
            USDC Balance: {currentWalletUSDCBalance}<br/>
            ETH Balance: 20
            </p>
            </div>
            <div style={circleStyle}>
              APY {currentUSDCApy}%
            </div>
          </div>
          <ButtonLink to="#">Deposit All USDC</ButtonLink>
        </Card>
      </div>
      <p>This section is all about the technical mechanics of how compound works under the hood. We’ll talk about the asset pools and collaterlaization ratios.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor posuere ac ut consequat semper viverra nam. Arcu bibendum at varius vel pharetra vel turpis nunc. Quis viverra nibh cras pulvinar mattis. Tempus egestas sed sed risus pretium. Eros in cursus turpis massa tincidunt dui ut ornare. Cras sed felis eget velit. Consectetur libero id faucibus nisl tincidunt eget nullam non. Tellus id interdum velit laoreet. Morbi blandit cursus risus at ultrices.</p>
      <p>TODO: Show deposit amount {deposit.amount} and time since deposit in {earnings.block - deposit.block} in nice UI</p>
      <p>You earn interest every block. In the {earnings.block - deposit.block} blocks since you deposited, your balance has grown {earnings.usdcEarned} USDC, from {deposit.amount} USDC to {deposit.amount+earnings.usdcEarned} USDC. You’ve also earned {earnings.compEarned} COMP, the governance token. You can do xyz with the token, or exchange it for USDC on Uniswap.</p>
    </Layout>
  )
}

const headerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center"
}

const dataStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  padding: 30
}

const circleStyle = {
  border: "7px solid black",
  borderRadius: "50%",
  width: 230,
  height: 230,
  fontSize: 32,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold"
}

const cardContainerStyle = {
  margin: 100,
  width: 700,
  margin: "0 auto",
  marginBottom: 30,
  textAlign: "center"
}

export default Compound101
