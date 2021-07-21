import Product from "./Product";

interface Provider{
    id: number,
    name: string,
    cnpj: string,
    products: Product[]
    phone?: string
}

export default Provider