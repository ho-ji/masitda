import styled from 'styled-components'
import {Link, useNavigate} from 'react-router-dom'
import {useSetRecoilState} from 'recoil'

import {formatSaleCost} from 'utils/cost'
import addCartImage from 'assets/images/add_cart.svg'
import {postCartProductAPI} from 'api/api'
import {updateCountSelector} from 'recoil/cart/selector'
import useModal from 'hooks/useModal'

const Container = styled(Link)`
  aspect-ratio: 1/1.75;
  position: relative;
`
const ImageContainer = styled.div`
  position: relative;
`

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  aspect-ratio: 1/1;
  margin: 1rem 0;
  border: 1px solid var(--color-border);
  border-radius: 10px;
`
const CartButton = styled.button`
  position: absolute;
  bottom: 2rem;
  right: 1rem;
  width: 4rem;
  border-radius: 5px;
  aspect-ratio: 1/1;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background: url(${addCartImage}) no-repeat center/2rem white;
`
const Name = styled.strong`
  font-size: var(--font-size-secondary);
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-break: break-all;
`
const Description = styled.p`
  font-size: var(--font-size-subtext);
  color: var(--color-text-sub);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const CostContainer = styled.div`
  margin: 1rem 0;
  display: flex;
  align-items: flex-end;
  gap: 1rem;
`
const SaleCost = styled.span`
  font-size: var(--font-size-primary);
  font-weight: bold;
`
const Cost = styled.span`
  font-size: var(--font-size-secondary);
  color: var(--color-text-main);
  text-decoration: line-through;
`
const Rate = styled.span`
  color: var(--color-main);
  font-weight: bold;
`
const Temp = styled.span`
  color: var(--color-text-main);
  color: ${(props) => props.$temp === '냉동' && '#4775c0'};
  color: ${(props) => props.$temp === '냉장' && '#8fc8eb'};
`

const ProductCard = ({product, children}) => {
  const navigate = useNavigate()
  const {updateModal, openModal} = useModal()
  const updateCount = useSetRecoilState(updateCountSelector)

  const handleCartButtonClick = () => {
    postCartProductAPI(product._id, 1)
    updateCount({id: product._id, count: 1})
    updateModal('cart', navigate)
    openModal()
  }

  return (
    <>
      <Container>
        {children}
        <ImageContainer>
          <Image
            src={product.image}
            alt="상품이미지"
          />
          <CartButton
            type="button"
            onClick={handleCartButtonClick}>
            <span className="a11y-hidden">장바구니 상품 담기</span>
          </CartButton>
        </ImageContainer>
        <Name>{product.name}</Name>
        {product.description && <Description>{product.description}</Description>}
        <CostContainer>
          <SaleCost>{`${formatSaleCost(product.cost, product.rate)}원`}</SaleCost>
          {product.rate !== 0 && (
            <>
              <Cost>
                <span className="a11y-hidden">정상가</span>
                {`${formatSaleCost(product.cost)}원`}
              </Cost>
              <Rate>
                <span className="a11y-hidden">할인율</span>
                {`${product.rate}%`}
              </Rate>
            </>
          )}
        </CostContainer>
        <Temp $temp={product.temp}>
          <span className="a11y-hidden">보관방법</span>
          {product.temp}
        </Temp>
      </Container>
    </>
  )
}

export default ProductCard
