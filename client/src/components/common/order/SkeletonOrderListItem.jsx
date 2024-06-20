import styled from 'styled-components'

const Skeleton = styled.div`
  position: relative;
  overflow: hidden;
  background-color: #eee;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 200%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
    animation: wave 2s infinite;
  }
  @keyframes wave {
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(100%);
    }
  }
`

const Container = styled.li`
  display: flex;
  height: 12rem;
  align-items: center;
  gap: 2rem;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--color-border);
`

const Image = styled(Skeleton)`
  height: 100%;
  aspect-ratio: 1/1;
`

const Info = styled.div`
  flex: 1;
`

const Temp = styled(Skeleton)`
  width: fit-content;
  font-size: var(--font-size-subtext);
  border-radius: 3px;
  padding: 0 0.5rem;
  margin-bottom: 0.5rem;
`
const Name = styled(Skeleton)`
  width: fit-content;
`

const SkeletonOrderListItem = () => {
  return (
    <Container>
      <Image />
      <Info>
        <Temp>ㅤㅤ</Temp>
        <Name>ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ</Name>
      </Info>
      <Skeleton>ㅤㅤ</Skeleton>
      <Skeleton>ㅤㅤㅤㅤ</Skeleton>
    </Container>
  )
}

export default SkeletonOrderListItem
