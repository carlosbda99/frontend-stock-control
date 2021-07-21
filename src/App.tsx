import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavAndSide from './components/NavAndSide'

import {
  Home,
  About,
  Category,
  Dashboard,
  Product,
  Provider,
  Stock
} from './views'
import ProviderDetail from './views/ProviderDetail/ProviderDetail';
import CategoryDetail from './views/CategoryDetail/CategoryDetail';
import ProductDetail from './views/ProductDetail/ProductDetail';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);


function App() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <NavAndSide></NavAndSide>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path='/dashboard' component={Dashboard}></Route>
            <Route path='/about' component={About}></Route>
            <Route path='/stock' component={Stock}></Route>
            <Route path='/products' exact component={Product}></Route>
            <Route path='/products/:id' component={ProductDetail}></Route>
            <Route path='/categories' exact component={Category}></Route>
            <Route path='/categories/:id' component={CategoryDetail}></Route>
            <Route path='/providers' exact component={Provider}></Route>
            <Route path='/providers/:id' component={ProviderDetail}></Route>
            <Route path='/' component={Home}></Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;