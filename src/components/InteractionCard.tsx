import React from "react"
import Card from "ethereum-org-website/src/components/Card"

const InteractionCard = ({title, sideTextTitle, sideTextBody, circleText, button}) => {
  return (
    <div style={cardContainerStyle}>
      <Card title={title} emoji=":bank:">
      <div style={dataStyle}>
        <div style={{textAlign: "left"}}>
        <p>
          <span style={{fontWeight: "bold"}}>
            {sideTextTitle}
          </span><br/>
          {sideTextBody}
        </p>
        </div>
        <div style={circleStyle}>
          {circleText}
        </div>
      </div>
      {button}
      </Card>
    </div>
  )
}

const cardContainerStyle = {
  margin: 100,
  width: 700,
  margin: "0 auto",
  marginBottom: 30,
  textAlign: "center"
}

const dataStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  padding: 30
}

const circleStyle = {
  border: "7px solid black",
  borderRadius: "50%",
  width: 230,
  height: 230,
  fontSize: 32,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold"
}

export { InteractionCard }
