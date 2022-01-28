import { gql } from '@apollo/client';

export const CREATE_CONTACT = gql`
  mutation MyMutation($parentId: ID, $values: [FieldValue2Input]) {
    createContact(parentId: $parentId, values: $values) {
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

export const UPDATE_CONTACT = gql`
  mutation MyMutation($_id: ID!, $values: [FieldValue2Input]) {
    updateContact(_id: $_id, values: $values) {
      _id
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
      }
    }
  }
`;

export const DELETE_CONTACT = gql`
  mutation MyMutation($_id: ID!) {
    deleteContact(_id: $_id)
  }
`;
