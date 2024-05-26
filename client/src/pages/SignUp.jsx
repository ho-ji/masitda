import AuthLayout from 'components/common/AuthLayout'
import SignUpForm from 'components/signup/SignUpForm'
import styled from 'styled-components'

const Title = styled.h2`
  font-size: var(--font-size-primary);
  font-weight: bold;
  margin-bottom: 3rem;
  align-self: flex-start;
`

const SignUp = () => {
  return (
    <AuthLayout>
      <Title>회원가입</Title>
      <SignUpForm />
    </AuthLayout>
  )
}

export default SignUp
