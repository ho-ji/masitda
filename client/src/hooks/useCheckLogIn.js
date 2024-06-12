import {getVerifyTokenAPI} from 'api/user'
import {useRecoilState} from 'recoil'
import {tokenState} from 'recoil/token/atom'

const useCheckLogIn = () => {
  const [token, setToken] = useRecoilState(tokenState)

  const checkLogin = async () => {
    try {
      if (localStorage.getItem('uid').startsWith('guest')) return false
      if (token === '') {
        const result = await getVerifyTokenAPI(token)
        if (result.data.success) setToken(result.data.accessToken)
        return result.data.success
      }
      return true
    } catch (error) {
      setToken('')
    }
  }

  return checkLogin
}

export default useCheckLogIn
