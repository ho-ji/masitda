import instance from 'api'

export const postLoginAPI = async (userId, password) => {
  try {
    const result = await instance.post('/user/login', {
      userId,
      password,
    })
    return result
  } catch (error) {
    throw error
  }
}
