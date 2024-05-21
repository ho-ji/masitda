import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:4500/api',
})

export const getBestListAPI = async (limit) => {
  try {
    const result = await instance.get(`/product/ranking?limit=${limit}`)
    return result
  } catch (error) {
    console.error(error)
  }
}

export const getMDPickListAPI = async (limit) => {
  try {
    const result = await instance.get(`/mdpick?limit=${limit}`)
    return result
  } catch (error) {
    console.error(error)
  }
}

export const postCartProductAPI = async (_id, count) => {
  const uid = localStorage.getItem('uid')
  try {
    const result = await instance.post(`/cart/${uid}`, {
      productId: _id,
      count: count,
    })
    return result
  } catch (error) {
    console.error(error)
  }
}

export const getCartListAPI = async () => {
  const uid = localStorage.getItem('uid')
  try {
    const result = await instance.get(`/cart/${uid}`)
    return result
  } catch (error) {
    console.error(error)
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
    console.error(error)
  }
}
