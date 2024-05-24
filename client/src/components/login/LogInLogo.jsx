import {Link} from 'react-router-dom'
import styled from 'styled-components'

import logoImage from 'assets/images/logo.png'

const Logo = styled(Link)`
  display: block;
  width: 15rem;
  aspect-ratio: 2/1;
  background: url(${logoImage}) no-repeat center/contain;
  margin-bottom: 3rem;
`

const LogInLogo = () => {
  return <Logo to="/"></Logo>
}

export default LogInLogo
