import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: '50vh'
    }
  })
);

export default function About() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2} justifyContent='center' alignItems='center' direction="column">
        <Grid item xs={12} md={6} className={classes.paper}>
          <Typography>
            Site desenvolvido por Carlos Azevedo
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.paper}>
        </Grid>
      </Grid>
    </div>
  );
}