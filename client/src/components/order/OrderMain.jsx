import {useNavigate, useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {useRecoilState} from 'recoil'
import styled from 'styled-components'

import {tokenState} from 'recoil/token/atom'
import {getTempOrderAPI} from 'api/tempOrder'
import OrderList from 'components/common/order/OrderList'
import SkeletonOrderListItem from 'components/common/order/SkeletonOrderListItem'
import OrderListItem from 'components/common/order/OrderListItem'

const Container = styled.main``

const OrderMain = () => {
  const {orderId} = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState([])
  const [token, setToken] = useRecoilState(tokenState)
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

  return (
    <Container>
      <h2>주문목록</h2>
      <OrderList>
        {order.length
          ? order.map((item) => {
              return <OrderListItem order={item} />
            })
          : Array.from({length: 5}).map(() => {
              return <SkeletonOrderListItem />
            })}
      </OrderList>
    </Container>
  )
}

export default OrderMain
