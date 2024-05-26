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

export const getCheckUserIdAPI = async (userId) => {
  try {
    const result = await instance.get(`/user/check/${userId}
    `)
    return result
  } catch (error) {
    console.error(error)
  }
}

export const postSignUpAPI = async ({info}) => {
  try {
    const result = await instance.post('/user/signup', {
      info,
    })
    return result
  } catch (error) {
    console.error(error)
  }
}
