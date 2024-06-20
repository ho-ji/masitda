import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;

  > ul {
    display: flex;
    flex-direction: column;
  }
`

const OrderList = ({title, children}) => {
  return (
    <Container>
      <h3>{title}</h3>
      <ul>{children}</ul>
    </Container>
  )
}

export default OrderList
