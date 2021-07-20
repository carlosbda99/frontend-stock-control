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
  InputAdornment,
  MenuItem,
  LinearProgress
} from '@material-ui/core';

import Category from '../interfaces/Category';
import Provider from '../interfaces/Provider';
import useStyles from '../style/style';
import AlertOperation from '../components/AlertOperation';

export default function Product() {
  const classes = useStyles();
  const [providersName, setProvidersName] = React.useState<number[]>([])
  const [productCategory, setProductCategory] = React.useState<number | string>('')
  const [productName, setProductName] = React.useState<string>('')
  const [productStock, setProductStock] = React.useState<number>(0)
  const [productValue, setProductValue] = React.useState<number>(0)
  const [productWidth, setProductWidth] = React.useState<number>(0)
  const [productHeight, setProductHeight] = React.useState<number>(0)
  const [productLenght, setProductLenght] = React.useState<number>(0)
  const [productDescription, setProductDescription] = React.useState<string>('')
  const [categories, setCategories] = React.useState<Category[] | null>(null)
  const [providers, setProviders] = React.useState<Provider[] | null>(null)
  const [operation, setOperation] = React.useState<object>({ finished: false, status: false })

  const getData = async () => {
    let categories: Category[] = []
    let providers: Provider[] = []

    await fetch('https://guarded-cliffs-79935.herokuapp.com/api/v1/providers/')
      .then(res => res.json())
      .then(res => {
        providers = res.providers
      })

    await fetch('https://guarded-cliffs-79935.herokuapp.com/api/v1/categories/')
      .then(res => res.json())
      .then(res => {
        categories = res.categories
      })

    setCategories(categories)
    setProviders(providers)

  }

  const handleClose = () => {
    setOperation({ finished: false, status: false })
  }

  const setDefaultValues = () => {
    setProductDescription('')
    setProductCategory('')
    setProductName('')
    setProvidersName([])
    setProductStock(0)
    setProductValue(0)
    setProductWidth(0)
    setProductHeight(0)
    setProductLenght(0)
  }

  const handleProvidersField = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { options } = event.target as HTMLSelectElement;
    const value: number[] = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(parseInt(options[i].value));
      }
    }
    setProvidersName(value);
  };

  const handleCategoryField = (event: any) => {
    console.log(event.target.value)
    setProductCategory(parseInt(event.target.value))
  };

  const handleNameField = (event: any) => {
    setProductName(event.target.value)
  }

  const handleStockField = (event: any) => {
    setProductStock(event.target.value)
  }

  const handleValueField = (event: any) => {
    const test = event.target.value.match(/^[0-9]+\.?[0-9]{0,2}/)
    if (event.target.value === '') setProductValue(0)
    else if (test) setProductValue(test[0])
  }

  const handleHeightField = (event: any) => {
    setProductHeight(event.target.value)
  }

  const handleWidthField = (event: any) => {
    setProductWidth(event.target.value)
  }

  const handleLenghtField = (event: any) => {
    setProductLenght(event.target.value)
  }

  const handleDescriptionField = (event: any) => {
    setProductDescription(event.target.value)
  }

  const submitForm = async () => {
    let requestOptions: object = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: productName,
        description: productDescription,
        category: productCategory,
        stock: productStock,
        value: productValue,
        width: productWidth,
        height: productHeight,
        length: productLenght
      })
    }
    await fetch('https://guarded-cliffs-79935.herokuapp.com/api/v1/products/', requestOptions)
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

  React.useEffect(() => {
    getData()
  }, [])

  if (!(categories && providers)) return <LinearProgress></LinearProgress>

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.paper}>
          <Paper className={classes.paper}>
            <Typography variant='h6'>
              Cadastro de produto
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} className={classes.paper}>
          <Paper className={classes.paper}>
            <form className={classes.margin_1} noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField required label="Nome" fullWidth onChange={handleNameField} value={productName} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField required label="Estoque" type='number' fullWidth onChange={handleStockField} value={productStock} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Valor"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">R$</InputAdornment>,
                    }}
                    fullWidth
                    onChange={handleValueField}
                    value={productValue}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Largura"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                    }}
                    fullWidth
                    onChange={handleWidthField}
                    type='number'
                    value={productWidth}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Altura"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                    }}
                    fullWidth
                    onChange={handleHeightField}
                    type='number'
                    value={productHeight}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Comprimento"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                    }}
                    fullWidth
                    onChange={handleLenghtField}
                    type='number'
                    value={productLenght}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Descrição"
                    fullWidth
                    multiline
                    maxRows={4}
                    onChange={handleDescriptionField}
                    value={productDescription}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="select-category">Categoria *</InputLabel>
                    <Select
                      required
                      value={productCategory}
                      labelId='select-category'
                      onChange={handleCategoryField}
                      className={classes.lefted}
                    >
                      {categories.map((category) => (
                        <MenuItem value={category.id} key={category.id}>{category.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.margin_1} fullWidth>
                    <InputLabel shrink htmlFor="select-multiple-providers">Fornecedores</InputLabel>
                    <Select
                      multiple
                      native
                      value={providersName}
                      onChange={handleProvidersField}
                      inputProps={{
                        id: 'select-multiple-providers',
                      }}
                    >
                      {providers.map((provider) => (
                        <option key={provider.id} value={provider.id}>
                          {provider.name}
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
            <AlertOperation handleClose={handleClose} operation={operation} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}