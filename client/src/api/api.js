import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:4500/api',
})

export const getBestListAPI = async () => {
  try {
    const result = await instance.get('/product/ranking')
    return result
  } catch (error) {
    console.error(error)
  }
}

export const getTopListAPI = async () => {
  try {
    const result = await instance.get('/product/top')
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
      product_id: _id,
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

export const getCartCountAPI = async () => {
  const uid = localStorage.getItem('uid')
  try {
    const result = await instance.get(`/cart/${uid}/count`)
    return result
  } catch (error) {
    console.error(error)
  }
}
