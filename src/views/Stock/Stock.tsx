import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  LinearProgress,
  Grid
} from '@material-ui/core';

import Category from '../../interfaces/Category';
import Product from '../../interfaces/Product';
import ProductTable from './components/ProductTable';
import AlertOperation from '../../components/AlertOperation';
import useStyles from '../../style/style'

export default function Stock() {
  const classes = useStyles()
  const [categories, setCategories] = React.useState<Category[] | null>(null)
  const [operation, setOperation] = React.useState<any>({ finished: false, status: false })

  const handleClose = () => {
    setOperation({ finished: false, status: false })
  }

  React.useEffect(() => {
    getData()
  }, [operation])

  const getData = async () => {
    let data: any[] = []
    await fetch('https://guarded-cliffs-79935.herokuapp.com/api/v1/categories/')
      .then(res => res.json())
      .then(res => {
        data = res.categories
      })
    data = data.map((category: Category) => {
      category.outStock = 0
      category.products.map((product: Product) => {
        if (product.stock === 0) { category.outStock += 1 }
      })
      return category
    })
    setCategories(data)
  }

  if (!categories) return <LinearProgress></LinearProgress>
  if (categories.length === 0) return (
    <div className={classes.root}>
      <AlertOperation operation={operation} handleClose={handleClose}></AlertOperation>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.paper}>
          <Paper className={classes.paper}>
            <Typography variant='h6'>
              Listagem de produtos
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} className={classes.paper}>
          <Paper className={classes.paper}>
            <Typography variant='body1'>
              Nenhuma categoria ou produto encontrado
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )

  return (
    <div className={classes.root}>
      <AlertOperation operation={operation} handleClose={handleClose}></AlertOperation>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.paper}>
          <Paper className={classes.paper}>
            <Typography variant='h6'>
              Listagem de produtos
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} className={classes.paper}>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Categoria</TableCell>
                  <TableCell align="right">Quantidade de produtos</TableCell>
                  <TableCell align="right">Quantidade de produtos faltando</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category) => (
                  <ProductTable key={category.name} category={category} setOperation={setOperation} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}