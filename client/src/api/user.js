import instance from 'api'

export const postLoginAPI = async (account, password) => {
  try {
    const result = await instance.post(
      '/user/login',
      {
        account,
        password,
      },
      {
        withCredentials: true,
      }
    )
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
  try {
    const result = await instance.get(`/user/${uid}`, {
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

export const getVerifyTokenAPI = async (accessToken) => {
  const uid = localStorage.getItem('uid')
  try {
    const result = await instance.get(`/user/login/${uid}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    })
    return result
  } catch (error) {
    console.log(error)
    throw error
  }
}
