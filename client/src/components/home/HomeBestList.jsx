import {getBestListAPI} from 'api/api'
import {useEffect, useState} from 'react'
import styled from 'styled-components'

import HomeProductCard from './HomeProductCard'

const Container = styled.section`
  margin: 5rem auto;
  padding: 0 10rem;
  max-width: 150rem;
`
const Title = styled.h2`
  font-weight: bold;
  font-size: var(--font-size-primary);
  margin-bottom: 1rem;
`
const BestList = styled.ol`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
  gap: 2rem;
`

const HomeBestList = () => {
  const [bestList, setBestList] = useState([])

  useEffect(() => {
    const getBestList = async () => {
      try {
        const result = await getBestListAPI()
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
      {bestList.length !== 0 && (
        <BestList>
          {bestList.map((product, i) => {
            return (
              <HomeProductCard
                key={product._id}
                product={product}
                ranking={i + 1}
              />
            )
          })}
        </BestList>
      )}
    </Container>
  )
}

export default HomeBestList
