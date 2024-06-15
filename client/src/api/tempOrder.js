import {instance, setAuthToken} from 'api'

export const postTempOrderAPI = async ({accessToken, order}) => {
  const uid = localStorage.getItem('uid')
  setAuthToken(accessToken)
  try {
    const result = await instance.post(`/temporder/${uid}`, {
      order,
    })
    return result
  } catch (error) {
    throw error
  }
}

export const getTempOrderAPI = async (accessToken, orderId) => {
  const uid = localStorage.getItem('uid')
  setAuthToken(accessToken)
  try {
    const result = await instance.get(`/temporder/${uid}?temp=${orderId}`)
    return result
  } catch (error) {
    throw error
  }
}
