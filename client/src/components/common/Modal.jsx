import {useEffect} from 'react'
import styled from 'styled-components'

import closeImage from 'assets/images/close.svg'

const Dialog = styled.dialog`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  border: none;
  padding: 0;
  background-color: rgba(0, 0, 0, 0.5);
`

const Container = styled.div`
  background-color: #fff;
  padding: 3rem;
  width: 50rem;
  border-radius: 10px;
  position: relative;
`
const Title = styled.h3`
  font-weight: bold;
  font-size: var(--font-size-secondary);
`

const Text = styled.p`
  margin-top: 3rem;
  text-align: center;
`
const SubText = styled.p`
  margin-bottom: 4rem;
  text-align: center;
  color: var(--color-text-sub);
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`

const Button = styled.button`
  color: white;
  padding: 1rem 2rem;
  border-radius: 5px;
`
const CancelButton = styled(Button)`
  background-color: #aaa;
`
const OkButton = styled(Button)`
  background-color: var(--color-main);
`
const CloseButton = styled.button`
  width: 4rem;
  height: 4rem;
  background: url(${closeImage}) no-repeat center/3rem;
  position: absolute;
  top: 2rem;
  right: 3rem;
`

const preventScroll = () => {
  const currentScrollY = window.scrollY
  document.body.style.position = 'fixed'
  document.body.style.width = '100%'
  document.body.style.top = `-${currentScrollY}px`
  document.body.style.overflowY = 'scroll'
  return currentScrollY
}

const allowScroll = (prevScroll) => {
  document.body.style.position = ''
  document.body.style.width = ''
  document.body.style.top = ''
  document.body.style.overflowY = ''
  window.scrollTo(0, prevScroll)
}

const Modal = ({close, title, text, subText, okButtonText, cancelButtonText, handleOkClick, handleCancelClick}) => {
  const handleOutsideClick = (e) => {
    if (e.target.nodeName === 'DIALOG') close()
  }

  const handleEscapeKeyDown = (e) => {
    if (e.key === 'Escape') {
      close()
      e.target.blur()
    }
  }

  useEffect(() => {
    const prevScroll = preventScroll()
    document.addEventListener('keydown', handleEscapeKeyDown)
    return () => {
      document.removeEventListener('keydown', handleEscapeKeyDown)
      allowScroll(prevScroll)
    }
  })

  return (
    <Dialog onClick={handleOutsideClick}>
      <Container>
        <Title>{title}</Title>
        <Text>{text}</Text>
        <SubText>{subText}</SubText>
        <ButtonContainer>
          <CancelButton
            type="button"
            onClick={handleCancelClick}>
            {cancelButtonText}
          </CancelButton>
          <OkButton
            type="button"
            onClick={handleOkClick}>
            {okButtonText}
          </OkButton>
        </ButtonContainer>
        <CloseButton onClick={close}>
          <span className="a11y-hidden">팝업창닫기</span>
        </CloseButton>
      </Container>
    </Dialog>
  )
}

export default Modal
