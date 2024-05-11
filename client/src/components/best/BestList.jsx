import {useEffect, useState} from 'react'

import {getBestListAPI} from 'api/api'
import ProductList from 'components/common/ProductList'

const BestList = () => {
  const [list, setList] = useState([])

  useEffect(() => {
    const getBestList = async () => {
      try {
        const result = await getBestListAPI()
        setList(result.data)
      } catch (error) {
        console.error(error)
      }
    }
    getBestList()
  }, [])

  return (
    <ProductList
      list={list}
      type="ranking"
      title="베스트"
    />
  )
}

export default BestList
