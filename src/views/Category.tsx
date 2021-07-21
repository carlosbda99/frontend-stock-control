import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Select,
  FormControl,
  InputLabel,
  Button,
  LinearProgress
} from '@material-ui/core';

import AlertOperation from '../components/AlertOperation';
import useStyles from '../style/style';
import Product from '../interfaces/Product';
import CategoryInterface from '../interfaces/Category';
import ItemList from '../components/ItemList';

export default function Category() {
  const classes = useStyles();
  const [categoryProducts, setCategoryProducts] = React.useState<number[]>([])
  const [categoryName, setCategoryName] = React.useState<string>('')
  const [categoryDescription, setCategoryDescription] = React.useState<string>('')
  const [operation, setOperation] = React.useState<any>({ finished: false, status: false, runnning: false })
  const [products, setProducts] = React.useState<Product[] | null>(null)
  const [categories, setCategories] = React.useState<CategoryInterface[] | null>(null)
  const [error, setError] = React.useState<boolean>(false)


  const getData = async () => {
    let products: Product[] = []
    await fetch('https://guarded-cliffs-79935.herokuapp.com//api/v1/products/')
      .then(res => res.json())
      .then(res => {
        products = res.products
      })
    setProducts(products)

    let categories: CategoryInterface[] = []
    await fetch('https://guarded-cliffs-79935.herokuapp.com//api/v1/categories/')
      .then(res => res.json())
      .then(res => {
        categories = res.categories
      })
    setCategories(categories)
  }

  const handleProductsField = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { options } = event.target as HTMLSelectElement;
    const value: number[] = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(parseInt(options[i].value))
      }
    }
    setCategoryProducts(value)
  };

  const handleNameField = (event: any) => {
    setCategoryName(event.target.value)
  }

  const handleDescriptionField = (event: any) => {
    setCategoryDescription(event.target.value)
  }

  const setDefaultValues = () => {
    setCategoryDescription('')
    setCategoryName('')
    setCategoryProducts([])
  }

  const handleClose = () => {
    setOperation({ finished: false, status: false })
  }

  const validateForm = () => {
    setError(false)
    if (categoryName.length < 5) return false
    return true
  }

  const submitForm = async () => {
    if (validateForm()) {
      setOperation({ finished: false, status: false, running: true })
      let requestOptions: object = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: categoryName,
          description: categoryDescription,
          products: categoryProducts
        })
      }
      await fetch('https://guarded-cliffs-79935.herokuapp.com//api/v1/categories/', requestOptions)
        .then(res => res.json())
        .then((res) => {
          if (res.msg !== 'Unsuccessfully operation') {
            setOperation({ finished: true, status: true, running: false })
          } else {
            setOperation({ finished: true, status: false, running: false })
          }
        })
      setDefaultValues()
    } else { setError(true) }

  }

  React.useEffect(() => {
    getData()
  }, [operation])

  if (!(products && categories)) return <LinearProgress></LinearProgress>

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.paper}>
          <Paper className={classes.paper}>
            <Typography variant='h6'>
              Cadastro de categoria
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} className={classes.paper}>
          <Paper className={classes.paper}>
            <form className={classes.margin_1} noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={error}
                    required
                    label="Nome"
                    fullWidth
                    onChange={handleNameField}
                    value={categoryName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Descrição"
                    fullWidth
                    multiline
                    maxRows={4}
                    onChange={handleDescriptionField}
                    value={categoryDescription}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={12}>
                  <FormControl className={classes.margin_1} fullWidth>
                    <InputLabel shrink htmlFor="select-multiple-products">Produtos</InputLabel>
                    <Select
                      multiple
                      native
                      value={categoryProducts}
                      onChange={handleProductsField}
                      inputProps={{
                        id: 'select-multiple-products',
                      }}
                    >
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </form>
            <Button variant="outlined" color="primary" onClick={submitForm}>
              Cadastrar
            </Button>
            {
              operation.running ? <LinearProgress className={classes.margin_1}></LinearProgress> : 
              <AlertOperation handleClose={handleClose} operation={operation} className={classes.margin_1}/>
            }
          </Paper>
        </Grid>
      </Grid>
      <ItemList items={categories} title='Categorias cadastradas' to='categories'></ItemList>
    </div>
  );
}