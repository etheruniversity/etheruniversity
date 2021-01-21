import { useEffect, useState } from "react"
import Web3 from "web3"

/** A hook to access the web3 object. */
function useWeb3() {
  const [loading, setLoading] = useState(true)
  const [web3, setWeb3] = useState<Web3>()

  useEffect(() => {
    setWeb3(new Web3(process.env.INFURA_WEBSOCKET_ENDPOINT!))
    setLoading(false)
  }, [])

  return { web3, loading }
}

export { useWeb3 }
