import styled from 'styled-components'
import {Link, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'

import AuthLayout from 'components/common/AuthLayout'
import SignUpForm from 'components/signup/SignUpForm'
import useCheckLogIn from 'hooks/useCheckLogIn'

const Title = styled.h2`
  font-size: var(--font-size-primary);
  font-weight: bold;
  margin-bottom: 3rem;
  align-self: flex-start;
`
const CheckAccount = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  > p {
    color: var(--color-text-sub);
    text-decoration: underline;
  }
  > a {
    color: var(--color-main);
    font-weight: bold;
  }
`

const SignUp = () => {
  const checkLogIn = useCheckLogIn()
  const navigate = useNavigate()
  const [loadingLogIn, setLoadingLogIn] = useState(false)

  useEffect(() => {
    const check = async () => {
      const isLogin = await checkLogIn()
      if (isLogin) navigate('/user')
      else setLoadingLogIn(true)
    }
    check()
  }, [checkLogIn, navigate])
  return (
    <>
      {loadingLogIn && (
        <AuthLayout>
          <Title>회원가입</Title>
          <SignUpForm />
          <CheckAccount>
            <p>이미 계정이 있나요?</p>
            <Link to="/login">로그인</Link>
          </CheckAccount>
        </AuthLayout>
      )}
    </>
  )
}

export default SignUp
