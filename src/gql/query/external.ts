import { gql } from '@apollo/client';

const GET_COUNTRIES = gql`
  query countries {
    countries {
      nodes {
        id
        shortName
        fullName
      }
    }
  }
`;

export default GET_COUNTRIES;
