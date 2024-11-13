import {useEffect, useState} from 'react';
import {Camera} from 'react-native-vision-camera';

/**
 * Custom hook to request and check camera permissions.
 *
 * @returns {boolean} hasPermission - Indicates whether the app has been granted camera access.
 */
export const useCameraPermissions = () => {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    })();
  }, []);

  return hasPermission;
};
