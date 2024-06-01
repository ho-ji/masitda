import {useEffect, useState} from 'react'

import {getBestListAPI} from 'api/product'
import ProductList from 'components/common/product/ProductList'

const BestList = () => {
  const [list, setList] = useState([])

  useEffect(() => {
    const getBestList = async () => {
      try {
        const result = await getBestListAPI()
        setList(result.data)
      } catch (error) {}
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
