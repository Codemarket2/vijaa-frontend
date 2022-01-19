import { gql } from '@apollo/client';

export const GET_MY_NOTIFICATIONS = gql`
  query MyQuery($formId: ID!) {
    getMyNotifications(formId: $formId) {
      count
      data {
        userId
        title
        description
        link
      }
    }
  }
`;

export const GET_NOTIFICATION_LIST = gql`
  query MyQuery {
    getNotificationList {
      lastNotification {
        userId
        title
        description
        link
        formId
        parentId
      }
      _id
      notificationCount
    }
  }
`;
