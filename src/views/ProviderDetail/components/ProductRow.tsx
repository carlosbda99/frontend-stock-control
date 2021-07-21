import React from "react"
import {
  IconButton,
  TableCell,
  TableRow,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete'
import InfoRoundedIcon from '@material-ui/icons/InfoRounded'
import clsx from "clsx"

import useStyles from "../../../style/style";
import Product from "../../../interfaces/Product";


function ProductRow(props: { product: Product }) {
  const classes = useStyles()
  const { product } = props

  return (

    <TableRow key={product.name}>
      <TableCell component="th" scope="row">
        {product.name}
      </TableCell>
      <TableCell>{product.description}</TableCell>
      <TableCell align="right">{product.stock}</TableCell>
      <TableCell align="right">{product.value}</TableCell>
      <TableCell width='5%'>
        <Link to={`/products/${product.id}`} className={clsx(classes.itemLink, classes.grayedText)}>
          <IconButton className={classes.margin_1}>
            <InfoRoundedIcon className={classes.margin_1}></InfoRoundedIcon>
          </IconButton>
        </Link>
      </TableCell>
    </TableRow>
  )
}

export default ProductRow