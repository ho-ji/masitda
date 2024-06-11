import {useEffect, useState} from 'react'
import {useRecoilState} from 'recoil'
import styled from 'styled-components'

import {tokenState} from 'recoil/token/atom'
import {getUserInformationAPI} from 'api/user'

const Container = styled.main`
  margin: 5rem auto;
  padding: 0 5rem;
  max-width: 152rem;
  display: flex;
  > h2 {
    text-align: center;
    font-size: var(--font-size-emphasis);
    font-weight: bold;
    margin-bottom: 3rem;
  }
`
const UserInfo = styled.section`
  padding: 3rem;
  > p {
    font-weight: bold;
    font-size: var(--font-size-primary);
  }
`

const UserInformation = () => {
  const [name, setName] = useState('')
  const [token, setToken] = useRecoilState(tokenState)

  useEffect(() => {
    const getUserInformation = async () => {
      try {
        const result = await getUserInformationAPI(token)
        if (result.data.success) setName(result.data.user.name)
        else setToken('')
      } catch (error) {
        setToken('')
      }
    }
    getUserInformation()
  }, [token, setToken])
  return (
    <Container>
      <h2>마이페이지</h2>
      <ul></ul>
      <UserInfo>
        <p>
          {name}
          <span>님</span>
        </p>
      </UserInfo>
    </Container>
  )
}

export default UserInformation
