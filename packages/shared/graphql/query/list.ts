import { gql } from '@apollo/client';

export const GET_LIST_TYPES = gql`
  query MyQuery($limit: Int, $page: Int, $search: String) {
    getListTypes(limit: $limit, page: $page, search: $search) {
      count
      data {
        _id
        slug
        title
        description
        media {
          url
          caption
        }
        inUse
        active
      }
    }
  }
`;

export const GET_LIST_ITEMS_BY_TYPE = gql`
  query MyQuery($limit: Int, $page: Int, $types: [ID], $search: String) {
    getListItems(limit: $limit, page: $page, types: $types, search: $search) {
      count
      data {
        _id
        slug
        title
        description
        types {
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

export const GET_LIST_TYPE_BY_SLUG = gql`
  query MyQuery($slug: String!) {
    getListTypeBySlug(slug: $slug) {
      _id
      slug
      title
      description
      media {
        url
        caption
      }
      inUse
      active
    }
  }
`;

export const GET_LIST_ITEM_BY_SLUG = gql`
  query MyQuery($slug: String!) {
    getListItemBySlug(slug: $slug) {
      _id
      active
      authenticateUser
      slug
      title
      description
      media {
        url
        caption
      }
      layouts
      types {
        _id
        title
        slug
      }
    }
  }
`;

export const GET_LIST_ITEM_WITH_FIELD_BY_SLUG = gql`
  query MyQuery($slug: String!) {
    getListItemWithFieldsBySlug(slug: $slug) {
      listItem {
        _id
        title
        slug
        types {
          _id
          slug
          title
        }
        active
        authenticateUser
        description
        media {
          caption
          url
        }
      }
      fields {
        _id
        position
        label
        fieldType
        multipleValues
        oneUserMultipleValues
        typeId {
          _id
          title
          slug
        }
        fieldValues {
          _id
          parentId
          field
          value
          valueDate
          valueNumber
          valueBoolean
          media {
            caption
            url
          }
          itemId {
            _id
            title
            slug
          }
          createdAt
          createdBy {
            _id
          }
        }
      }
    }
  }
`;
