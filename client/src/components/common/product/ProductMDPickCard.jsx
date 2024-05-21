import styled from 'styled-components'

import ProductCard from './ProductCard'

const Flag = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 0.5rem;
  background-color: var(--color-main);
  color: white;
  padding: 0 1.5rem 0 1rem;
  z-index: 2;
  clip-path: polygon(100% 0, 100% 0, 90% 100%, 0 100%, 0 0);
`

const ProductMDPickCard = ({product}) => {
  return (
    <ProductCard product={product}>
      <Flag>MD Pick</Flag>
    </ProductCard>
  )
}

export default ProductMDPickCard
