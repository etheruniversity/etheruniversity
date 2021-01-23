import ButtonLink from "ethereum-org-website/src/components/ButtonLink"
import Modal from "ethereum-org-website/src/components/Modal"
import {
  ButtonPrimary,
  H2,
} from "ethereum-org-website/src/components/SharedStyledComponents"
import { capitalize } from "lodash"
import React, { useState } from "react"
import { ETHERSCAN_ENDPOINT, TESTNET_NAME } from "../config"
import { useAccount, useWeb3 } from "../hooks"

interface AccountButtonProps
  extends React.ComponentProps<typeof ButtonPrimary> {}

const AccountButton: React.FC<AccountButtonProps> = props => {
  const { web3 } = useWeb3()
  const { account, loading, balance } = useAccount()
  const [accountModalIsOpen, setAccountModalIsOpen] = useState(false)
  const address = account?.address

  return (
    <>
      <ButtonPrimary onClick={() => setAccountModalIsOpen(true)} {...props}>
        {loading ? "Connecting..." : "Connected to Blockchain"}
      </ButtonPrimary>
      {/* Just hide the entire element when not open. Overlay is causing z-index issues */}
      {accountModalIsOpen && (
        <Modal isOpen={accountModalIsOpen} setIsOpen={setAccountModalIsOpen}>
          <H2 style={{ marginTop: 0 }}>Account Info</H2>
          <p>
            Your address is <b>{address}</b>.
          </p>
          <p>
            You balance is <b>{web3?.utils.fromWei(balance) ?? 0} ETH</b>.
          </p>
          <p>
            You are on the <b>{capitalize(TESTNET_NAME)}</b> testnet.
          </p>
          <div>
            <ButtonLink to={`${ETHERSCAN_ENDPOINT}/address/${address}`}>
              View Address Details
            </ButtonLink>
          </div>
        </Modal>
      )}
    </>
  )
}

export { AccountButton }
