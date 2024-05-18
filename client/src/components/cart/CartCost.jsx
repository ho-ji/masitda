import {useRecoilValue} from 'recoil'
import {getTotalCostSelector} from 'recoil/cart/selector'
import styled from 'styled-components'
import {formatCostWithComma} from 'utils/cost'

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 7rem;
  margin-bottom: 2rem;
  border-top: 1px solid black;
  border-bottom: 1px solid #eee;
  padding: 2rem 0;
`
const CostContainer = styled.div`
  width: 100%;
  text-align: center;
  padding: 2rem 0;
  &:not(:first-child) {
    border-left: 1px solid #eee;
  }
`
const Name = styled.p`
  font-size: var(--font-size-secondary);
`

const Cost = styled.p`
  font-size: var(--font-size-emphasis);
  font-weight: 500;
  > span {
    font-size: var(--font-size-secondary);
    padding-left: 0.2rem;
  }
`
const TotalCost = styled(Cost)`
  color: var(--color-main);
`

const CartCost = () => {
  const {totalCost, deliveryFee} = useRecoilValue(getTotalCostSelector)

  return (
    <Container>
      <CostContainer>
        <Name>총 금액</Name>
        <Cost>
          {formatCostWithComma(totalCost)}
          <span>원</span>
        </Cost>
      </CostContainer>
      <CostContainer>
        <Name>배송비</Name>
        <Cost>
          {formatCostWithComma(deliveryFee)}
          <span>원</span>
        </Cost>
      </CostContainer>
      <CostContainer>
        <Name>결제금액</Name>
        <TotalCost>
          {formatCostWithComma(totalCost + deliveryFee)}
          <span>원</span>
        </TotalCost>
      </CostContainer>
    </Container>
  )
}

export default CartCost
