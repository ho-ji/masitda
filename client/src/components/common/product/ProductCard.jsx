import styled from 'styled-components'
import {Link, useNavigate} from 'react-router-dom'
import {useRecoilState, useSetRecoilState} from 'recoil'

import {formatSaleCost} from 'utils/cost'
import addCartImage from 'assets/images/add_cart.svg'
import {postCartProductAPI} from 'api/cart'
import {updateCountSelector} from 'recoil/cart/selector'
import useModal from 'hooks/useModal'
import {tokenState} from 'recoil/token/atom'

const Container = styled(Link)`
  aspect-ratio: 1/1.75;
  position: relative;
`
const Ranking = styled.p`
  font-size: var(--font-size-emphasis);
  font-weight: bold;
`

const Flag = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 0.5rem;
  background-color: var(--color-main);
  color: white;
  padding: 0 1.5rem 0 1rem;
  z-index: 2;
  clip-path: polygon(100% 0, 100% 0, 90% 100%, 0 100%, 0 0);
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
  font-size: var(--font-size-primary);
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
  font-size: var(--font-size-emphasis);
  font-weight: bold;
`
const Cost = styled.span`
  font-size: var(--font-size-primary);
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

const ProductCard = ({product, type, ranking}) => {
  const [token, setToken] = useRecoilState(tokenState)
  const navigate = useNavigate()
  const {updateModal, openModal} = useModal()
  const updateCount = useSetRecoilState(updateCountSelector)

  const handleCartButtonClick = async () => {
    const result = await postCartProductAPI({productId: product._id, count: 1, accessToken: token})
    if (result.data.success) {
      if (result.data.accessToken) setToken(result.data.accessToken)
      updateCount({productId: product._id, count: 1})
      updateModal('cart', navigate)
      openModal()
    } else {
      setToken('')
    }
  }

  return (
    <>
      <Container>
        {type === 'mdpick' && <Flag>MD Pick</Flag>}
        {type === 'ranking' && (
          <Ranking>
            {ranking.toString().padStart(2, '0')}
            <span className="a11y-hidden">위</span>
          </Ranking>
        )}
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
