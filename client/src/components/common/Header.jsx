import styled from 'styled-components'
import {Link, useLocation} from 'react-router-dom'
import {useRecoilState} from 'recoil'
import {useEffect, useState} from 'react'

import logoImage from 'assets/images/logo.png'
import cartImage from 'assets/images/cart.svg'
import userImage from 'assets/images/user.svg'
import {cartListState} from 'recoil/cart/atom'
import {getCartListAPI} from 'api/cart'

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  height: 7rem;
  padding: 0 2rem;
  z-index: 100;
  background-color: white;
  border-bottom: 1px solid var(--color-border);
`
const Logo = styled(Link)`
  display: block;
  width: 10rem;
  aspect-ratio: 2/1;
  background: url(${logoImage}) no-repeat center/contain;
`

const MenuLink = styled(Link)`
  padding: 1rem;
  border-radius: 50%;
  margin: 0 0.5rem;
  position: relative;
`

const MenuImage = styled.img`
  height: 2.5rem;
`

const CartCount = styled.strong`
  width: 1.6rem;
  height: 1.6rem;
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  border-radius: 50%;
  font-size: 1rem;
  color: white;
  line-height: 1.6rem;
  text-align: center;
  font-weight: bold;
  overflow: hidden;
  background-color: var(--color-main);
`

const Header = () => {
  const [cartList, setCartList] = useRecoilState(cartListState)
  const [error, setError] = useState(false)
  const location = useLocation()

  const handleLogoClick = () => {
    if (location.pathname === '/') window.location.reload()
    window.scrollTo(0, 0)
  }

  const handleCartClick = () => {
    if (location.pathname === '/cart') window.location.reload()
  }

  useEffect(() => {
    const getCartCount = async () => {
      try {
        const result = await getCartListAPI()
        setCartList(result.data)
      } catch (error) {
        setError(true)
      }
    }
    getCartCount()
  }, [setCartList])

  return (
    <Container>
      <h1>
        <span className="a11y-hidden">마싯다 로고</span>
        <Logo
          to="/"
          onClick={handleLogoClick}></Logo>
      </h1>
      <nav>
        <MenuLink
          to="/cart"
          onClick={handleCartClick}>
          <MenuImage
            src={cartImage}
            alt="장바구니"
          />
          <CartCount>
            {!error ? (cartList.length >= 100 ? '99+' : cartList.length) : ' '}
            <span className="a11y-hidden">개</span>
          </CartCount>
        </MenuLink>
        <MenuLink to="/user">
          <MenuImage
            src={userImage}
            alt="마이페이지"
          />
        </MenuLink>
      </nav>
    </Container>
  )
}

export default Header
