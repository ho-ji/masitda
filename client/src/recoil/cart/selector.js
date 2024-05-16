import {selector} from 'recoil'

import {cartListState} from './atom'

export const updateCountSelector = selector({
  key: 'updateCountSelector',
  get: ({get}) => get(cartListState),
  set: ({get, set}, v) => {
    const {id, count} = v
    const currentCartList = get(cartListState)
    const indexToUpdate = currentCartList.findIndex((item) => item.product._id === id)
    const updatedCartList = [...currentCartList]
    if (indexToUpdate === -1) {
      updatedCartList.push({product: {_id: id}, count: 1})
    } else {
      updatedCartList[indexToUpdate] = {
        ...updatedCartList[indexToUpdate],
        count: updatedCartList[indexToUpdate].count + count,
      }
    }
    set(cartListState, updatedCartList)
  },
})

export const updateAllSelectSelector = selector({
  key: 'updateAllSelect',
  get: ({get}) => get(cartListState),
  set: ({get, set}, isSelected) => {
    const currentCartList = get(cartListState)
    const updatedCartList = currentCartList.map((item) => ({...item, isSelected: isSelected}))

    set(cartListState, updatedCartList)
  },
})

export const updateSelectSelector = selector({
  key: 'updateSelect',
  get: ({get}) => get(cartListState),
  set: ({get, set}, v) => {
    const {id, isSelected} = v
    const currentCartList = get(cartListState)
    const indexToUpdate = currentCartList.findIndex((item) => item.product._id === id)
    const updatedCartList = [...currentCartList]
    updatedCartList[indexToUpdate] = {
      ...updatedCartList[indexToUpdate],
      isSelected: isSelected,
    }
    set(cartListState, updatedCartList)
  },
})

export const deleteMultipleSelector = selector({
  key: 'deleteMultiple',
  get: ({get}) => get(cartListState),
  set: ({get, set}) => {
    const currentCartList = get(cartListState)
    const updatedCartList = currentCartList.filter((item) => item.isSelected === false)
    set(cartListState, updatedCartList)
  },
})

export const getSelectedIdListSelector = selector({
  key: 'getSelectedIdList',
  get: ({get}) => {
    const currentCartList = get(cartListState)
    const selectedList = currentCartList.filter((item) => item.isSelected !== false).map((item) => item.product._id)
    return selectedList
  },
})

export const deleteOneSelector = selector({
  key: 'deleteOneProduct',
  get: ({get}) => get(cartListState),
  set: ({get, set}, id) => {
    const currentCartList = get(cartListState)
    const updatedCartList = currentCartList.filter((item) => item.product._id !== id)
    set(cartListState, updatedCartList)
  },
})
