import styled from 'styled-components'
import {useSetRecoilState} from 'recoil'
import {useNavigate} from 'react-router-dom'
import {useRef} from 'react'
import {userState} from 'recoil/user/atom'

import {postLoginAPI} from 'api/user'
import useInput from 'hooks/useInput'

const Form = styled.form`
  width: 100%;
`

const InputContainer = styled.div`
  border-radius: 5px;
  border: 1px solid var(--color-border);
`

const Input = styled.input`
  width: 100%;
  padding: 1.2rem 1rem;
  position: relative;
`
const IdInput = styled(Input)`
  border-radius: 5px 5px 0 0;
`
const PasswordInput = styled(Input)`
  border-top: 1px solid var(--color-border);
  border-radius: 0 0 5px 5px;
`

const LogInButton = styled.button`
  width: 100%;
  padding: 1.2rem 0;
  color: white;
  margin: 2rem 0;
  background: var(--color-main);
  border-radius: 5px;
`

const LogInForm = () => {
  const idRef = useRef(null)
  const passwordRef = useRef(null)
  const setUser = useSetRecoilState(userState)
  const navigate = useNavigate()
  const {value: idInput, handler: handleIdChange} = useInput()
  const {value: passwordInput, handler: handlePasswordChange, clear: clearPassword} = useInput()

  const postLogin = async () => {
    try {
      const loginResult = await postLoginAPI(idInput, passwordInput)
      const {accessToken, uid} = loginResult
      localStorage.setItem('uid', uid)
      setUser({accessToken})
      navigate(-1)
    } catch (error) {
      alert('아이디 또는 비밀번호가 일치하지 않습니다.')
      clearPassword()
      passwordRef.current.focus()
    }
  }

  const handleLogInSubmit = (e) => {
    e.preventDefault()

    if (idInput === '') {
      alert('아이디를 입력해주세요')
      idRef.current.focus()
      return
    }
    if (passwordInput === '') {
      alert('비밀번호를 입력해주세요')
      passwordRef.current.focus()
      return
    }

    postLogin()
  }

  return (
    <Form onSubmit={handleLogInSubmit}>
      <InputContainer>
        <IdInput
          placeholder="아이디"
          title="아이디"
          value={idInput}
          onChange={handleIdChange}
          ref={idRef}
        />
        <PasswordInput
          placeholder="비밀번호"
          title="비밀번호"
          value={passwordInput}
          onChange={handlePasswordChange}
          ref={passwordRef}
          type="password"
        />
      </InputContainer>
      <LogInButton type="submit">로그인</LogInButton>
    </Form>
  )
}

export default LogInForm
