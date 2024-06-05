import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import Layout from 'components/common/Layout'
import UserInformation from 'components/user/UserInformation'
import useCheckLogIn from 'hooks/useCheckLogIn'

const User = () => {
  const isLogIn = useCheckLogIn()
  const navigator = useNavigate()

  useEffect(() => {
    if (!isLogIn) navigator('/login')
  }, [isLogIn, navigator])

  return (
    <Layout>
      <UserInformation />
    </Layout>
  )
}

export default User
