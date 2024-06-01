import styled from 'styled-components'
import {useEffect, useState} from 'react'

import {getBestListAPI} from 'api/product'
import HomeListContainer from './HomeListContainer'
import SkeletonProductCard from 'components/common/product/SkeletonProductCard'
import ProductCard from 'components/common/product/ProductCard'

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  min-width: 22rem;
`

const HomeBestList = () => {
  const [bestList, setBestList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getBestList = async () => {
      try {
        setLoading(true)
        const result = await getBestListAPI(7)
        setBestList(result.data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    getBestList()
  }, [])

  return (
    <HomeListContainer
      title="베스트"
      link="/best">
      {loading
        ? Array.from({length: 7}).map((_, i) => (
            <ListItem key={i}>
              <SkeletonProductCard ranking={true} />
            </ListItem>
          ))
        : bestList.length !== 0 &&
          bestList.map((product, i) => {
            return (
              <ListItem key={product._id}>
                <ProductCard
                  product={product}
                  type="ranking"
                  ranking={i + 1}
                />
              </ListItem>
            )
          })}
    </HomeListContainer>
  )
}

export default HomeBestList
