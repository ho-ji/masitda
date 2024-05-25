import {useRef, useState} from 'react'
import styled from 'styled-components'

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
  &:focus {
    z-index: 2;
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 152, 0, 0.3);
  }
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
  const [idInput, setIdInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const idRef = useRef(null)
  const passwordRef = useRef(null)

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
    alert('hi')
  }

  return (
    <Form onSubmit={handleLogInSubmit}>
      <InputContainer>
        <IdInput
          placeholder="아이디"
          title="아이디"
          value={idInput}
          onChange={(e) => setIdInput(e.target.value)}
          ref={idRef}
        />
        <PasswordInput
          placeholder="비밀번호"
          title="비밀번호"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          ref={passwordRef}
          type="password"
        />
      </InputContainer>
      <LogInButton type="submit">로그인</LogInButton>
    </Form>
  )
}

export default LogInForm
