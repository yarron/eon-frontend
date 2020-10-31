import { IMutationAddAuthArgs, IQuery } from '../types/dynamicLocal';

import { GET_AUTH } from '../query/common';
import { responseResolverSuccess, responseResolverFail } from './utils';
import { IResolverContext } from './types';

const addAuth = (
  _root: object, variables: IMutationAddAuthArgs, { cache }: IResolverContext,
) => {
  const cacheData = cache.readQuery<IQuery>({ query: GET_AUTH });

  if (cacheData?.getAuth) {
    cache.writeQuery({
      query: GET_AUTH,
      data: {
        getAuth: {
          ...cacheData?.getAuth,
          ...variables,
        },
      },
    });
    return responseResolverSuccess('Email added successfully!');
  }
  return responseResolverFail('Error: Email error!');
};

export default addAuth;
