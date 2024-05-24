import {Link} from 'react-router-dom'
import styled from 'styled-components'

const UserLink = styled(Link)`
  color: var(--color-text-sub);
  font-size: var(--font-size-subtext);
  &:not(:last-child) {
    margin-right: 1rem;
    &::after {
      content: '';
      display: inline-block;
      width: 1px;
      height: 1rem;
      background-color: var(--color-gray);
      margin-left: 1rem;
      vertical-align: middle;
    }
  }
`

const LogInNav = () => {
  return (
    <nav>
      <UserLink to="/findIdPw">아이디 찾기</UserLink>
      <UserLink to="/findIdPw">비밀번호 찾기</UserLink>
      <UserLink to="/signup">회원가입</UserLink>
    </nav>
  )
}

export default LogInNav
