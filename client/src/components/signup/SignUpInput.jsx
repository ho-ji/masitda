import styled from 'styled-components'
import {useState} from 'react'

import useInput from 'hooks/useInput'
import {signUpText} from 'constants/authText'
import {getCheckAccountAPI} from 'api/user'

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: var(--font-size-primary);
  color: ${(props) => props.$error === true && 'var(--color-red)'};
  > input {
    margin-top: 1rem;
    padding: 1rem;
    border: 1px solid var(--color-border);
    border-color: ${(props) => props.$error === true && 'var(--color-red)'};
    border-radius: 5px;
  }
`
const ErrorText = styled.p`
  color: var(--color-red);
  font-size: var(--font-size-subtext);
`
const AvailableText = styled.p`
  color: var(--color-main);
  font-size: var(--font-size-subtext);
`

const SignUpInput = ({type, validator, setValidError}) => {
  const {value: inputValue, handler: handleChange} = useInput()
  const [error, setError] = useState(false)
  const [isDuplicateAccount, setIsDuplicateAccount] = useState(null)

  const checkAccount = async () => {
    try {
      await getCheckAccountAPI(inputValue)
      setIsDuplicateAccount(false)
    } catch (error) {
      setIsDuplicateAccount(true)
      setError(true)
      setValidError(true)
      console.error(error)
    }
  }

  const handleFocus = () => {
    setError(false)
    setValidError(true)
    setIsDuplicateAccount(null)
  }
  const handleBlur = () => {
    if (!validator(inputValue)) {
      setError(true)
      setValidError(true)
    } else {
      if (type === 'account') {
        checkAccount()
      }
      setValidError(false)
    }
  }

  return (
    <div>
      <Label $error={error}>
        {signUpText[type].label}
        <input
          placeholder={signUpText[type].placeholder}
          value={inputValue}
          onFocus={handleFocus}
          onChange={handleChange}
          onBlur={handleBlur}
          name={type}
          type={type.includes('password') ? 'password' : 'text'}
        />
      </Label>
      {error && <ErrorText>{isDuplicateAccount ? signUpText[type].duplicateError : signUpText[type].validationError}</ErrorText>}
      {isDuplicateAccount === false && <AvailableText>{signUpText[type].available}</AvailableText>}
    </div>
  )
}

export default SignUpInput
