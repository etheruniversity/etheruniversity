import { useEffect, useState } from "react"
import Web3 from "web3"
import { INFURA_ENDPOINT } from "../config"

class TransactionPendingObserver {
  constructor() {
    this.observers = {}
  }
  subscribe(key, callback) {
    this.observers[key] = callback
  }
  unsubscribe(key) {
    delete this.observers[key];
  }
  publish(isTransactionPending) {
    for (var key in this.observers) {
        this.observers[key](isTransactionPending);
    }
  }
}

// singleton
const transactionPendingObserver = new TransactionPendingObserver()

/** A hook to access the web3 object. */
function useWeb3() {
  const [loading, setLoading] = useState(true)
  const [web3, setWeb3] = useState<Web3>()

  useEffect(() => {
    setWeb3(new Web3(INFURA_ENDPOINT))
    setLoading(false)
  }, [])

  return { web3, loading, transactionPendingObserver }
}

export { useWeb3 }
