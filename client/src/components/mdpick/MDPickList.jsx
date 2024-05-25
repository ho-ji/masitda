import {useEffect, useState} from 'react'

import {getMDPickListAPI} from 'api/product'
import ProductList from 'components/common/product/ProductList'

const MDPickList = () => {
  const [list, setList] = useState([])

  useEffect(() => {
    const getMDPickList = async () => {
      try {
        const result = await getMDPickListAPI()
        setList(result.data)
      } catch (error) {
        console.error(error)
      }
    }
    getMDPickList()
  }, [])

  return (
    <ProductList
      list={list}
      type="mdpick"
      title="MD PICK"
    />
  )
}

export default MDPickList
