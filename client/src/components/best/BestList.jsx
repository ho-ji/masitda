import {useEffect, useState} from 'react'
import styled from 'styled-components'

import {getBestListAPI} from 'api/api'
import ProductRankingCard from 'components/common/ProductRankingCard'

const Container = styled.main`
  margin: 5rem auto;
  padding: 0 5rem;
  max-width: 150rem;
`
const List = styled.ol`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
  gap: 2rem;
`

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
`

const BestList = () => {
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
      {bestList.length !== 0 && (
        <List>
          {bestList.map((product, i) => {
            return (
              <ListItem>
                <ProductRankingCard
                  product={product}
                  ranking={i + 1}
                />
              </ListItem>
            )
          })}
        </List>
      )}
    </Container>
  )
}

export default BestList
