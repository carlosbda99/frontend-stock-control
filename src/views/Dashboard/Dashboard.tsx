import React from 'react';
import { Grid, Paper, Typography, LinearProgress } from '@material-ui/core';

import PieGraph from './components/PieGraph';
import Category from '../../interfaces/Category';
import useStyles from '../../style/style';

export default function Dashboard() {
  const classes = useStyles();
  const [ categoriesAmount, setCategoriesAmount] = React.useState<number[] | null>(null)
  const [ categoriesLabels, setCategoriesLabels] = React.useState<string[] | null>(null)
 
  const getData = async () => {
    let amount: number[] = []
    let labels: string[] = []
    await fetch('https://guarded-cliffs-79935.herokuapp.com/api/v1/categories/')
    .then(res => res.json())
    .then(res => {
      amount = res.categories.map((category: Category) => category.products.length)
      labels = res.categories.map((category: Category) => category.name)
    })
    setCategoriesAmount(amount)
    setCategoriesLabels(labels)
  }

  React.useEffect(() => {
    getData()
  }, [])

  if (!categoriesAmount) return <LinearProgress></LinearProgress>

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
      <Grid item xs={12} className={classes.paper}>
          <Paper className={classes.paper}>
              <Typography variant='h6'>
                Distribuição de produtos por categoria
              </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} className={classes.paper}>
          <Paper className={classes.paper}>
              <PieGraph categoriesAmount={categoriesAmount} categoriesLabels={categoriesLabels}></PieGraph>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}