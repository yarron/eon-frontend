import { GET_LOCAL_CACHE } from '../query/common';
import getAuth from './auth';

const cacheLocal = {
  query: GET_LOCAL_CACHE,
  data: {
    getAuth,
    getNotifications: [],
  },
};

export default cacheLocal;
