import ButtonLink from "ethereum-org-website/src/components/ButtonLink"
import Link from "ethereum-org-website/src/components/Link"
import {
  CardContainer,
  H1,
  StyledCard,
} from "ethereum-org-website/src/components/SharedStyledComponents"
import React, { useEffect, useState } from "react"
import { Layout, SEO } from "../components/"
import { ACHIEVEMENT_CONTRACT_ADDRESS, ETHERSCAN_ENDPOINT } from "../config"
import { useAccount, useContract } from "../hooks"
import { Achievement, tokenTypeToString } from "../types"

const {
  abi: ACHIEVEMENT_ABI,
} = require("../../build/contracts/Achievement.json")

const AchievementPage = () => {
  const { account } = useAccount()
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const { contract, loading: contractLoading } = useContract(
    ACHIEVEMENT_ABI,
    ACHIEVEMENT_CONTRACT_ADDRESS
  )

  async function getAchievements() {
    if (!account) {
      return
    }

    let balance
    try {
      balance = await contract?.methods.balanceOf(account.address).call()
    } catch (err) {
      console.error("Error in `balanceOf`:")
      console.error(err)
      balance = 0
    }

    const achievementPromises = []
    for (let i = 0; i < balance; i += 1) {
      achievementPromises.push(
        contract?.methods
          .tokenOfOwnerByIndex(account.address, i)
          .call()
          .then(async (tokenId: string) => {
            const tokenType = await contract?.methods.typeOf(tokenId).call()
            return {
              tokenId,
              tokenType,
            }
          })
      )
    }
    const achievements = await Promise.all(achievementPromises)
    setAchievements(achievements)
  }

  useEffect(() => {
    getAchievements()
  }, [account])

  return (
    <Layout>
      <SEO title="Achievements" />
      <H1>Achievements</H1>
      <p>
        Achievements are minted through a Ether University{" "}
        <Link
          to={`${ETHERSCAN_ENDPOINT}/token/${ACHIEVEMENT_CONTRACT_ADDRESS}`}
        >
          smart contract
        </Link>{" "}
        conforming to the <Link to="http://erc721.org/">ERC-721</Link> standard
        for non-fungible tokens.
      </p>
      {achievements.length > 0 ? (
        <>
          <p>Here are the NFTs you've earned for completing quests!</p>
          <CardContainer>
            {achievements.map(({ tokenId, tokenType }) => (
              <StyledCard
                key={tokenId}
                title={tokenTypeToString(tokenType)}
                emoji=":trophy:"
              >
                <p>
                  Token ID: <b>{tokenId}</b>
                </p>
                <ButtonLink
                  to={`${ETHERSCAN_ENDPOINT}/token/${ACHIEVEMENT_CONTRACT_ADDRESS}?a=${tokenId}`}
                >
                  View Token on Etherscan
                </ButtonLink>
              </StyledCard>
            ))}
          </CardContainer>
        </>
      ) : (
        <>
          <p>
            No achievements earned yet. Earn achievements by completing quests.
          </p>
          <ButtonLink to="/curriculum">Go to Curriculum</ButtonLink>
        </>
      )}
    </Layout>
  )
}

export default AchievementPage
