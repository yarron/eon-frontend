import { gql } from '@apollo/client';

export const GET_LOCAL_CACHE = gql`
  query GetLocalCache {
    getAuth @client
    getNotifications @client
  }
`;

export const GET_AUTH = gql`
  query GetAuth {
    getAuth @client
  }
`;

export const ADD_AUTH = gql`
  mutation AddAuth {
    addAuth(email: $email, groups: $groups) @client
  }
`;
