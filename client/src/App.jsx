import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from 'pages/Home'
import GlobalStyle from 'styles/GlobalStyle'
import 'styles/globalFont.css'
import Cart from 'pages/Cart'
import User from 'pages/User'
import NotFound from 'pages/NotFound'

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route
          path="/"
          element={<Home />}
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
  )
}
export default App
