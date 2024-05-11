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
          list.map((product, i) => {
            return (
              <ListItem key={product._id}>
                {type === 'ranking' && (
                  <ProductRankingCard
                    product={product}
                    ranking={i + 1}
                  />
                )}
                {type === 'mdpick' && <ProductMDPickCard product={product} />}
              </ListItem>
            )
          })}
      </List>
    </Container>
  )
}

export default ProductList
