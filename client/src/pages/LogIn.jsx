import styled from 'styled-components'

import LogInForm from 'components/login/LogInForm'
import LogInLogo from 'components/login/LogInLogo'
import LogInNav from 'components/login/LogInNav'
import LogInFooter from 'components/login/LogInFooter'

const Container = styled.div`
  display: grid;
  min-height: 100dvh;
  place-items: center;
  background-color: var(--color-light-gray);
  grid-template-rows: 1fr auto;
  > main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 30rem;
  }
`

const LogIn = () => {
  return (
    <Container>
      <main>
        <LogInLogo />
        <LogInForm />
        <LogInNav />
      </main>
      <LogInFooter />
    </Container>
  )
}

export default LogIn
