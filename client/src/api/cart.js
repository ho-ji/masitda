import instance from 'api'

export const postCartProductAPI = async (_id, count) => {
  const uid = localStorage.getItem('uid')
  try {
    const result = await instance.post(`/cart/${uid}`, {
      productId: _id,
      count: count,
    })
    return result
  } catch (error) {
    throw error
  }
}

export const getCartListAPI = async () => {
  const uid = localStorage.getItem('uid')
  try {
    const result = await instance.get(`/cart/${uid}`)
    return result
  } catch (error) {
    throw error
  }
}

export const deleleCartProductAPI = async (idList) => {
  const uid = localStorage.getItem('uid')
  try {
    const result = await instance.delete(`/cart/${uid}`, {
      data: {
        productId: idList,
      },
    })
    return result
  } catch (error) {
    throw error
  }
}
