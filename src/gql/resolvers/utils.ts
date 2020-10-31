import Maybe from 'graphql/tsutils/Maybe';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const responseResolverSuccess = (message = '', payload?: Maybe<any>) => ({
  code: 200,
  success: true,
  message,
  ...payload,
});

export const responseResolverFail = (message = '', payload?: Maybe<any>) => ({
  code: 500,
  success: false,
  message,
  ...payload,
});
