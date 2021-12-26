import OneSignal from 'react-onesignal';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useOneSignal = () => {
  const { authenticated, attributes } = useSelector(({ auth }: any) => auth);
  useEffect(() => {
    OneSignal.init({
      appId: '4df61c29-3a8e-4f98-911d-f07d6c28cfa1', //deployed
      // appId: 'fef9838f-e7e4-4ab6-9ffc-d39416678a02', // Localhost
    });
  }, []);
  useEffect(() => {
    if (authenticated) {
      OneSignal.setExternalUserId(attributes.sub);
    } else {
      OneSignal.removeExternalUserId();
    }
  }, [authenticated]);
  return null;
};
