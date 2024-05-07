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
