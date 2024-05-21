import {useEffect, useState} from 'react'
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil'
import styled from 'styled-components'

import {deleleCartProductAPI, getCartListAPI} from 'api/api'
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
  }
  > button {
    padding-left: 2rem;
    &::before {
      content: '';
      display: inline-block;
      width: 1px;
      height: 2rem;
      background-color: var(--color-gray);
      margin-right: 2rem;
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

const CartMain = () => {
  const [cartList, setCartList] = useRecoilState(cartListState)
  const updateAllSelect = useSetRecoilState(updateAllSelectSelector)
  const selectedIdList = useRecoilValue(getSelectedIdListSelector)
  const deleteMultiple = useSetRecoilState(deleteMultipleSelector)
  const [isAllSelect, setIsAllSelect] = useState(true)
  const {updateModal, openModal} = useModal()

  const handleAllSelectChange = (e) => {
    updateAllSelect(e.target.checked)
    setIsAllSelect(e.target.checked)
  }

  const deleteSelectedProduct = async () => {
    try {
      await deleleCartProductAPI(selectedIdList)
      deleteMultiple()
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteClick = () => {
    updateModal('delete', deleteSelectedProduct)
    openModal()
  }

  useEffect(() => {
    const getCartList = async () => {
      try {
        const result = await getCartListAPI()
        setCartList(result.data)
      } catch (error) {
        console.error(error)
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
        <span>{`상품 (${cartList.length})`}</span>
        <span className="a11y-hidden">개</span>
      </CartHeader>
      {cartList.length ? (
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
        <NoItem>장바구니가 비어 있습니다</NoItem>
      )}
    </Container>
  )
}

export default CartMain
