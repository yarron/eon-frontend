import { gql } from '@apollo/client';

const GET_PHONEBOOK = gql`
  query phonebook {
    phonebook {
      id
      firstName
      lastName
      email
      address
      phone
    }
  }
`;

export const ADD_PHONEBOOK = gql`
  mutation AddPhonebook($doc: PhoneBookInput!) {
    addPhonebook (doc: $doc) {
      code
      message
      success
    }
  }
`;

export const EDIT_PHONEBOOK = gql`
  mutation EditPhonebook($doc: PhoneBookInput!) {
    editPhonebook (doc: $doc) {
      code
      message
      success
    }
  }
`;

export const DELETE_PHONEBOOK = gql`
  mutation DeletePhonebook($id: ID!) {
    deletePhonebook (id: $id) {
      code
      message
      success
    }
  }
`;

export default GET_PHONEBOOK;
