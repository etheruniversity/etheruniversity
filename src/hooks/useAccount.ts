import { useEffect, useState } from "react"
import { Account, TransactionConfig } from "web3-core"
import { useWeb3 } from "./useWeb3"

/**
 * A hook that accesses the users current account, either importing it from
 * localStorage or creating a new one if it is nonexistent.
 */
function useAccount() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState<Account>()
  const [privateKey, setPrivateKey] = useState("")
  // `balance` should be a string because it is in wei and could be very large?
  // Regardless, web3 returns `balance` as a string rather than a number.
  const [balance, setBalance] = useState("0")

  const { web3, loading: web3Loading } = useWeb3()

  useEffect(() => {
    if (web3Loading || !web3) {
      return
    }

    const privateKey = window.localStorage.getItem("privateKey")

    if (!!privateKey) {
      const importedAccount = web3.eth.accounts.privateKeyToAccount(privateKey)
      setAccount(importedAccount)
      setPrivateKey(privateKey)
    } else {
      const newAccount = web3.eth.accounts.create()
      setAccount(newAccount)
      window.localStorage.setItem("privateKey", newAccount.privateKey)
      setPrivateKey(newAccount.privateKey)
    }

    setLoading(false)
  }, [web3Loading])

  function refetchBalance() {
    if (!web3 || !account) {
      return
    }
    web3.eth.getBalance(account.address).then(balance => {
      setBalance(balance)
    })
  }

  async function signTransaction(transaction: TransactionConfig) {
    if (!web3) {
      return
    }
    return web3.eth.accounts.signTransaction(transaction, privateKey)
  }

  useEffect(() => {
    refetchBalance()
  }, [account])

  return {
    loading,
    account,
    balance,
    refetchBalance,
    signTransaction,
  }
}

export { useAccount }
