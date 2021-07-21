import React from "react"
import { Grid, Paper, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import clsx from "clsx"


import useStyles from "../style/style"
import Provider from "../interfaces/Provider"
import Category from "../interfaces/Category"
import Product from "../interfaces/Product"

function ItemList(props: { items: Product[] | Category[] | Provider[] | null, title: string, to?: string }) {
  const classes = useStyles()

  const { items, title, to } = props

  if (!items) return null

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} className={classes.paper}>
        <Paper className={classes.paper}>
          <Typography variant='h6'>
            {title}
          </Typography>
        </Paper>
      </Grid>
      {items.map((item: Product | Category | Provider) => (
        <Grid item xs={6} sm={3} className={classes.paper}>
          <Link to={`/${to}/${item.id}`} className={clsx(classes.itemLink, classes.grayedText)}>
            <Paper className={classes.paper}>
              {item.name}
            </Paper>
          </Link>
        </Grid>
      ))}
    </Grid>
  )
}


export default ItemList