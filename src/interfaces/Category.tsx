import Product from './Product'

interface Category {
  id: number
  name: string,
  products: Product[] | []
  outStock: number
}

export default Category