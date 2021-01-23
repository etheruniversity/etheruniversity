import ButtonLink from "ethereum-org-website/src/components/ButtonLink"
import {
  H1,
  H2,
  ButtonPrimary,
} from "ethereum-org-website/src/components/SharedStyledComponents"
import { PageProps } from "gatsby"
import { capitalize } from "lodash"
import React from "react"
import { Layout, SEO } from "../../components"
import { FAUCET_LINK, TESTNET_NAME } from "../../config"
import { useAccount, useWeb3 } from "../../hooks"

const Ethereum101Page: React.FC<PageProps> = () => {
  const { web3 } = useWeb3()
  const { account, balance } = useAccount()

  return (
    <Layout>
      <SEO title="Ethereum 101" />
      <H1>Ethereum 101</H1>
      <p>
        This quest is an introduction to the basics of Ethereum on the{" "}
        <b>{capitalize(TESTNET_NAME)}</b> network.
      </p>
      {TESTNET_NAME !== "mainnet" && (
        <p>
          The {capitalize(TESTNET_NAME)} network is an Ethereum <b>testnet</b>,
          meaning your ETH has no real value. The network is just used for
          testing.
        </p>
      )}
      <p>
        To start, make sure you have some {capitalize(TESTNET_NAME)} ETH. Click
        the button below to get some ETH sent to the address we've created for
        you, <b>{account?.address}</b>.
      </p>
      <p>
        <ButtonLink to={FAUCET_LINK}>
          Get {capitalize(TESTNET_NAME)} ETH
        </ButtonLink>
      </p>
      <p>
        You have <b>{web3?.utils.fromWei(balance)}</b> ETH on the{" "}
        <b>{capitalize(TESTNET_NAME)}</b> testnet. Now, try sending us some ETH.
      </p>
      <p>
        <ButtonPrimary>Send 0.1 ETH to Us</ButtonPrimary>
      </p>
      <p>You got less than 0.1 ETH since you had to spend some ETH on gas.</p>
      <p>Now, send some data with your transaction.</p>
      <p>Here is what your transaction looks like on the blockchain:</p>
      <H2>Quick Quiz</H2>
      <p>1. What kind of network is {capitalize(TESTNET_NAME)}?</p>
      <p>
        <ButtonPrimary>A. Testnet</ButtonPrimary>
      </p>
      <p>
        <ButtonPrimary>B. Mainnet</ButtonPrimary>
      </p>
      <p>2. Why didn't we get the full amount of ETH you sent to us?</p>
      <p>
        <ButtonPrimary>A. Gas</ButtonPrimary>
      </p>
      <p>
        <ButtonPrimary>B. Diesel</ButtonPrimary>
      </p>
    </Layout>
  )
}

export default Ethereum101Page
