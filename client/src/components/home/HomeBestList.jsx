import {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'

import {getTopListAPI} from 'api/api'
import ProductCard from 'components/common/ProductCard'

const Container = styled.section`
  margin: 5rem auto;
  padding: 0 5rem;
  max-width: 152rem;
`
const Title = styled.h2`
  font-weight: bold;
  font-size: var(--font-size-primary);
  margin-bottom: 2rem;
  display: inline-block;
`

const MoreButton = styled.button`
  border-radius: 2rem;
  float: right;
  padding: 0.5rem 2rem;
  line-height: 2rem;
  border: 1px solid var(--color-gray);
  color: var(--color-text-main);
`
const ListContainer = styled.div`
  position: relative;
`

const PageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  top: 45%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  z-index: 2;
  background-color: white;
  &:hover {
    background-color: var(--color-main);
    > svg {
      fill: white;
    }
  }
`

const PrevButton = styled(PageButton)`
  left: 0;
  transform: translateX(-50%);
`

const NextButton = styled(PageButton)`
  right: 0;
  transform: translateX(50%);
`

const BestList = styled.ol`
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`
const Ranking = styled.p`
  font-size: var(--font-size-emphasis);
  font-weight: bold;
`
const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  min-width: 22rem;
`

const HomeBestList = () => {
  const [bestList, setBestList] = useState([])
  const [isDrag, setIsDrag] = useState(false)
  const [startX, setStartX] = useState()
  const [showPrevButton, setShowPrevButton] = useState(false)
  const [showNextButton, setShowNextButton] = useState(true)
  const navigate = useNavigate()
  const listRef = useRef()

  const handleDragStart = (e) => {
    e.preventDefault()
    setIsDrag(true)
    setStartX(e.pageX + listRef.current.scrollLeft)
  }

  const handleDragEnd = (e) => {
    setIsDrag(false)
  }

  const handleDragMove = (e) => {
    if (isDrag) {
      listRef.current.scrollLeft = startX - e.pageX

      if (listRef.current.scrollLeft > 10) setShowPrevButton(true)
      else if (listRef.current.scrollLeft < 10) setShowPrevButton(false)

      if (listRef.current.scrollLeft < listRef.current.scrollWidth - listRef.current.clientWidth - 10) setShowNextButton(true)
      else setShowNextButton(false)
    }
  }

  const handlePrevButtonClick = () => {
    listRef.current.scrollTo({
      behavior: 'smooth',
      left: 0,
    })
    setShowPrevButton(false)
  }

  const handleNextButtonClick = () => {
    listRef.current.scrollTo({
      behavior: 'smooth',
      left: listRef.current.scrollWidth,
    })
    setShowNextButton(false)
  }

  const handleMoreButtonClick = () => {
    navigate('/best')
  }

  useEffect(() => {
    const getBestList = async () => {
      try {
        const result = await getTopListAPI()
        setBestList(result.data)
      } catch (error) {
        console.error(error)
      }
    }
    getBestList()
  }, [])

  return (
    <Container>
      <Title>베스트</Title>
      <MoreButton onClick={handleMoreButtonClick}>더보기</MoreButton>
      {bestList.length !== 0 && (
        <ListContainer>
          {showNextButton && (
            <NextButton
              type="button"
              onClick={handleNextButtonClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#666666">
                <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
              </svg>
            </NextButton>
          )}
          <BestList
            ref={listRef}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}>
            {bestList.map((product, i) => {
              return (
                <ListItem key={product._id}>
                  <Ranking>
                    {(i + 1).toString().padStart(2, '0')}
                    <span className="a11y-hidden">위</span>
                  </Ranking>
                  <ProductCard product={product} />
                </ListItem>
              )
            })}
          </BestList>
          {showPrevButton && (
            <PrevButton
              type="button"
              onClick={handlePrevButtonClick}>
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="#666666"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M16.0196 2.03233L17.791 3.81093L9.54932 12.0192L17.7576 20.2609L15.979 22.0323L5.99932 12.012L16.0196 2.03233Z" />
              </svg>
            </PrevButton>
          )}
        </ListContainer>
      )}
    </Container>
  )
}

export default HomeBestList
