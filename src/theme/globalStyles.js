import { createGlobalStyle} from "styled-components"

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${ ({ theme }) => theme.body};
    transition: all 0.5s ease;
  }
`

// color: ${({ theme }) => theme.text};