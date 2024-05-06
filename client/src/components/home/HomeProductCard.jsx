import styled from 'styled-components'

import {formatSaleCost} from 'utils/cost'

const Container = styled.li`
  aspect-ratio: 1/2;
  position: relative;
`
const Ranking = styled.p`
  font-size: var(--font-size-emphasis);
  font-weight: bold;
`
const Image = styled.img`
  aspect-ratio: 1/1;
  object-fit: contain;
  width: 100%;
  margin: 1rem 0;
  border: 1px solid var(--color-border);
`
const Name = styled.strong`
  font-size: var(--font-size-secondary);
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-break: break-all;
`
const Description = styled.p`
  font-size: var(--font-size-subtext);
  color: var(--color-text-sub);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const CostContainer = styled.div`
  margin: 1rem 0;
  display: flex;
  align-items: flex-end;
  gap: 1rem;
`
const SaleCost = styled.span`
  font-size: var(--font-size-primary);
  font-weight: bold;
`
const Cost = styled.span`
  font-size: var(--font-size-secondary);
  color: var(--color-text-main);
  text-decoration: line-through;
`
const Rate = styled.span`
  color: var(--color-main);
  font-weight: bold;
`
const Temp = styled.span`
  color: var(--color-text-main);
  color: ${(props) => props.$temp === '냉동' && '#1a4568'};
  color: ${(props) => props.$temp === '냉장' && '#b6d0e1'};
`
const HomeProductCard = ({product, ranking}) => {
  return (
    <Container>
      <Ranking>
        {ranking.toString().padStart(2, '0')}
        <span className="a11y-hidden">위</span>
      </Ranking>
      <Image
        src={product.image}
        alt="상품이미지"
      />
      <Name>{product.name}</Name>
      {product.description && <Description>{product.description}</Description>}
      <CostContainer>
        <SaleCost>{`${formatSaleCost(product.cost, product.rate)}원`}</SaleCost>
        {product.rate !== 0 && (
          <>
            <Cost>
              <span className="a11y-hidden">정상가</span>
              {`${product.cost}원`}
            </Cost>
            <Rate>
              <span className="a11y-hidden">할인율</span>
              {`${product.rate}%`}
            </Rate>
          </>
        )}
        <Temp $temp={product.temp}>{product.temp}</Temp>
      </CostContainer>
    </Container>
  )
}

export default HomeProductCard
