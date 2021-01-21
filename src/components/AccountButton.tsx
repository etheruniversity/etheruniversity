import Modal from "ethereum-org-website/src/components/Modal"
import {
  ButtonPrimary,
  H2,
} from "ethereum-org-website/src/components/SharedStyledComponents"
import React, { useState } from "react"
import { useAccount } from "../hooks"

interface AccountButtonProps
  extends React.ComponentProps<typeof ButtonPrimary> {}

const AccountButton: React.FC<AccountButtonProps> = props => {
  const { account, loading } = useAccount()
  const [accountModalIsOpen, setAccountModalIsOpen] = useState(false)

  return (
    <>
      <ButtonPrimary onClick={() => setAccountModalIsOpen(true)} {...props}>
        {loading ? "Connecting..." : "Connected to Blockchain"}
      </ButtonPrimary>
      <Modal isOpen={accountModalIsOpen} setIsOpen={setAccountModalIsOpen}>
        <H2 style={{ marginTop: 0 }}>Account Info</H2>
        <p>Address: {account?.address}</p>
        <ButtonPrimary style={{ alignSelf: "flex-start" }}>
          Get Started
        </ButtonPrimary>
      </Modal>
    </>
  )
}

export { AccountButton }
