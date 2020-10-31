import { loader } from 'graphql.macro';
import cacheLocal from './cache';
import resolversLocal from './resolvers';

const typeDefsLocal = loader('./scheme/_dynamicLocal.graphql');

export {
  typeDefsLocal,
  cacheLocal,
  resolversLocal,
};
