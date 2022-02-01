import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSubscription } from '@apollo/client';
import { NOTIFICATION_SUB } from '../../graphql/subscription/notification';
import { client as apolloClient } from '../../graphql/index';
import { GET_NOTIFICATION_LIST } from '../../graphql/query/notifications';

export const useNotificationSub = () => {
  const [state, setState] = useState({
    showNotification: null,
    notifications: {},
    showSnack: false,
    title: 'New Notification',
    description: 'Sumi commented on your post',
    threadId: '',
    link: '',
  });

  const { attributes } = useSelector((reduxState: any) => reduxState?.auth);
  const { data, error } = useSubscription(NOTIFICATION_SUB, {
    variables: { userId: attributes['custom:_id'] },
  });

  useEffect(() => {
    if (data?.notificationSub) {
      console.log('data.NotifSub', data?.notificationSub);
      updateCache(data?.notificationSub);
      let temp = [];
      if (state.notifications[data.notificationSub.threadId]) {
        temp = [data.notificationSub, ...state.notifications[data.notificationSub.threadId]];
      } else {
        temp = [data.notificationSub];
      }
      setState({
        ...state,
        notifications: { ...state.notifications, [data.notificationSub.threadId]: temp },
        showSnack: true,
        title: data?.notificationSub?.title,
        description: data?.notificationSub?.description,
        threadId: data?.notificationSub?.threadId,
        link: data?.notificationSub?.link,
      });
    }
  }, [data]);

  return { state, setState };
};

const updateCache = (newNotification) => {
  const oldData = apolloClient.readQuery({
    query: GET_NOTIFICATION_LIST,
  });

  let data = { getNotificationList: [] };
  if (oldData?.getNotificationList) {
    data = oldData;
  }
  const newData = {
    ...data,
    getNotificationList: [...data?.getNotificationList, newNotification].sort(
      (a, b) => a.lastNotification.createdAt?.getTime() - b.lastNotification.createdAt.getTime(),
    ),
  };

  console.log('New Data', newData);

  apolloClient.writeQuery({
    query: GET_NOTIFICATION_LIST,
    data: newData,
  });
};
