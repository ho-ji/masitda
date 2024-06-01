import {useEffect, useState} from 'react'
import styled from 'styled-components'

import HomeListContainer from './HomeListContainer'
import {getMDPickListAPI} from 'api/product'
import SkeletonProductCard from 'components/common/product/SkeletonProductCard'
import ProductCard from 'components/common/product/ProductCard'

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  min-width: 22rem;
`

const HomeMDPickList = () => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getMDPickList = async () => {
      try {
        setLoading(true)
        const result = await getMDPickListAPI(7)
        setList(result.data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    getMDPickList()
  }, [])

  return (
    <HomeListContainer
      title="MD Pick"
      link="/mdpick">
      {loading || list.length === 0
        ? Array.from({length: 7}).map((_, i) => (
            <ListItem key={i}>
              <SkeletonProductCard />
            </ListItem>
          ))
        : list.map((item) => {
            return (
              <ListItem key={item._id}>
                <ProductCard
                  product={item}
                  type="mdpick"
                />
              </ListItem>
            )
          })}
    </HomeListContainer>
  )
}

export default HomeMDPickList
