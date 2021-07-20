import React from 'react';
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DeleteIcon from '@material-ui/icons/Delete'

import Category from '../../../interfaces/Category';
import useStyles from '../../../style/style';
import ProductRow from './ProductRow';

function ProductTable(props: { category: Category, setOperation: Function }) {
  const { category, setOperation } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const deleteCategory = async () => {
    let requestOptions: object = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }
    await fetch(`https://guarded-cliffs-79935.herokuapp.com/api/v1/categories/${category.id}`, requestOptions)
      .then(res => res.json())
      .then((res) => {
        if (res.msg !== 'Unsuccessfully operation') {
          setOperation({finished:true, status: true})
        } else {
          setOperation({finished:true, status: false})
        }
      })
  }

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          {category.products.length > 0 ?
            (<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>) : null
          }
        </TableCell>
        <TableCell component="th" scope="row">
          {category.name}
        </TableCell>
        <TableCell align="right">{category.products.length}</TableCell>
        <TableCell align="right">{category.outStock}</TableCell>
        <TableCell>
          {category.products.length === 0 ?
            (<IconButton aria-label="delete" className={classes.margin_1} onClick={deleteCategory}>
              <DeleteIcon />
            </IconButton>) : null
          }

        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Produtos
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Descrição</TableCell>
                    <TableCell align="right">Quantidade em estoque</TableCell>
                    <TableCell align="right">Valor (R$)</TableCell>
                    <TableCell />
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {category.products.map((product) => (
                    // <TableRow key={product.name}>
                    //   <TableCell component="th" scope="row">
                    //     {product.name}
                    //   </TableCell>
                    //   <TableCell>{product.description}</TableCell>
                    //   <TableCell align="right">{product.stock}</TableCell>
                    //   <TableCell align="right">{product.value}</TableCell>
                    //   <TableCell>
                    //     <IconButton aria-label="delete" className={classes.margin_1}>
                    //       <DeleteIcon />
                    //     </IconButton>
                    //   </TableCell>
                    // </TableRow>
                    <ProductRow product={product} setOperation={setOperation}></ProductRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default ProductTable