import {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import styled from 'styled-components'

import completeImage from 'assets/images/complete.svg'

const Container = styled.div`
  display: grid;
  min-height: 100dvh;
  place-items: center;
  grid-template-rows: 1fr auto;
  > main {
    padding: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > img {
      width: 10rem;
      margin-bottom: 1rem;
    }
    > h2 {
      font-size: var(--font-size-emphasis);
      font-weight: bold;
      margin-bottom: 2rem;
    }
  }
`

const Text = styled.p`
  > span {
    color: var(--color-main);
    font-weight: bold;
  }
`
const GoHome = styled.p`
  font-size: var(--font-size-subtext);
  color: var(--color-text-sub);
  > span {
    text-decoration: underline;
  }
`

const CompleteSplash = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [count, setCount] = useState(3)

  useEffect(() => {
    if (!location.state?.complete) navigate('/', {replace: true})
  }, [navigate, location])

  useEffect(() => {
    const countDown = setInterval(() => {
      setCount((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(countDown)
  }, [])

  useEffect(() => {
    if (count <= 0) navigate('/', {replace: true})
  }, [count, navigate])

  useEffect(() => {
    const handleRefresh = () => {
      navigate('/', {replace: true})
    }
    window.addEventListener('beforeunload', handleRefresh)
    return () => {
      window.removeEventListener('beforeunload', handleRefresh)
    }
  }, [navigate])

  return (
    <Container>
      <main>
        <h1 className="a11y-hidden">마싯다</h1>
        <img
          src={completeImage}
          alt="완료"
        />
        <h2>주문 완료</h2>
        <Text>
          총 <span>{location.state?.length}건</span>의 주문이 완료되었습니다
        </Text>
        <GoHome>
          <span>{count}초</span> 후 홈화면으로 이동합니다
        </GoHome>
      </main>
    </Container>
  )
}

export default CompleteSplash
