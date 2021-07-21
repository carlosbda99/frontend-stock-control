import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';


import Category from '../../../interfaces/Category';
import Product from '../../../interfaces/Product';
import ProductRow from './ProductRow';

function ProductTable(props: { category: Category }) {
  const { category } = props;

  return (
    <>
      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell align="right">Quantidade em estoque</TableCell>
            <TableCell align="right">Valor (R$)</TableCell>
            <TableCell align='center'>Informação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {category.products.map((product: Product) => (
            <ProductRow product={product} key={product.id}></ProductRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default ProductTable