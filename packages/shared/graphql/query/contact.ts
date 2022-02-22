import { gql } from '@apollo/client';

export const GET_ALL_CONTACTS = gql`
  query MyQuery($parentId: ID, $page: Int, $limit: Int, $search: String, $formField: ID) {
    getAllContacts(
      parentId: $parentId
      page: $page
      limit: $limit
      search: $search
      formField: $formField
    ) {
      count
      data {
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
