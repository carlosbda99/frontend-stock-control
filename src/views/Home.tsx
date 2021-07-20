import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    itemLink: {
      textDecoration: 'none',
    },
    centered: {
      justifyContent: 'center'
    }
  }),
);

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2} justifyContent='center' alignItems='center' direction="column">
        <Grid item xs={12} md={6} className={classes.paper}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Stock control image"
                height="180"
                image="https://www.spsconsultoria.com.br/wp-content/uploads/2020/04/sap-sistema-de-gest%C3%A3opara-controle-de-estoque.png"
                title="Stock control image"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Seja bem-vindo
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Aqui você dará os primeiros passos para o controle de estoque de sua loja!
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.centered}>
              <Link to='/categories' className={classes.itemLink}>
                <Button size="small" color="primary">
                  Cadastrar categoria
                </Button>
              </Link>
              <Link to='/products' className={classes.itemLink}>
                <Button size="small" color="primary">
                  Cadastrar produto
                </Button>
              </Link>
              <Link to='/providers' className={classes.itemLink}>
                <Button size="small" color="primary">
                  Cadastrar fornecedor
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6} className={classes.paper}>
        </Grid>
      </Grid>
    </div>
  );
}