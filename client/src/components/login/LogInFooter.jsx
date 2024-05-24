import styled from 'styled-components'

const Container = styled.footer`
  width: 100%;
  margin: 2rem 0;
  text-align: center;
  font-size: var(--font-size-subtext);
  color: var(--color-text-sub);
`

const LogInFooter = () => {
  return <Container>©2024 장예지. All rights reserved.</Container>
}

export default LogInFooter
