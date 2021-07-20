interface Product {
  id: number
  name: string,
  description: string,
  stock: number,
  value: number,
  height?: number
  width?: number
  length?: number
}

export default Product