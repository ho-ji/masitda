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
    font: inherit;
    margin: 0;
    border: none;
  }
  input[type="checkbox"]{
    cursor: pointer;
  }
  input:not([type="checkbox"]){
    &:focus {
      z-index: 2;
      outline: none;
      box-shadow: 0 0 0 3px rgba(255, 152, 0, 0.3);
    }
  }
  .a11y-hidden{
    overflow: hidden;
    position: absolute;
    width: 0;
    height: 0;
    line-height: 0;
    text-indent: -9999px;
  }
  h1, h2, h3, p,span, strong{
    cursor: default;
  }
  :root {
    --color-main: #ff9800;
    --color-border: #eeeeee;
    --color-text-main: #666666;
    --color-text-sub: #888888;
    --color-gray: #d7d7d7;
    --color-light-gray: #fafafa;
    --color-red: #d64141;

    --font-size-emphasis: 2.4rem;
    --font-size-primary: 1.7rem;
    --font-size-subtext: 1.4rem;
  }
  input{
    &::placeholder{
      color: var(--color-text-sub);
    }
  }
`

export default GlobalStyle
