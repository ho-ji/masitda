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

export const deleleMultipleCartProductAPI = async (idList) => {
  const uid = localStorage.getItem('uid')
  try {
    const result = await instance.delete(`/cart/${uid}/deletemultiple`, {
      data: {
        product_ids: idList,
      },
    })
    return result
  } catch (error) {
    console.error(error)
  }
}

export const deleleCartProductAPI = async (id) => {
  const uid = localStorage.getItem('uid')
  try {
    const result = await instance.delete(`/cart/${uid}/delete`, {
      data: {
        product_id: id,
      },
    })
    return result
  } catch (error) {
    console.error(error)
  }
}
