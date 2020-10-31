import React, { FC } from 'react';
import clsx from 'clsx';
import IconUI from '@mdi/react';

import useStyles from './styles';

interface IProps {
  path: string;
  disabled?: boolean;
  className?: string;
}

const Icon: FC<IProps> = ({
  path, disabled, className,
}) => {
  const classes = useStyles();

  return (
    <IconUI
      className={clsx(className, classes.icon, { [classes.iconDisabled]: disabled })}
      path={path as never}
      size={1}
      color=""
    />
  );
};

export default Icon;
