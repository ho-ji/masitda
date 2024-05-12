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
    console.log(updatedCartList, id, count)
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
