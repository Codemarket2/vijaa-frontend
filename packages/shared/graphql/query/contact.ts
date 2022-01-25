import { gql } from '@apollo/client';

export const GET_ALL_CONTACTS = gql`
  query MyQuery {
    getAllContacts {
      count
      data {
        _id
        businessName
        firstName
        title
        phone
        lastName
        email
        extraField {
          fieldName
          fieldValue
        }
      }
    }
  }
`;
