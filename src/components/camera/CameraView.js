import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, AppState, StatusBar} from 'react-native';
import {Camera} from 'react-native-vision-camera';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {useCameraCapture, useCameraPermissions} from '../../hooks';
import {CameraControls} from './index';
import {fallBack} from '../../utils/helpers';

const backgroundColor = 'rgba(0, 27, 81, 0.9)';

/**
 * CameraView component renders the camera with controls and handles
 * photo and video capture functionality.
 *
 * @component
 * @param {Object} props
 * @param {Function} props.onCapture - Callback function to handle captured photo or video.
 * @param {Function} props.onError - Callback function to handle errors during recording.
 */
const CameraView = ({onCapture = fallBack, onError = fallBack}) => {
  const cameraRef = useRef(null);
  const hasPermission = useCameraPermissions();
  const appState = useRef(AppState.currentState);
  const {
    capturePhoto,
    switchCamera,
    startRecording,
    stopRecording,
    isRecording,
    device,
    format,
  } = useCameraCapture(cameraRef);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  /**
   * Handles taking a photo.
   * Invokes the capturePhoto function from useCameraCapture hook and calls onCapture with the photo data.
   */
  const onTakePhoto = async () => {
    const photo = await capturePhoto();
    onCapture(photo);
  };

  /**
   * Toggles video recording.
   * Starts or stops recording based on the current recording state and calls respective callback functions.
   */
  const toggleRecording = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording(onRecordingSuccess, onRecordingError);
    }
  };

  /**
   * Callback when recording is successful.
   * @param {Object} video - The recorded video data.
   */
  const onRecordingSuccess = video => {
    onCapture(video);
  };

  /**
   * Callback when an error occurs during recording.
   * @param {Error} error - The error object.
   */
  const onRecordingError = error => {
    onError(error);
  };

  if (!device) {
    return <Text style={styles.centerText}>Loading Camera...</Text>;
  }

  if (!hasPermission) {
    return <Text style={styles.centerText}>Camera permission required.</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={appState.current === 'active'}
        format={format}
        photo
        video
      />
      <CameraControls
        onCapture={onTakePhoto}
        onSwitch={switchCamera}
        onRecording={toggleRecording}
        recordingText={isRecording ? 'Recording' : 'Record'}
      />
      <StatusBar
        backgroundColor={'transparent'}
        barStyle="light-content"
        translucent={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: backgroundColor,
  },
  centerText: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: backgroundColor,
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
});

export default CameraView;
