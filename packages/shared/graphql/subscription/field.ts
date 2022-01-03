import { gql } from '@apollo/client';

export const ADDED_FIELD = gql`
  subscription MySubscription($parentId: ID!) {
    addedField(parentId: $parentId) {
      _id
      parentId
      relationId
      position
      label
      fieldType
      typeId {
        _id
        title
        slug
      }
      multipleValues
      oneUserMultipleValues
    }
  }
`;

export const ADDED_FIELD_VALUE = gql`
  subscription MySubscription($parentId: ID!) {
    addedFieldValue(parentId: $parentId) {
      _id
      parentId
      field
      value
      media {
        url
        caption
      }
      itemId {
        _id
        title
        slug
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
