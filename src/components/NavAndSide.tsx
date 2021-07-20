import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import StorefrontRoundedIcon from '@material-ui/icons/StorefrontRounded';
import BallotRoundedIcon from '@material-ui/icons/BallotRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LayersIcon from '@material-ui/icons/Layers';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { Link } from 'react-router-dom'

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 16,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    itemLink: {
      textDecoration: 'none',
      color: 'black'
    }
  }),
);

export default function HeaderAndMenu() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openSubMenu, setOpenSubMenu] = React.useState(false);

  const handleClick = () => {
    setOpenSubMenu(!openSubMenu);
    if (!open) setOpen(true)
  };


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setOpenSubMenu(false)
  };

  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Store - controle de estoque
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <Typography variant='h6'>Menu</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {[
            { text: 'Home', icon: (<HomeRoundedIcon></HomeRoundedIcon>), link: '/' },
            { text: 'Dashboard', icon: (<DashboardRoundedIcon></DashboardRoundedIcon>), link: '/dashboard' },
            { text: 'Estoque', icon: (<BallotRoundedIcon></BallotRoundedIcon>), link: '/stock' },
          ].map((item, index) => (
            <Link to={item.link} className={classes.itemLink} key={item.text}>
              <ListItem button key={item.text}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </Link>
          ))}
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <WorkRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Administração" />
            {openSubMenu ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
            {[
              { text: 'Produtos', icon: (<ListAltIcon></ListAltIcon>), link: '/products' },
              { text: 'Categorias', icon: (<LayersIcon></LayersIcon>), link: '/categories' },
              { text: 'Fornecedores', icon: (<StorefrontRoundedIcon></StorefrontRoundedIcon>), link: '/providers' },
            ].map(item => (
              <List component="div" disablePadding key={item.text}>
                <Link to={item.link} className={classes.itemLink}>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                </Link>
              </List>
            ))}
          </Collapse>
        </List>
        <Divider />
        <List>
          <Link to='/about' className={classes.itemLink}>
            <ListItem button>
              <ListItemIcon><InfoRoundedIcon></InfoRoundedIcon></ListItemIcon>
              <ListItemText primary='Sobre' />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </div>
  );
}