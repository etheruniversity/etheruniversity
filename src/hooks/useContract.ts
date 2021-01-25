import { Contract, ContractOptions } from "web3-eth-contract"
import { AbiItem } from "web3-utils"
import { useEffect, useState } from "react"
import { useWeb3 } from "./useWeb3"

/**
 * A hook that abstracts the web3 contract setup process.
 *
 * Usage:
 *
 * ```js
 * const { contract, loading } = useContract(CONTRACT_ABI, CONTRACT_ADDRESS);
 *
 * async function getBalance(address) {
 *   return contract.methods.balanceOf(address).call()
 * }
 * ```
 */
function useContract(
  abi: AbiItem[] | AbiItem,
  address?: string,
  options?: ContractOptions
) {
  const { web3, loading: web3Loading } = useWeb3()
  const [contract, setContract] = useState<Contract>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (web3Loading || !web3) {
      return
    }

    setContract(new web3.eth.Contract(abi, address, options))
    setLoading(false)
  }, [web3, web3Loading])

  return { contract, loading }
}

export { useContract }
