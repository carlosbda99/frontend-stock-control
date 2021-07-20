import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

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
    margin_1: {
      margin: theme.spacing(1)
    },
    itemLink: {
      textDecoration: 'none',
    },
    lefted: {
      textAlign: 'start'
    }
  })
);

export default useStyles