import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TableContainer,
  Paper,
  LinearProgress
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { RouteComponentProps } from "react-router";

import Product from "../../interfaces/Product";
import useStyles from "../../style/style";
import MatchParams from "../../interfaces/MatchParams";
import ProviderTable from "./components/ProviderTable";


function ProductDetail(props: RouteComponentProps<MatchParams>) {
  const classes = useStyles()
  const [product, setProduct] = React.useState<Product | null>(null)

  const getData = async () => {
    let product: Product | null = null
    await fetch(`https://guarded-cliffs-79935.herokuapp.com/api/v1/products/${props.match.params.id}`)
      .then(res => res.json())
      .then(res => {
        product = res.product
      })
    setProduct(product)
  }

  React.useEffect(() => {
    getData()
  }, [])

  if (!product) return <LinearProgress></LinearProgress>

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} className={classes.paper}>
        <Card className={classes.root}>
          <CardContent>
            <Typography color="textPrimary" variant='h5' gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="h2">
              {product.description}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="h2">
              Estoque: {product.description}
            </Typography>
            <Typography color="textSecondary">
              Valor: {product.value}
            </Typography>
            <Typography color="textSecondary">
              Largura: {product.width}
            </Typography>
            <Typography color="textSecondary">
              Altura: {product.height}
            </Typography>
            <Typography color="textSecondary">
              Comprimento: {product.length}
            </Typography>
            <Typography color="textSecondary">
              Categoria: {product.category.name}
            </Typography>
            {product.providers.length > 0 ? (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant='h6' >Fornecedores</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid item xs={12} className={classes.paper}>
                    <TableContainer component={Paper}>
                      <ProviderTable product={product}></ProviderTable>
                    </TableContainer>
                  </Grid>
                </AccordionDetails>
              </Accordion>

            ) : (
              <Typography variant='h6'>Sem fornecedor</Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ProductDetail