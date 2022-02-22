import { gql } from '@apollo/client';

export const CREATE_SEND_EMAIL = gql`
  mutation MyMutation(
    $body: String!
    $senderEmail: String!
    $subject: String!
    $receiverEmail: [String]!
  ) {
    createSendEmail(
      body: $body
      senderEmail: $senderEmail
      subject: $subject
      receiverEmail: $receiverEmail
    ) {
      _id
      body
      receiverEmail
      subject
      senderEmail
    }
  }
`;
