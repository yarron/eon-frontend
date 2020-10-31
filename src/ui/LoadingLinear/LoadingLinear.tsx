import React, { FC } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import useStyles from './styles';

interface IProps {
  isLoading: boolean;
}

const LoadingLinear: FC<IProps> = ({ isLoading }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {!!isLoading && <LinearProgress variant="query" color="secondary" />}
    </div>
  );
};

export default LoadingLinear;
