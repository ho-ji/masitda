import instance from 'api'

export const postCartProductAPI = async ({productId, count, accessToken}) => {
  const uid = localStorage.getItem('uid')
  try {
    const result = await instance.post(
      `/cart/${uid}`,
      {
        productId,
        count,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }
    )
    return result
  } catch (error) {
    throw error
  }
}

export const getCartListAPI = async (accessToken) => {
  const uid = localStorage.getItem('uid')
  try {
    const result = await instance.get(`/cart/${uid}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    })
    return result
  } catch (error) {
    throw error
  }
}

export const deleleCartProductAPI = async (idList, accessToken) => {
  const uid = localStorage.getItem('uid')
  try {
    const result = await instance.delete(`/cart/${uid}`, {
      data: {
        productId: idList,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    })
    return result
  } catch (error) {
    throw error
  }
}
