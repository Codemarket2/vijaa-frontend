import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSubscription } from '@apollo/client';
import { NOTIFICATION_SUB } from '../../graphql/subscription/notification';

export const useNotificationSub = () => {
  const [state, setState] = useState({
    showNotification: null,
    notifications: {},
    showSnack: false,
    title: 'New Notification',
    description: 'Sumi commented on your post',
    link: '',
  });
  const [audio] = useState(typeof Audio !== 'undefined' && new Audio('/notification.mp3'));
  const { attributes } = useSelector((reduxState: any) => reduxState?.auth);
  const { data, error } = useSubscription(NOTIFICATION_SUB, {
    variables: { userId: attributes['custom:_id'] },
  });

  useEffect(() => {
    if (data?.notificationSub) {
      audio.play();
      let temp = [];
      if (state.notifications[data.notificationSub.formId]) {
        temp = [data.notificationSub, ...state.notifications[data.notificationSub.formId]];
      } else {
        temp = [data.notificationSub];
      }
      setState({
        ...state,
        notifications: { ...state.notifications, [data.notificationSub.formId]: temp },
        showSnack: true,
        title: data?.notificationSub?.title,
        description: data?.notificationSub?.description,
        link: data?.notificationSub?.link,
      });
    }
  }, [data]);

  return { state, setState };
};
