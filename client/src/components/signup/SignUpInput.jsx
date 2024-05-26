import styled from 'styled-components'
import {useState} from 'react'

import useInput from 'hooks/useInput'
import {getCheckaccountAPI} from 'api/user'
import {signUpText} from 'constants/authText'

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

const SignUpInput = ({type, validator, setValidError}) => {
  const {value: inputValue, handler: handleChange} = useInput()
  const [error, setError] = useState(false)
  const [isDuplicateaccount, setIsDuplicateaccount] = useState(false)

  const checkaccount = async () => {
    try {
      await getCheckaccountAPI(inputValue)
      setIsDuplicateaccount(false)
    } catch (error) {
      setIsDuplicateaccount(true)
      setError(true)
      setValidError(true)
      console.error(error)
    }
  }

  const handleFocus = () => {
    setError(false)
    setValidError(true)
  }
  const handleBlur = () => {
    if (!validator(inputValue)) {
      setError(true)
      setValidError(true)
    } else {
      if (type === 'account') {
        checkaccount()
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
      {error && <ErrorText>{isDuplicateaccount ? signUpText[type].duplicateError : signUpText[type].validationError}</ErrorText>}
    </div>
  )
}

export default SignUpInput
