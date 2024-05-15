import {useRecoilState} from 'recoil'
import {modalState} from 'recoil/modal/atom'

const useModal = () => {
  const [modal, setModal] = useRecoilState(modalState)

  const closeModal = () => {
    setModal((prev) => {
      return {...prev, isOpen: false}
    })
  }

  const openModal = () => {
    setModal((prev) => {
      return {...prev, isOpen: true}
    })
  }

  const updateModal = (type, navigate) => {
    switch (type) {
      case 'cart': {
        const cartModal = {
          ...modal,
          title: '장바구니',
          text: '선택한 상품이 장바구니에 담겼습니다.',
          subText: '장바구니로 이동하겠습니까?',
          cancelButtonText: '장바구니 확인하기',
          okButtonText: '계속 쇼핑하기',
          handleCancelClick: () => {
            navigate('/cart')
            closeModal()
          },
          handleOkClick: () => {
            closeModal()
          },
        }
        setModal(cartModal)
        break
      }
      case 'delete': {
        break
      }
      default: {
      }
    }
  }
  return {
    modal,
    closeModal,
    openModal,
    updateModal,
  }
}

export default useModal
