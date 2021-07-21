import React from "react"
import {
  IconButton,
  TableCell,
  TableRow,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import InfoRoundedIcon from '@material-ui/icons/InfoRounded'
import clsx from "clsx"

import useStyles from "../../../style/style";
import Provider from "../../../interfaces/Provider";


function ProviderRow(props: { provider: Provider }) {
  const classes = useStyles()
  const { provider } = props

  return (

    <TableRow>
      <TableCell component="th" scope="row">
        {provider.name}
      </TableCell>
      <TableCell>{provider.cnpj}</TableCell>
      <TableCell align="right">{provider.phone}</TableCell>
      <TableCell width='3%'>
        <Link to={`/providers/${provider.id}`} className={clsx(classes.itemLink, classes.grayedText)}>
          <IconButton className={classes.margin_1}>
            <InfoRoundedIcon className={classes.margin_1}></InfoRoundedIcon>
          </IconButton>
        </Link>
      </TableCell>
    </TableRow>
  )
}

export default ProviderRow