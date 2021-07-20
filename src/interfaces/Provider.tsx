import Product from "./Product";

interface Provider{
    id: number,
    name: string,
    cnpj: string,
    phone?: string
    products?: Product[]
}

export default Provider