import {useEffect, useState} from 'react'
import styled from 'styled-components'

import {getTopListAPI} from 'api/api'
import ProductCard from 'components/common/ProductCard'
import {useNavigate} from 'react-router-dom'

const Container = styled.section`
  margin: 5rem auto;
  padding: 0 5rem;
  max-width: 150rem;
`
const Title = styled.h2`
  font-weight: bold;
  font-size: var(--font-size-primary);
  margin-bottom: 1rem;
  display: inline-block;
`

const MoreButton = styled.button`
  border-radius: 2rem;
  float: right;
  padding: 0.5rem 2rem;
  line-height: 2rem;
  border: 1px solid var(--color-gray);
  color: var(--color-text-main);
`

const BestList = styled.ol`
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`
const Ranking = styled.p`
  font-size: var(--font-size-emphasis);
  font-weight: bold;
`
const ListItem = styled.li`
  display: flex;
  flex-direction: column;
`

const HomeBestList = () => {
  const [bestList, setBestList] = useState([])
  const navigate = useNavigate()

  const handleMoreButtonClick = () => {
    navigate('/best')
  }

  useEffect(() => {
    const getBestList = async () => {
      try {
        const result = await getTopListAPI()
        setBestList(result.data)
      } catch (error) {
        console.error(error)
      }
    }
    getBestList()
  }, [])

  return (
    <Container>
      <Title>베스트</Title>
      <MoreButton onClick={handleMoreButtonClick}>더보기</MoreButton>
      {bestList.length !== 0 && (
        <>
          <BestList>
            {bestList.map((product, i) => {
              return (
                <ListItem>
                  <Ranking>
                    {(i + 1).toString().padStart(2, '0')}
                    <span className="a11y-hidden">위</span>
                  </Ranking>
                  <ProductCard
                    key={product._id}
                    product={product}
                  />
                </ListItem>
              )
            })}
          </BestList>
        </>
      )}
    </Container>
  )
}

export default HomeBestList
