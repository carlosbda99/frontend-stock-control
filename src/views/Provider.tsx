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

import useStyles from '../style/style';
import Product from '../interfaces/Product';
import AlertOperation from '../components/AlertOperation';


export default function Provider() {
  const classes = useStyles();
  const [providerProducts, setProviderProducts] = React.useState<number[]>([])
  const [providerName, setProviderName] = React.useState<string>('')
  const [providerPhone, setProviderPhone] = React.useState<string>('')
  const [providerCNPJ, setProviderCNPJ] = React.useState<string>('')
  const [products, setProducts] = React.useState<Product[] | null>(null)
  const [operation, setOperation] = React.useState<object>({ finished: false, status: false })



  const getData = async () => {
    let data: Product[] = []
    await fetch('http://localhost:8000/api/v1/products/')
    .then(res => res.json())
    .then(res => {
      data = res.products
    })
    setProducts(data)
  }

  const handleClose = () => {
    setOperation({ finished: false, status: false })
  }

  const handleProductsField = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { options } = event.target as HTMLSelectElement
    const value: number[] = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(parseInt(options[i].value))
      }
    }
    setProviderProducts(value);
  }

  const handleNameField = (event: any) => {
    setProviderName(event.target.value)
  }

  // Need improve validation
  const handlePhoneField = (event: any) => {
    setProviderPhone(event.target.value)
  }

  // Need improve validation
  const handleCNPJField = (event: any) => {
    setProviderCNPJ(event.target.value)
  }

  const submitForm = async () => {
    let requestOptions: object = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: providerName,
        cnpj: providerCNPJ,
        phone: providerPhone,
        products: providerProducts
      })
    }
    await fetch('http://localhost:8000/api/v1/providers/', requestOptions)
    .then(res => res.json())
    .then((res) => {
      if (res.msg !== 'Unsuccessfully operation') {
        setOperation({finished:true, status: true})
      } else {
        setOperation({finished:true, status: false})
      }
    })

    setDefaultValues()
  }

  const setDefaultValues = () => {
    setProviderProducts([])
    setProviderName('')
    setProviderPhone('')
    setProviderCNPJ('')
  }

  React.useEffect(() => {
    getData()
  }, [])

  if (!products) return <LinearProgress></LinearProgress>

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.paper}>
          <Paper className={classes.paper}>
            <Typography variant='h6'>
              Cadastro de fornecedor
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} className={classes.paper}>
          <Paper className={classes.paper}>
            <form className={classes.margin_1} noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    label="Nome"
                    fullWidth
                    onChange={handleNameField}
                    value={providerName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    label="CNPJ"
                    fullWidth
                    onChange={handleCNPJField}
                    value={providerCNPJ}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <TextField
                    label="Telefone"
                    fullWidth
                    onChange={handlePhoneField}
                    value={providerPhone}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={10}>
                  <FormControl className={classes.margin_1} fullWidth>
                    <InputLabel shrink htmlFor="select-multiple-products">Produtos</InputLabel>
                    <Select
                      multiple
                      native
                      value={providerProducts}
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
            <AlertOperation handleClose={handleClose} operation={operation}/>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}