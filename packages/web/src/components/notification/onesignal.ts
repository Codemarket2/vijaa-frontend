import OneSignal from 'react-onesignal';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useOneSignal = () => {
  const { authenticated, attributes } = useSelector(({ auth }: any) => auth);
  useEffect(() => {
    OneSignal.init({
      appId: process.env.ONE_SIGNAL_APP_ID, //deployed api key will be replaced by env
      // appId: '7f0f54e4-44c9-44a1-a143-452fcef5ef9b', // Local testing

      safari_web_id: 'web.onesignal.auto.235723f6-f2ef-49f2-bb5e-e966332d4e54',
      // notifyButton: {
      //   enable: true,
      // },
      // allowLocalhostAsSecureOrigin: true, // this is for local testing only
    });
  }, []);
  useEffect(() => {
    if (authenticated) {
      OneSignal.setExternalUserId(attributes['custom:_id']);
      console.log('subs: ' + attributes['custom:_id']);
    } else {
      OneSignal.removeExternalUserId();
    }
  }, [authenticated]);
  return null;
};
