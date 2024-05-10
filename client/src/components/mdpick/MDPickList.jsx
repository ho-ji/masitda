import {useEffect, useState} from 'react'
import styled from 'styled-components'

import {getMDPickListAPI} from 'api/api'
import ProductCard from 'components/common/ProductCard'

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

const MDPickList = () => {
  const [list, setList] = useState([])

  useEffect(() => {
    const getMDPickList = async () => {
      try {
        const result = await getMDPickListAPI()
        setList(result.data)
      } catch (error) {
        console.error(error)
      }
    }
    getMDPickList()
  }, [])

  return (
    <Container>
      {list.length !== 0 && (
        <List>
          {list.map((item, i) => {
            return (
              <ListItem>
                <ProductCard product={item.product} />
              </ListItem>
            )
          })}
        </List>
      )}
    </Container>
  )
}

export default MDPickList
