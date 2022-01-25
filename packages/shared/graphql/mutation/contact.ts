import { gql } from '@apollo/client';

export const CREATE_CONTACT = gql`
  mutation MyMutation(
    $businessName: String
    $email: String!
    $firstName: String!
    $lastName: String
    $phone: String
    $title: String
    $extraField: [extraFieldNameInput]
  ) {
    createContact(
      email: $email
      firstName: $firstName
      lastName: $lastName
      title: $title
      businessName: $businessName
      extraField: $extraField
      phone: $phone
    ) {
      businessName
      email
      lastName
      firstName
      title
      phone
      _id
      extraField {
        fieldName
        fieldValue
      }
    }
  }
`;
