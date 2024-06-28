import {instance, setAuthToken} from 'api'

export const postLogInAPI = async (account, password) => {
  const uid = localStorage.getItem('uid')
  try {
    const result = await instance.post(`/user/login/${uid}`, {
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

export const getUserInformationAPI = async (accessToken) => {
  const uid = localStorage.getItem('uid')
  setAuthToken(accessToken)
  try {
    const result = await instance.get(`/user/${uid}`)
    return result
  } catch (error) {
    throw error
  }
}

export const getVerifyTokenAPI = async (accessToken) => {
  const uid = localStorage.getItem('uid')
  setAuthToken(accessToken)
  try {
    const result = await instance.get(`/user/login/${uid}`)
    return result
  } catch (error) {
    throw error
  }
}

export const deleteLogOutAPI = async () => {
  const uid = localStorage.getItem('uid')
  try {
    const result = await instance.delete(`/user/logout/${uid}`)
    return result
  } catch (error) {
    throw error
  }
}
