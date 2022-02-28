import { gql } from '@apollo/client';

export const GET_ALL_CONTACTS = gql`
  query MyQuery($page: Int, $limit: Int) {
    getAllContacts(page: $page, limit: $limit) {
      _id
      businessName
      city
      createdAt
      email
      firstName
      groupName
      lastName
      phone
      title
      updatedAt
    }
  }
`;

export const GET_CONTACT = gql`
  query MyQuery($_id: ID!) {
    getContact(_id: $_id) {
      _id
      parentId {
        _id
        title
      }
      values {
        _id
        field
        value
        values
        valueNumber
        valueBoolean
        valueDate
        itemId {
          _id
          title
          slug
        }
        media {
          url
          caption
        }
        response {
          _id
          values {
            field
            value
          }
        }
      }
      createdBy {
        _id
        picture
        name
      }
      createdAt
    }
  }
`;
