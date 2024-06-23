import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'

import LogInForm from 'components/login/LogInForm'
import LogInNav from 'components/login/LogInNav'
import AuthLayout from 'components/common/AuthLayout'
import useCheckLogIn from 'hooks/useCheckLogIn'

const LogIn = () => {
  const checkLogIn = useCheckLogIn()
  const navigate = useNavigate()
  const [loadingLogIn, setLoadingLogIn] = useState(false)

  useEffect(() => {
    const check = async () => {
      const isLogIn = await checkLogIn()
      if (isLogIn) navigate('/user')
      else setLoadingLogIn(true)
    }
    check()
  }, [checkLogIn, navigate])

  return (
    <>
      {loadingLogIn && (
        <AuthLayout>
          <LogInForm />
          <LogInNav />
        </AuthLayout>
      )}
    </>
  )
}

export default LogIn
