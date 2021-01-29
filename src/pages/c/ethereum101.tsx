import ButtonLink from "ethereum-org-website/src/components/ButtonLink"
import Link from "ethereum-org-website/src/components/Link"
import {
  H1,
  H2,
  ButtonPrimary,
  ButtonSecondary,
} from "ethereum-org-website/src/components/SharedStyledComponents"
import { PageProps } from "gatsby"
import { capitalize } from "lodash"
import React, { useEffect, useState } from "react"
import { Input, Layout, SEO } from "../../components"
import {
  ETHEREUM101_CONTRACT_ADDRESS,
  ETHERSCAN_ENDPOINT,
  FAUCET_LINK,
  TESTNET_NAME,
} from "../../config"
import { useAccount, useContract, useWeb3 } from "../../hooks"

const {
  abi: ETHEREUM101_ABI,
} = require("../../../build/contracts/Ethereum101.json")

const Ethereum101Page: React.FC<PageProps> = () => {
  const [loading, setLoading] = useState(false)
  const { web3, loading: web3Loading } = useWeb3()
  const {
    account,
    balance,
    refetchBalance,
    signTransaction,
    loading: accountLoading,
  } = useAccount()
  const { contract, loading: contractLoading } = useContract(
    ETHEREUM101_ABI,
    ETHEREUM101_CONTRACT_ADDRESS
  )
  const [contractBalance, setContractBalance] = useState(0)

  const [message, setMessage] = useState("")
  const [contractMessage, setContractMessage] = useState(0)
  const [saveMessageTransactionHash, setSaveMessageTransactionHash] = useState(
    ""
  )
  const [quizAnswers, setQuizAnswers] = useState(["", ""])

  async function getContractBalance() {
    if (!account) {
      return
    }

    let balance
    try {
      balance = await contract?.methods.balanceOf(account.address).call()
    } catch (err) {
      console.error("Error in `getContractBalance`:")
      console.error(err)
      balance = 0
    }
    setContractBalance(balance)
  }

  async function getContractMessage() {
    if (!account) {
      return
    }

    let message
    try {
      message = await contract?.methods.messageOf(account.address).call()
    } catch (err) {
      console.error("Error in `getContractMessage`:")
      console.error(err)
      message = ""
    }
    setContractMessage(message)
  }

  useEffect(() => {
    getContractBalance()
    getContractMessage()
  }, [account])

  async function step1_deposit() {
    if (!contract || !account || !web3) {
      return
    }

    setLoading(true)

    const transaction = {
      from: account.address,
      to: ETHEREUM101_CONTRACT_ADDRESS,
      value: web3.utils.toWei("1", "ether"),
      gas: 150000,
      gasPrice: web3.utils.toWei("25", "gwei"),
      data: contract?.methods.step1_deposit().encodeABI(),
    }

    const signedTransaction = await signTransaction(transaction)

    web3.eth
      .sendSignedTransaction(signedTransaction?.rawTransaction ?? "")
      .on("error", error => {
        console.error(error)
        alert("Error: see console")
        setLoading(false)
      })
      .on("confirmation", (confirmationNumber: number) => {
        if (confirmationNumber === 1) {
          refetchBalance()
          setLoading(false)
          getContractBalance()
        }
      })
  }

  async function step2_withdraw() {
    if (!contract || !account || !web3) {
      return
    }

    setLoading(true)

    const transaction = {
      from: account.address,
      to: ETHEREUM101_CONTRACT_ADDRESS,
      value: 0,
      gas: 150000,
      gasPrice: web3.utils.toWei("50", "gwei"),
      data: contract?.methods.step2_withdraw().encodeABI(),
    }

    const signedTransaction = await signTransaction(transaction)

    web3.eth
      .sendSignedTransaction(signedTransaction?.rawTransaction ?? "")
      .on("error", error => {
        console.error(error)
        alert("Error: see console")
        setLoading(false)
      })
      .on("confirmation", (confirmationNumber: number) => {
        if (confirmationNumber === 1) {
          refetchBalance()
          getContractBalance()
          setLoading(false)
        }
      })
  }

  async function step3_saveMessage() {
    if (!contract || !account || !web3) {
      return
    }

    setLoading(true)

    const transaction = {
      from: account.address,
      to: ETHEREUM101_CONTRACT_ADDRESS,
      value: 0,
      gas: 150000,
      gasPrice: web3.utils.toWei("50", "gwei"),
      data: contract?.methods.step3_saveMessage(message).encodeABI(),
    }

    const signedTransaction = await signTransaction(transaction)

    web3.eth
      .sendSignedTransaction(signedTransaction?.rawTransaction ?? "")
      .on("error", error => {
        console.error(error)
        alert("Error: see console")
        setLoading(false)
      })
      .on("confirmation", (confirmationNumber, { transactionHash }) => {
        if (confirmationNumber === 1) {
          setSaveMessageTransactionHash(transactionHash)
          refetchBalance()
          getContractMessage()
          setLoading(false)
        }
      })
  }

  async function submitQuizAnswers() {
    if (!contract || !account || !web3) {
      return
    }

    const allCorrect = await contract.methods
      .submitQuizAnswers(quizAnswers)
      .call()
    alert(allCorrect ? "Correct!" : "Try again, at least one answer was wrong.")
  }

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
        You have <b>{web3?.utils.fromWei(balance)} ETH</b> on the{" "}
        <b>{capitalize(TESTNET_NAME)}</b> testnet. Now, try sending us some ETH
        (technically, you're sending ETH to a{" "}
        <Link
          to={`${ETHERSCAN_ENDPOINT}/address/${ETHEREUM101_CONTRACT_ADDRESS}#code`}
        >
          smart contract
        </Link>{" "}
        we've deployed).
      </p>
      <p>
        <ButtonPrimary onClick={step1_deposit} disabled={loading}>
          {loading ? "Waiting..." : "Send 1 ETH to Us"}
        </ButtonPrimary>
        <ButtonSecondary
          onClick={refetchBalance}
          disabled={loading}
          style={{ marginLeft: "1rem" }}
        >
          Refresh Balance
        </ButtonSecondary>
      </p>
      <p>
        Be patient, block times are usually around fifteen seconds and may be
        longer.
      </p>
      <p>
        So far, you've sent us{" "}
        <b>{web3?.utils.fromWei(contractBalance.toString())} ETH</b>.
      </p>
      <p>
        Note that you spent more than 1 ETH since you had to spend some ETH on
        gas — think of it like a transaction fee.
      </p>
      <p>Now, get your ETH back.</p>
      <p>
        <ButtonPrimary onClick={step2_withdraw} disabled={loading}>
          {loading ? "Waiting..." : "Get ETH Back"}
        </ButtonPrimary>
      </p>
      <p>
        Note that you got less than 1 ETH since the smart contract needed to
        spend some ETH on gas to get your balance back to you.
      </p>
      <p>
        Now, send some data with your transaction. Enter some text below for it
        to be saved on the blockchain forever. Note that each character you
        store will cost extra ETH.
      </p>
      <Input
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Enter Data to Store on Blockchain"
      />
      <p>
        <ButtonPrimary onClick={step3_saveMessage} disabled={loading}>
          {loading ? "Waiting..." : "Send Data to Contract"}
        </ButtonPrimary>
      </p>
      <p>
        You saved "<b>{contractMessage}</b>" on the blockchain.
      </p>
      {saveMessageTransactionHash && (
        <ButtonLink
          to={`${ETHERSCAN_ENDPOINT}/tx/${saveMessageTransactionHash}`}
        >
          View Transaction
        </ButtonLink>
      )}
      <H2>Quick Quiz</H2>
      <p>
        This quiz is all on the blockchain. If you answer all the questions
        correctly, you'll get a special NFT.
      </p>
      <p>1. What kind of network is {capitalize(TESTNET_NAME)}?</p>
      <p>
        <ButtonSecondary
          onClick={() => {
            quizAnswers[0] = "A"
            setQuizAnswers([...quizAnswers])
          }}
        >
          A. Testnet {quizAnswers[0] === "A" && "(selected)"}
        </ButtonSecondary>
      </p>
      <p>
        <ButtonSecondary
          onClick={() => {
            quizAnswers[0] = "B"
            setQuizAnswers([...quizAnswers])
          }}
        >
          B. Mainnet {quizAnswers[0] === "B" && "(selected)"}
        </ButtonSecondary>
      </p>
      <p>2. Why didn't you get the full amount of ETH you sent to us?</p>
      <p>
        <ButtonSecondary
          onClick={() => {
            quizAnswers[1] = "A"
            setQuizAnswers([...quizAnswers])
          }}
        >
          A. Diesel {quizAnswers[1] === "A" && "(selected)"}
        </ButtonSecondary>
      </p>
      <p>
        <ButtonSecondary
          onClick={() => {
            quizAnswers[1] = "B"
            setQuizAnswers([...quizAnswers])
          }}
        >
          B. Gas {quizAnswers[1] === "B" && "(selected)"}
        </ButtonSecondary>
      </p>
      <ButtonPrimary
        disabled={quizAnswers.some(it => it === "")}
        onClick={submitQuizAnswers}
      >
        Submit
      </ButtonPrimary>
    </Layout>
  )
}

export default Ethereum101Page
