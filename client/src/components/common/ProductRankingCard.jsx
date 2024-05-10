import styled from 'styled-components'

import ProductCard from './ProductCard'

const Ranking = styled.p`
  font-size: var(--font-size-emphasis);
  font-weight: bold;
`
const ProductRankingCard = ({product, ranking}) => {
  return (
    <ProductCard product={product}>
      <Ranking>
        {ranking.toString().padStart(2, '0')}
        <span className="a11y-hidden">위</span>
      </Ranking>
    </ProductCard>
  )
}

export default ProductRankingCard
