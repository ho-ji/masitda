import {instance, setAuthToken} from 'api'

export const postOrderAPI = async ({accessToken, orderId, name, contactNumber, address}) => {
  const uid = localStorage.getItem('uid')
  setAuthToken(accessToken)
  try {
    const result = await instance.post(`/order/${uid}`, {
      orderId,
      name,
      contactNumber,
      address,
    })
    return result
  } catch (error) {
    throw error
  }
}

export const getOrderAPI = async (accessToken, page) => {
  const uid = localStorage.getItem('uid')
  setAuthToken(accessToken)
  try {
    const result = await instance.get(`/order/${uid}?page=${page}`)
    return result
  } catch (error) {
    throw error
  }
}

export const getRecentOrderAPI = async (accessToken) => {
  const uid = localStorage.getItem('uid')
  setAuthToken(accessToken)
  try {
    const result = await instance.get(`/order/recent/${uid}`)
    return result
  } catch (error) {
    throw error
  }
}
