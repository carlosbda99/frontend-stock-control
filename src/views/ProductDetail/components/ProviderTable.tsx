import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';


import Provider from '../../../interfaces/Provider';
import Product from '../../../interfaces/Product';
import ProviderRow from './ProviderRow';

function ProviderTable(props: { product: Product }) {
  const { product } = props;

  return (
    <>
      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>CNPJ</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell/>
          </TableRow>
        </TableHead>
        <TableBody>
          {product.providers.map((provider: Provider) => (
            <ProviderRow provider={provider} key={provider.id}></ProviderRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default ProviderTable