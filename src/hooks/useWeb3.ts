import { useEffect, useState } from "react"
import Web3 from "web3"
import { INFURA_ENDPOINT } from "../config"

/** A hook to access the web3 object. */
function useWeb3() {
  const [loading, setLoading] = useState(true)
  const [web3, setWeb3] = useState<Web3>()

  useEffect(() => {
    setWeb3(new Web3(INFURA_ENDPOINT))
    setLoading(false)
  }, [])

  return { web3, loading }
}

export { useWeb3 }
