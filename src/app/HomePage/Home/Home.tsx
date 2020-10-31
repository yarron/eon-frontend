import GET_COUNTRIES from '@/gql/query/external';
import { useQuery } from '@apollo/client';
import React, { FC } from 'react';

const Home: FC = () => {
  const { data } = useQuery(GET_COUNTRIES);
  console.log('countries', data);
  return (<h2>HomePage</h2>);
};

export default Home;
