import {useRecoilValue} from 'recoil'
import styled from 'styled-components'

import {getTotalCostSelector} from 'recoil/cart/selector'
import {formatCostWithComma} from 'utils/cost'
import plusImage from 'assets/images/plus.svg'
import equalImage from 'assets/images/equal.svg'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  border-top: 1px solid black;
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-light-gray);
`
const CostContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 2rem 0;
`

const Exp = styled.span`
  width: 2rem;
  height: 2rem;
  background: no-repeat center;
`

const Plus = styled(Exp)`
  background-image: url(${plusImage});
`

const Equal = styled(Exp)`
  background-image: url(${equalImage});
`

const Cost = styled.p`
  font-size: var(--font-size-primary);
  font-weight: 500;
  > span {
    font-size: var(--font-size-subtext);
    padding-left: 0.2rem;
  }
`
const TotalCost = styled(Cost)`
  color: var(--color-main);
`

const DeliveryText = styled.span`
  text-align: right;
  font-size: var(--font-size-subtext);
  color: var(--color-text-sub);
  margin-top: 1rem;
`

const CartCost = () => {
  const {totalCost, deliveryFee} = useRecoilValue(getTotalCostSelector)

  return (
    <Container>
      <CostContainer>
        <p>총 금액</p>
        <Cost>
          {formatCostWithComma(totalCost)}
          <span>원</span>
        </Cost>
      </CostContainer>
      <Plus></Plus>
      <CostContainer>
        <p>배송비</p>
        <Cost>
          {formatCostWithComma(deliveryFee)}
          <span>원</span>
          {deliveryFee !== 0 && <DeliveryText>(3만원 이상 무료배송)</DeliveryText>}
        </Cost>
      </CostContainer>
      <Equal></Equal>
      <CostContainer>
        <p>결제금액</p>
        <TotalCost>
          {formatCostWithComma(totalCost + deliveryFee)}
          <span>원</span>
        </TotalCost>
      </CostContainer>
    </Container>
  )
}

export default CartCost
