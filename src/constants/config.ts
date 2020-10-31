const config = {
  graphql: {
    url: process.env.REACT_APP_ENDPOINT as string,
  },
  app: {
    cache: false,
  },
};

export default config;
