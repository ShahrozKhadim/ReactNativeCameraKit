import {useState} from 'react';
import {useCameraDevice, useCameraFormat} from 'react-native-vision-camera';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const PHYSICAL_DEVICES = [
  'wide-angle-camera',
  'ultra-wide-angle-camera',
  'telephoto-camera',
];
const SWITCH_CAMERA = {
  true: 'front',
  false: 'back',
};

/**
 * Custom hook to manage camera capture functionalities, including photo capture, video recording, and camera switching.
 *
 * @param {React.MutableRefObject} cameraRef - A reference to the camera instance.
 * @returns {Object} An object containing camera capture functions, states, and device information.
 */
export const useCameraCapture = cameraRef => {
  const [isRecording, setIsRecording] = useState(false);
  const [cameraPosition, setCameraPosition] = useState('back');

  const device = useCameraDevice(cameraPosition, {
    physicalDevices: PHYSICAL_DEVICES,
  });
  const format = useCameraFormat(device, [
    {videoResolution: {width: wp('100%'), height: hp('80%')}},
    {fps: 60},
  ]);

  /**
   * Captures a photo using the camera.
   * @returns {Promise<Object>} The captured photo data.
   */
  const capturePhoto = async () => {
    if (cameraRef.current) {
      return await cameraRef.current.takePhoto();
    }
  };

  /**
   * Starts recording a video.
   * @param {Function} onSuccess - Callback function to handle successful recording.
   * @param {Function} onError - Callback function to handle recording errors.
   */
  const startRecording = async (onSuccess, onError) => {
    if (cameraRef.current) {
      setIsRecording(true);
      await cameraRef.current.startRecording({
        onRecordingFinished: onSuccess,
        onRecordingError: onError,
      });
    }
  };

  /**
   * Stops video recording.
   * @returns {Promise<Object>} The recorded video data.
   */
  const stopRecording = async () => {
    if (cameraRef.current && isRecording) {
      setIsRecording(false);
      return await cameraRef.current.stopRecording();
    }
  };

  /**
   * Toggles the camera position between front and back.
   */
  const switchCamera = () => {
    setCameraPosition(SWITCH_CAMERA[cameraPosition === 'back']);
  };

  return {
    capturePhoto,
    startRecording,
    stopRecording,
    isRecording,
    switchCamera,
    device,
    format,
  };
};
