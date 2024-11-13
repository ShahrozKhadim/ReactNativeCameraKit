import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

/**
 * CameraControls component provides buttons to switch the camera, capture a photo, and start/stop recording.
 *
 * @component
 * @param {Object} props
 * @param {Function} props.onSwitch - Handler function to switch between front and back cameras.
 * @param {Function} props.onCapture - Handler function to capture a photo.
 * @param {Function} props.onRecording - Handler function to start or stop video recording.
 * @param {string} [props.recordingText='Record'] - Text displayed on the recording button.
 */
const CameraControls = ({
  onSwitch,
  onCapture,
  onRecording,
  recordingText = 'Record',
}) => (
  <View style={styles.container}>
    <Text style={styles.text} onPress={onSwitch}>
      Switch Camera
    </Text>
    <Text style={styles.text} onPress={onCapture}>
      Capture
    </Text>
    <Text style={styles.text} onPress={onRecording}>
      {recordingText}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: wp('100%'),
    height: hp('15%'),
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text: {
    color: '#ffffff',
    borderRadius: wp('50%'),
    padding: wp('3%'),
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default CameraControls;
