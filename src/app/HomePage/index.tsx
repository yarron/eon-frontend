import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Home } from './Home';

const HomePage: FC = () => (
  <>
    <Helmet title="HomePage" />
    <Home />
  </>
);

export default HomePage;
