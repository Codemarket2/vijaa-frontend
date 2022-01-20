import { gql } from '@apollo/client';

export const CREATE_CONTACT = gql`
  mutation MyMutation(
    $businessName: String
    $email: String!
    $fieldName: String
    $fieldValue: String
    $lastName: String
    $firstName: String
    $mailingListName: String!
    $phone: String
    $title: String
    $extraField: [extraFieldNameInput]
  ) {
    createContact(
      email: $email
      mailingListName: $mailingListName
      lastName: $lastName
      title: $title
      businessName: $businessName
      phone: $phone
      extraField: $extraField
      firstName: $firstName
    ) {
      businessName
      email
      lastName
      firstName
      title
      mailingListName
      extraField {
        fieldName
        fieldValue
      }
      phone
      _id
    }
  }
`;
