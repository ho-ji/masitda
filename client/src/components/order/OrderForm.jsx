import styled from 'styled-components'
import {useState} from 'react'

import useInput from 'hooks/useInput'

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
  > select {
    margin-right: 1rem;
  }
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

const OrderForm = ({formRef}) => {
  const {value: name, handler: handleName} = useInput()
  const {value: contactNumber, handler: handleContactNumber} = useInput()
  const {value: detailAddress, handler: handleDetailAdress} = useInput()
  const [zonecode, setZonecode] = useState('')
  const [roadAddress, setRoadAddress] = useState('')

  const handleContactNumberChange = (e) => {
    const inputValue = e.target.value
    if (/^\d*$/.test(inputValue)) handleContactNumber(e)
  }

  const handleAddressSearchClick = () => {
    new window.daum.Postcode({
      oncomplete: (data) => {
        setRoadAddress(data.roadAddress)
        setZonecode(data.zonecode)
      },
    }).open()
  }

  return (
    <Container ref={formRef}>
      <h3>배송지</h3>
      <InputContainer>
        <label htmlFor="delivery-name">배송지명</label>
        <input
          type="text"
          placeholder="최대 10자"
          id="delivery-name"
          maxLength="10"
          value={name}
          onChange={handleName}
          name="name"></input>
      </InputContainer>
      <InputContainer>
        <label htmlFor="contact-number">연락처</label>
        <select name="contactNumber1">
          <option value="010">010</option>
          <option value="011">011</option>
          <option value="016">016</option>
          <option value="017">017</option>
          <option value="018">018</option>
          <option value="019">019</option>
        </select>
        <input
          type="tel"
          maxLength="8"
          id="contact-number"
          value={contactNumber}
          onChange={handleContactNumberChange}
          name="contactNumber2"></input>
      </InputContainer>
      <AddressContainer>
        <div>
          <label>배송지</label>
          <input
            type="text"
            disabled
            name="zonecode"
            value={zonecode}></input>
          <AddressSearch
            type="button"
            onClick={handleAddressSearchClick}>
            주소 검색
          </AddressSearch>
        </div>
        <input
          type="text"
          disabled
          name="roadAddress"
          value={roadAddress}></input>
        <input
          type="text"
          placeholder="상세주소 입력"
          value={detailAddress}
          maxLength="50"
          onChange={handleDetailAdress}
          name="detailAddress"></input>
      </AddressContainer>
    </Container>
  )
}

export default OrderForm
