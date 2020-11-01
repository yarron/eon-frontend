import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    display: 'flex',
    justifyContent: 'center',
  },
  loading: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 9999,
    position: 'absolute',
    left: 0,
    top: 0,
  },
}));

export default useStyles;
