import Category from './Category'
import Provider from './Provider'

interface Product {
  id: number
  name: string
  description: string
  stock: number
  value: number
  providers: Provider[]
  category: Category
  height?: number
  width?: number
  length?: number
}

export default Product