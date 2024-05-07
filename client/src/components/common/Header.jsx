import styled from 'styled-components'
import {Link} from 'react-router-dom'

import logoImage from 'assets/images/logo.png'
import cartImage from 'assets/images/cart.svg'
import userImage from 'assets/images/user.svg'

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
  height: 5rem;
  background: url(${logoImage}) no-repeat center/contain;
`

const MenuLink = styled(Link)`
  padding: 1rem;
  border-radius: 50%;
  margin: 0 0.5rem;
`

const MenuImage = styled.img`
  height: 2.5rem;
`

const Header = () => {
  const handleLogoClick = () => {
    window.scrollTo(0, 0)
  }
  return (
    <Container>
      <h1>
        <span className="a11y-hidden">마싯다 로고</span>
        <Logo
          to="/"
          onClick={handleLogoClick}></Logo>
      </h1>
      <nav>
        <MenuLink to="/cart">
          <MenuImage
            src={cartImage}
            alt="장바구니"
          />
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
