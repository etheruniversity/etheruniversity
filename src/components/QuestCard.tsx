import React from "react"
import ActionCard from "ethereum-org-website/src/components/ActionCard"
import styled from "styled-components"
import { Quest } from "../types"

interface QuestCardContainerProps {
  released: boolean
}

const StyledQuestCard = styled(ActionCard)<QuestCardContainerProps>`
  position: relative;
  opacity: ${({ released }) => (released ? 1 : 0.5)};
  pointer-events: ${({ released }) => (released ? "auto" : "none")};

  &::after {
    position: absolute;
    top: 2rem;
    right: 2rem;
    font-weight: bold;
    font-size: 1.5rem;
    content: "${({ released }) => (released ? "Try Now" : "Coming Soon")}";
  }
`

interface QuestCardProps {
  quest: Quest
}

const QuestCard: React.FC<QuestCardProps> = ({ quest }) => {
  const { link, title, description, released, image } = quest
  return (
    <StyledQuestCard
      to={link}
      title={title}
      description={description}
      released={released}
      image={image}
    />
  )
}

export { QuestCard }
