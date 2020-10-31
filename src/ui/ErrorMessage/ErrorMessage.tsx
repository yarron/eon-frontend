import React, { FC } from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => (
  <div>
    Error!
    {message}
  </div>
);

export default ErrorMessage;
