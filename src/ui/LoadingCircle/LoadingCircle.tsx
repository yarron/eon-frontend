import React, { FC } from 'react';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
import useStyles from './styles';

interface IProps {
  isLoading: boolean;
  size?: number;
  classes?: CircularProgressProps['classes'];
}

const LoadingCircle: FC<IProps> = ({ isLoading, ...restProps }) => {
  const classes = useStyles();

  return (
    <div className={restProps?.classes?.root || classes.root}>
      {!!isLoading && <CircularProgress {...restProps} disableShrink color="secondary" classes={{ ...classes, ...restProps?.classes }} />}
    </div>
  );
};

export default LoadingCircle;
