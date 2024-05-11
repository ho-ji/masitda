import styled from 'styled-components'

import ProductRankingCard from './ProductRankingCard'
import ProductMDPickCard from './ProductMDPickCard'

const Container = styled.main`
  margin: 5rem auto;
  padding: 0 5rem;
  max-width: 150rem;
`
const Title = styled.h2`
  font-weight: bold;
  font-size: var(--font-size-emphasis);
  margin-bottom: 5rem;
  text-align: center;
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

const ProductList = ({list, title, type}) => {
  return (
    <Container>
      <Title>{title}</Title>
      <List>
        {list.length !== 0 &&
          list.map((item, i) => {
            return (
              <ListItem key={item._id}>
                {type === 'ranking' && (
                  <ProductRankingCard
                    product={item}
                    ranking={i + 1}
                  />
                )}
                {type === 'mdpick' && <ProductMDPickCard product={item.product} />}
              </ListItem>
            )
          })}
      </List>
    </Container>
  )
}

export default ProductList
