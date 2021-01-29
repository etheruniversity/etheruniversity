import styled from "styled-components"

// From https://github.com/ethereum/ethereum-org-website/blob/dev/src/components/Search/Input.js
const Input = styled.input`
  border: 1px solid ${props => props.theme.colors.searchBorder};
  color: ${props => props.theme.colors.text};
  background: ${props => props.theme.colors.searchBackground};
  padding: 0.5rem;
  padding-right: 2rem;
  border-radius: 0.25em;
  width: 100%;

  &:focus {
    outline: ${props => props.theme.colors.primary} auto 1px;
  }
`

export { Input }
