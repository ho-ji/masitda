import instance from 'api'

export const postLoginAPI = async (account, password) => {
  try {
    const result = await instance.post('/user/login', {
      account,
      password,
    })
    return result
  } catch (error) {
    throw error
  }
}

export const getCheckAccountAPI = async (account) => {
  try {
    const result = await instance.get(`/user/check/${account}
    `)
    return result
  } catch (error) {
    throw error
  }
}

export const postSignUpAPI = async (info) => {
  try {
    const result = await instance.post('/user/signup', {
      info,
    })
    return result
  } catch (error) {
    throw error
  }
}
