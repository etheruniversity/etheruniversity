import { useEffect, useState } from "react"
import { Account } from "web3-core"
import { useWeb3 } from "./useWeb3"

/**
 * A hook that accesses the users current account, either importing it from
 * localStorage or creating a new one if it is nonexistent.
 */
function useAccount() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState<Account>()

  const { web3, loading: web3Loading } = useWeb3()

  useEffect(() => {
    if (web3Loading || !web3) {
      return
    }

    const privateKey = window.localStorage.getItem("privateKey")

    if (!!privateKey) {
      const importedAccount = web3.eth.accounts.privateKeyToAccount(privateKey)
      setAccount(importedAccount)
    } else {
      const newAccount = web3.eth.accounts.create()
      setAccount(newAccount)
      window.localStorage.setItem("privateKey", newAccount.privateKey)
    }

    setLoading(false)
  }, [web3Loading])

  return { loading, account }
}

export { useAccount }
