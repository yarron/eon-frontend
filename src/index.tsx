import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { persistCache } from 'apollo-cache-persist';
import {
  ApolloClient, InMemoryCache, ApolloProvider, HttpLink,
} from '@apollo/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';

import App from '@/app';
import theme from '@/theme';
import { typeDefsLocal, resolversLocal, cacheLocal } from '@/gql';
import * as serviceWorker from '@/serviceWorker';
import { LoadingCircle } from '@/ui';
import appConfig from '@/constants/config';

const httpLink = new HttpLink({ uri: process.env.REACT_APP_ENDPOINT });

const Component = () => {
  const [state, setState] = useState<{ loaded: boolean; client: ApolloClient<unknown> | null }>({
    loaded: false,
    client: null,
  });

  useEffect(() => {
    getCache();
  }, []);

  return state.loaded ? (
    <ApolloProvider client={state.client as ApolloClient<unknown>}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  ) : (
    <LoadingCircle isLoading={!state.loaded} />
  );

  async function getCache() {
    const cache = new InMemoryCache();
    cache.writeQuery(cacheLocal);

    const client = new ApolloClient({
      cache,
      connectToDevTools: true,
      link: httpLink,
      typeDefs: typeDefsLocal,
      resolvers: resolversLocal,
    });

    if (appConfig.app.cache) {
      await persistCache({ cache, storage: window.localStorage } as never);
    }

    setState({
      loaded: true,
      client,
    });
  }
};

serviceWorker.unregister();

ReactDOM.render(<Component />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./app', () => {
    ReactDOM.render(<Component />, document.getElementById('root'));
  });
}
