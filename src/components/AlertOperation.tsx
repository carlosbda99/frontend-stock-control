import React from "react";
import Alert from "@material-ui/lab/Alert";

import useStyles from "../style/style";

function AlertOperation(props: any) {
  const classes = useStyles()
  const { operation, handleClose } = props
  
  if (operation.finished) {

    if (operation.status) return (
      <Alert severity='success' onClose={handleClose} className={classes.margin_1}>
        Operação realizada com sucesso!
        </Alert>
    )

    return (
      <Alert severity='error' onClose={handleClose} className={classes.margin_1}>
        Houve um erro no cadastramento!
      </Alert>
    )

  } else return null
}

export default AlertOperation
