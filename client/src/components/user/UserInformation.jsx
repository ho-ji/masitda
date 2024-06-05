import {getUserInformationAPI} from 'api/user'
import {useEffect} from 'react'
import {useRecoilValue} from 'recoil'
import {tokenState} from 'recoil/token/atom'

const UserInformation = () => {
  const token = useRecoilValue(tokenState)

  useEffect(() => {
    const getUserInformation = async () => {
      try {
        const result = await getUserInformationAPI(token)
        console.log(result)
      } catch (error) {
        console.error(error)
      }
    }
    getUserInformation()
  }, [token])
  return <div></div>
}

export default UserInformation
