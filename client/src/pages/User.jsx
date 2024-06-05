import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import Layout from 'components/common/Layout'
import UserInformation from 'components/user/UserInformation'
import useCheckLogIn from 'hooks/useCheckLogIn'

const User = () => {
  const checkLogIn = useCheckLogIn()
  const navigate = useNavigate()
  const [loadingLogIn, setLoadingLogIn] = useState(false)

  useEffect(() => {
    const check = async () => {
      const isLogin = await checkLogIn()
      if (!isLogin) navigate('/login')
      else setLoadingLogIn(true)
    }
    check()
  }, [checkLogIn, navigate])

  return (
    <>
      {loadingLogIn && (
        <Layout>
          <UserInformation />
        </Layout>
      )}
    </>
  )
}

export default User
