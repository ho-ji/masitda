import {getVerifyTokenAPI} from 'api/user'
import {useRecoilState} from 'recoil'
import {tokenState} from 'recoil/token/atom'

const useCheckLogIn = () => {
  const [token, setToken] = useRecoilState(tokenState)

  const checkLogin = async () => {
    try {
      const result = await getVerifyTokenAPI(token)
      setToken(result.data.accessToken)
      return result.data.success
    } catch (error) {
      setToken('')
    }
  }

  return checkLogin
}

export default useCheckLogIn
