import {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {useRecoilState} from 'recoil'

import {calculateSaleCost, formatCostWithComma} from 'utils/cost'
import OrderForm from './OrderForm'
import OrderList from './OrderList'
import {tokenState} from 'recoil/token/atom'
import {useNavigate, useParams} from 'react-router-dom'
import {postOrderAPI} from 'api/order'

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
  margin-top: 1rem;
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
  const [order, setOrder] = useState([])
  const [totalCost, setTotalCost] = useState(0)
  const [deliveryFee, setDeliveryFee] = useState(0)
  const formRef = useRef(null)
  const [token, setToken] = useRecoilState(tokenState)
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (order.length === 0) return
    const cost = order.reduce((acc, item) => {
      return acc + item.count * calculateSaleCost(item.cost, item.rate)
    }, 0)
    if (cost < 30000) setDeliveryFee(3000)
    setTotalCost(cost)
  }, [order])

  const postOrder = async (value) => {
    try {
      const result = await postOrderAPI({...value, accessToken: token, orderId})
      if (result.data.success) {
        if (result.data.accessToken) setToken(result.data.accessToken)
        navigate('./complete-splash', {
          replace: true,
          state: {length: order.length, complete: true},
        })
      }
    } catch {}
  }

  const handlePurchaseClick = () => {
    const {name, contactNumber1, contactNumber2, zonecode, roadAddress, detailAddress} = formRef.current
    if (name.value === '') return alert('배송지명을 입력해주세요')
    if (contactNumber2.value.length < 7) return alert('연락처를 입력해주세요')
    if (zonecode.value === '' || detailAddress.value === '') return alert('배송지를 입력해주세요')

    const deliveryData = {
      name: name.value,
      contactNumber: contactNumber1.value + contactNumber2.value,
      address: {zonecode: zonecode.value, roadAddress: roadAddress.value, detailAddress: detailAddress.value},
    }
    postOrder(deliveryData)
  }

  return (
    <Container>
      <h2>주문/결제</h2>
      <OrderContainer>
        <div>
          <OrderForm formRef={formRef} />
          <OrderList
            order={order}
            setOrder={setOrder}
          />
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
          <PurchaseButton onClick={handlePurchaseClick}>구매하기</PurchaseButton>
        </CostContainer>
      </OrderContainer>
    </Container>
  )
}

export default OrderMain
