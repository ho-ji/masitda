import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {RecoilRoot} from 'recoil'
import {v4 as uuidv4} from 'uuid'
import {useEffect} from 'react'

import Home from 'pages/Home'
import GlobalStyle from 'styles/GlobalStyle'
import 'styles/globalFont.css'
import Cart from 'pages/Cart'
import User from 'pages/User'
import NotFound from 'pages/NotFound'
import Best from 'pages/Best'
import MDPick from 'pages/MDPick'

const checkUID = () => {
  if (!localStorage.getItem('uid')) {
    localStorage.setItem('uid', uuidv4())
  }
}

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
            path="/*"
            element={<NotFound />}
          />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}
export default App
