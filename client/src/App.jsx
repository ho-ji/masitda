import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {RecoilRoot} from 'recoil'
import {useEffect} from 'react'

import GlobalStyle from 'styles/GlobalStyle'
import Home from 'pages/Home'
import 'styles/globalFont.css'
import Cart from 'pages/Cart'
import User from 'pages/User'
import NotFound from 'pages/NotFound'
import Best from 'pages/Best'
import MDPick from 'pages/MDPick'
import LogIn from 'pages/LogIn'
import SignUp from 'pages/SignUp'
import Order from 'pages/Order'
import {checkUID} from 'utils/uid'
import CompleteSplash from 'pages/CompleteSplash'

const App = () => {
  useEffect(() => {
    checkUID()
  }, [])

  return (
    <RecoilRoot>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/best"
            element={<Best />}
          />
          <Route
            path="/mdpick"
            element={<MDPick />}
          />
          <Route
            path="/cart"
            element={<Cart />}
          />
          <Route
            path="/user"
            element={<User />}
          />
          <Route
            path="/login"
            element={<LogIn />}
          />
          <Route
            path="/signup"
            element={<SignUp />}
          />
          <Route
            path="/order/:orderId"
            element={<Order />}
          />
          <Route
            path="/order/:orderId/complete-splash"
            element={<CompleteSplash />}
          />
          <Route
            path="/*"
            element={<NotFound />}
          />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}
export default App
