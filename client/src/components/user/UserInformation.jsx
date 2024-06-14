import {useEffect, useState} from 'react'
import {useRecoilState} from 'recoil'
import styled from 'styled-components'

import {tokenState} from 'recoil/token/atom'
import {getUserInformationAPI} from 'api/user'
import iconImage from 'assets/images/user_icon.svg'

const Container = styled.main`
  margin: 5rem auto;
  padding: 0 5rem;
  max-width: 152rem;
  > h2 {
    text-align: center;
    font-size: var(--font-size-emphasis);
    font-weight: bold;
    margin-bottom: 5rem;
  }
`
const UserInfo = styled.section`
  padding: 2.5rem;
  background-color: var(--color-light-gray);
  display: grid;
  grid-template-areas:
    'img name total'
    'img edit total';
  grid-template-columns: 6rem 3fr 1fr;
  align-items: center;
  margin-bottom: 5rem;
  grid-column-gap: 3rem;
  grid-row-gap: 1rem;
  > img {
    width: 6rem;
    aspect-ratio: 1/1;
    grid-area: img;
  }
`

const Name = styled.p`
  grid-area: name;
  font-size: var(--font-size-primary);
  font-weight: bold;
  > span {
    font-weight: normal;
  }
`
const EditButton = styled.button`
  grid-area: edit;
  width: fit-content;
  font-size: var(--font-size-subtext);
  color: var(--color-text-main);
  border: 1px solid var(--color-gray);
  border-radius: 5px;
  padding: 0.5rem 1rem;
`

const TotalOrder = styled.div`
  grid-area: total;
  text-align: center;
  border-left: 1px dashed #666;
  > p {
    color: var(--color-text-main);
    margin-bottom: 1rem;
    font-size: var(--font-size-subtext);
  }
  > div {
    font-size: var(--font-size-subtext);
    > span {
      font-weight: bold;
      font-size: var(--font-size-primary);
    }
  }
`

const OrderList = styled.div`
  > h3 {
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
        if (result.data.success) {
          if (result.data.accessToken) setToken(result.data.accessToken)
          setName(result.data.user.name)
        }
      } catch (error) {}
    }
    getUserInformation()
  }, [token, setToken])
  return (
    <Container>
      <h2>마이페이지</h2>
      <UserInfo>
        <img
          src={iconImage}
          alt=""
        />
        <Name>
          {name}
          <span>님 </span>
          <span>안녕하세요.</span>
        </Name>
        <EditButton type="button">회원정보 수정</EditButton>
        <TotalOrder>
          <p>주문 배송</p>
          <div>
            <span>{'N'}</span> 회
          </div>
        </TotalOrder>
      </UserInfo>
      <OrderList>
        <h3>최근 주문내역</h3>
      </OrderList>
    </Container>
  )
}

export default UserInformation
