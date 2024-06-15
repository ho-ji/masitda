import {instance, setAuthToken} from 'api'

export const postCartProductAPI = async ({productId, count, accessToken}) => {
  const uid = localStorage.getItem('uid')
  setAuthToken(accessToken)
  try {
    const result = await instance.post(`/cart/${uid}`, {
      productId,
      count,
    })
    return result
  } catch (error) {
    throw error
  }
}

export const getCartListAPI = async (accessToken) => {
  const uid = localStorage.getItem('uid')
  setAuthToken(accessToken)
  try {
    const result = await instance.get(`/cart/${uid}`)
    return result
  } catch (error) {
    throw error
  }
}

export const deleleCartProductAPI = async (idList, accessToken) => {
  const uid = localStorage.getItem('uid')
  setAuthToken(accessToken)
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
