import {useNavigate, useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {useRecoilState} from 'recoil'
import styled from 'styled-components'

import {tokenState} from 'recoil/token/atom'
import {getTempOrderAPI} from 'api/tempOrder'
import SkeletonOrderListItem from 'components/common/order/SkeletonOrderListItem'
import OrderListItem from 'components/common/order/OrderListItem'
import {calculateSaleCost, formatCostWithComma} from 'utils/cost'
import OrderForm from './OrderForm'

const Container = styled.main`
  margin: 5rem auto;
  padding: 0 10rem;
  max-width: 150rem;
  min-height: 30rem;
  > h2 {
    font-size: var(--font-size-emphasis);
    font-weight: bold;
    margin-bottom: 3rem;
  }
  h3 {
    font-size: var(--font-size-primary);
    font-weight: bold;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--color-gray);
  }
`
const OrderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  gap: 3rem;
  > div {
    flex: 1;
  }
`

const OrderList = styled.section`
  display: flex;
  flex-direction: column;
`

const CostContainer = styled.section`
  position: sticky;
  height: fit-content;
  top: 10rem;
  padding-top: 5rem;
  flex: 0 0 30rem;
  padding: 2rem;
  border: 1px solid var(--color-main);
`

const Cost = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: var(--color-text-main);
`

const PurchaseCost = styled(Cost)`
  font-weight: bold;
  padding: 2rem 0;
  line-height: var(--font-size-emphasis);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  color: initial;
  :last-child {
    color: var(--color-main);
    font-size: var(--font-size-emphasis);
  }
`

const PurchaseButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: var(--color-main);
  border-radius: 5px;
  color: white;
`

const OrderMain = () => {
  const {orderId} = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState([])
  const [token, setToken] = useRecoilState(tokenState)
  const [totalCost, setTotalCost] = useState(0)
  const [deliveryFee, setDeliveryFee] = useState(0)
  useEffect(() => {
    const getTempOrder = async () => {
      try {
        const result = await getTempOrderAPI(token, orderId)
        if (result.data.accessToken) setToken(result.data.accessToken)
        if (result.data.success) {
          setOrder(result.data.order)
        } else {
          navigate(-1)
        }
      } catch {}
    }
    getTempOrder()
  }, [orderId, token, setToken, navigate])

  useEffect(() => {
    if (order.length === 0) return
    const cost = order.reduce((acc, item) => {
      return acc + item.count * calculateSaleCost(item.cost, item.rate)
    }, 0)
    if (cost < 30000) setDeliveryFee(3000)
    setTotalCost(cost)
  }, [order])

  return (
    <Container>
      <h2>주문/결제</h2>
      <OrderContainer>
        <div>
          <OrderForm />
          <OrderList>
            <h3>주문상품</h3>
            <ul>
              {order.length
                ? order.map((item) => {
                    return (
                      <OrderListItem
                        order={item}
                        key={item._id}
                      />
                    )
                  })
                : Array.from({length: 5}).map((_, i) => {
                    return <SkeletonOrderListItem key={i} />
                  })}
            </ul>
          </OrderList>
        </div>
        <CostContainer>
          <h3>결제금액</h3>
          <Cost>
            <p>총 금액</p>
            <p>{formatCostWithComma(totalCost)}원</p>
          </Cost>
          <Cost>
            <p>배송비</p>
            <p>{formatCostWithComma(deliveryFee)}원</p>
          </Cost>
          <PurchaseCost>
            <p>최종 결제 금액</p>
            <p>{formatCostWithComma(totalCost + deliveryFee)}원</p>
          </PurchaseCost>
          <PurchaseButton>구매하기</PurchaseButton>
        </CostContainer>
      </OrderContainer>
    </Container>
  )
}

export default OrderMain
