import {createGlobalStyle} from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}
  *{
    box-sizing: border-box;
  }
  html{
    font-size: 62.5%;
  }
  body{
    font-size: 1.6rem;
    line-height: 1.5;
    font-family: Roboto, 'Noto Sans KR', sans-serif;
  }
  a{
    text-decoration: none;
    font-size: inherit;
    color: inherit;
  }
  button{
    border: none;
    cursor: pointer;
    padding: 0;
    font : inherit;
    background: inherit;
    color: inherit;
  }
  img{
    vertical-align: top;
  }
  input{
    margin: 0;
  }
  .a11y-hidden{
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }

  :root {
    --color-main: #ff9800;
    --color-border: #eeeeee;
    --color-text-main: #666666;
    --color-text-sub: #888888;
    --color-gray: #e6e6e6;

    --font-size-emphasis: 2.6rem;
    --font-size-primary: 2.4rem;
    --font-size-secondary: 1.7rem;
    --font-size-subtext: 1.4rem;
  }
`

export default GlobalStyle
