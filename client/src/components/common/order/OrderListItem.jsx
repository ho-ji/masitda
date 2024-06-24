import styled from 'styled-components'
import {calculateSaleCost, formatCostWithComma} from 'utils/cost'

const Container = styled.li`
  display: flex;
  height: 15rem;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  border-bottom: 1px solid var(--color-border);
`
const Info = styled.div`
  flex: 1;
`

const Image = styled.img`
  height: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
`

const Temp = styled.p`
  width: fit-content;
  font-size: var(--font-size-subtext);
  border: 1px solid var(--color-gray);
  border-radius: 3px;
  padding: 0 0.5rem;
  margin-bottom: 0.5rem;
`
const Count = styled.p`
  text-align: right;
`

const CostContainer = styled.div`
  width: 10rem;
  text-align: right;
`

const Cost = styled.p`
  font-size: var(--font-size-primary);
  color: var(--color-main);
  font-weight: bold;
`
const RegularCost = styled.p`
  text-decoration: line-through;
  color: var(--color-text-sub);
  font-size: var(--font-size-subtext);
`

const OrderListItem = ({order}) => {
  return (
    <>
      {order && (
        <Container>
          <Image
            src={order.product.image}
            alt="상품 이미지"
          />
          <Info>
            <Temp>{order.product.temp}</Temp>
            <p>{order.product.name}</p>
          </Info>
          <Count>{order.count}개</Count>
          <CostContainer>
            <Cost>{formatCostWithComma(order.count * calculateSaleCost(order.cost, order.rate))}원</Cost>
            <RegularCost>{formatCostWithComma(order.count * order.cost)}원</RegularCost>
          </CostContainer>
        </Container>
      )}
    </>
  )
}

export default OrderListItem
