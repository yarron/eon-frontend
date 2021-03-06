import { makeStyles, Theme } from '@material-ui/core/styles';

const getStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default getStyles;
