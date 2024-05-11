import {useEffect, useState} from 'react'
import styled from 'styled-components'

import HomeListContainer from './HomeListContainer'
import {getMDPickListAPI} from 'api/api'
import ProductCard from 'components/common/product/ProductCard'

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  min-width: 22rem;
`

const HomeMDPickList = () => {
  const [list, setList] = useState([])

  useEffect(() => {
    const getMDPickList = async () => {
      try {
        const result = await getMDPickListAPI(6)
        setList(result.data)
      } catch (error) {
        console.error(error)
      }
    }
    getMDPickList()
  }, [])

  return (
    <HomeListContainer
      title="MD Pick"
      link="/mdpick">
      {list?.length !== 0 &&
        list?.map((item) => {
          return (
            <ListItem key={item._id}>
              <ProductCard product={item} />
            </ListItem>
          )
        })}
    </HomeListContainer>
  )
}

export default HomeMDPickList
