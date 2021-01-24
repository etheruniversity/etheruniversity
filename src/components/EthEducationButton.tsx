import React from "react"
import { lightTheme } from "ethereum-org-website/src/theme"
import "../css/styles.css";

const EthEducationButton: React.FC = (props) => {
  const base = {
    textDecoration: "none",
    display: "inline-block",
    whiteSpace: "nowrap",
    padding: "0.5rem 0.75rem",
    fontSize: "1rem",
    borderRadius: "0.25em",
    textAlign: "center"
  }
  console.log(lightTheme.colors.primary+ " !important")
  const primary = {
    // backgroundColor: lightTheme.colors.primary + " !important", I'm not sure why this wouldn't work so I put it in styles.css
    color: lightTheme.colors.buttonColor,
    border: "1px solid transparent"
  };
  const secondary =  {
    // backgroundColor: "transparent", I'm not sure why this wouldn't work so I put it in styles.css
    color: lightTheme.colors.text,
    border: "1px solid " + lightTheme.colors.text
  };
  const styles = props.disabled ? {...base, ...secondary} : {...base, ...primary};
  console.log(styles)
  return <button {...props} className="EthEducationButton" style={styles} />
}

export { EthEducationButton };
