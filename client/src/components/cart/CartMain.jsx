import {useEffect, useState} from 'react'
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil'
import styled from 'styled-components'

import {deleleCartProductAPI, getCartListAPI} from 'api/cart'
import {cartListState} from 'recoil/cart/atom'
import checkImage from 'assets/images/check.svg'
import CartTable from './CartTable'
import {deleteMultipleSelector, getSelectedIdListSelector, updateAllSelectSelector} from 'recoil/cart/selector'
import useModal from 'hooks/useModal'
import CartCost from './CartCost'
import CartPurchase from './CartPurchase'

const Container = styled.main`
  margin: 5rem auto;
  padding: 0 10rem;
  max-width: 150rem;
  min-height: 30rem;
`

const CartHeader = styled.div`
  display: flex;
  gap: 1rem;
  align-items: baseline;
  > h2 {
    font-weight: bold;
    font-size: var(--font-size-emphasis);
  }
`

const SelectContainer = styled.div`
  display: flex;
  margin: 3rem 0;
  color: var(--color-text-main);
  > label {
    margin-right: 2rem;
    > input {
      margin-right: 1rem;
      float: left;
      appearance: none;
      border: 1px solid var(--color-gray);
      width: 2.5rem;
      height: 2.5rem;
      &:checked {
        background: url(${checkImage}) no-repeat center/2rem;
        background-color: var(--color-main);
      }
    }
    &::after {
      content: '';
      display: inline-block;
      width: 1px;
      height: 2rem;
      background-color: var(--color-gray);
      margin-left: 2rem;
      vertical-align: middle;
    }
  }
`

const NoItem = styled.p`
  width: 100%;
  padding: 10rem 0;
  margin-top: 3rem;
  text-align: center;
  color: var(--color-text-sub);
  font-size: var(--font-size-primary);
  background: #f7f7f7;
`

const ErrorItem = styled(NoItem)`
  position: relative;
  overflow: hidden;
  background-color: #eee;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 200%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
    animation: wave 2.5s infinite;
  }
  @keyframes wave {
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(100%);
    }
  }
`

const CartMain = () => {
  const [cartList, setCartList] = useRecoilState(cartListState)
  const updateAllSelect = useSetRecoilState(updateAllSelectSelector)
  const selectedIdList = useRecoilValue(getSelectedIdListSelector)
  const deleteMultiple = useSetRecoilState(deleteMultipleSelector)
  const [isAllSelect, setIsAllSelect] = useState(true)
  const {updateModal, openModal} = useModal()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleAllSelectChange = (e) => {
    updateAllSelect(e.target.checked)
    setIsAllSelect(e.target.checked)
  }

  const deleteSelectedProduct = async () => {
    try {
      await deleleCartProductAPI(selectedIdList)
      deleteMultiple()
    } catch (error) {}
  }

  const handleDeleteClick = () => {
    updateModal('delete', deleteSelectedProduct)
    openModal()
  }

  useEffect(() => {
    const getCartList = async () => {
      try {
        setLoading(true)
        const result = await getCartListAPI()
        setCartList(result.data)
        setLoading(false)
      } catch (error) {
        setError(true)
      }
    }
    getCartList()
  }, [setCartList])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Container>
      <CartHeader>
        <h2>장바구니</h2>
        <span>{`상품 (${loading ? '' : cartList.length})`}</span>
        <span className="a11y-hidden">개</span>
      </CartHeader>
      {!error ? (
        !loading && cartList.length !== 0 ? (
          <>
            <SelectContainer>
              <label>
                <input
                  type="checkbox"
                  checked={isAllSelect}
                  onChange={handleAllSelectChange}></input>
                전체선택
              </label>
              <button
                type="button"
                onClick={handleDeleteClick}>
                선택삭제
              </button>
            </SelectContainer>
            <CartTable />
            <CartCost />
            <CartPurchase />
          </>
        ) : (
          !loading && <NoItem>장바구니가 비어 있습니다</NoItem>
        )
      ) : (
        <ErrorItem />
      )}
    </Container>
  )
}

export default CartMain
