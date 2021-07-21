import Product from './Product'

interface Category {
  id: number
  name: string
  description: string
  products: Product[] | []
  outStock: number
}

export default Category