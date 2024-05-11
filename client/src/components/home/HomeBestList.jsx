import styled from 'styled-components'
import {useEffect, useState} from 'react'

import {getTopListAPI} from 'api/api'
import ProductRankingCard from 'components/common/product/ProductRankingCard'
import HomeListContainer from './HomeListContainer'

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  min-width: 22rem;
`

const HomeBestList = () => {
  const [bestList, setBestList] = useState([])

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
    <HomeListContainer
      title="베스트"
      link="/best">
      {bestList.length !== 0 &&
        bestList.map((product, i) => {
          return (
            <ListItem key={product._id}>
              <ProductRankingCard
                product={product}
                ranking={i + 1}
              />
            </ListItem>
          )
        })}
    </HomeListContainer>
  )
}

export default HomeBestList
