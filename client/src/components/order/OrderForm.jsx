import styled from 'styled-components'

const Container = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
  select,
  input {
    padding: 0 1rem;
    border: 1px solid var(--color-border);
    border-color: ${(props) => props.$error === true && 'var(--color-red)'};
    border-radius: 5px;
    height: 3.5rem;
    &:focus {
      outline: none;
      box-shadow: 0 0 0 1px rgba(255, 152, 0, 0.5);
    }
  }
  label {
    width: 7rem;
    color: var(--color-text-main);
  }
  > div {
    padding: 2rem;
    border-bottom: 1px solid var(--color-border);
  }
`

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  > div {
    display: flex;
    align-items: center;
  }
`

const AddressSearch = styled.button`
  margin-left: 2rem;
  color: white;
  background-color: var(--color-main);
  border-radius: 5px;
  padding: 0.5rem 1rem;
`

const OrderForm = () => {
  return (
    <Container>
      <h3>배송지</h3>
      <InputContainer>
        <label for="delivery-name">배송지명</label>
        <input
          type="text"
          placeholder="최대 10자"
          id="delivery-name"
          maxLength="10"></input>
      </InputContainer>
      <InputContainer>
        <label>연락처</label>
        <select>
          <option value="010">010</option>
          <option value="011">011</option>
          <option value="016">016</option>
          <option value="017">017</option>
          <option value="018">018</option>
          <option value="019">019</option>
        </select>
        <input type="text"></input>
      </InputContainer>
      <AddressContainer>
        <div>
          <label for="delivery-address">배송지</label>
          <input
            type="text"
            disabled></input>
          <AddressSearch type="button">주소 검색</AddressSearch>
        </div>
        <input
          type="text"
          disabled></input>
        <input
          type="text"
          disabled></input>
        <input
          type="text"
          placeholder="상세주소 입력"
          id="delivery-address"></input>
      </AddressContainer>
    </Container>
  )
}

export default OrderForm
