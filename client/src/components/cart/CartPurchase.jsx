import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-primary);
  font-weight: bold;
  gap: 1.5rem;
  margin-top: 5rem;
  > a {
    width: 15rem;
    padding: 1rem 0;
    text-align: center;
  }
`
const ContinueButton = styled(Link)`
  border: 1px solid var(--color-main);
  color: var(--color-main);
`

const PurchaseButton = styled(Link)`
  background: var(--color-main);
  color: white;
`

const CartPurchase = () => {
  return (
    <Container>
      <ContinueButton to="/">계속 쇼핑하기</ContinueButton>
      <PurchaseButton>구매하기</PurchaseButton>
    </Container>
  )
}

export default CartPurchase
