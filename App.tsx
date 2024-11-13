import React from 'react';

import {CameraView} from './src/components/camera';

/**
 * The root component of the application.
 *
 * Renders the CameraView component to enable camera functionality.
 * @component
 */
const App = () => {
  const onCapture = (media = {}) => {
    console.log({media});
  };

  const onError = (error = {}) => {
    console.error({error});
  };

  return <CameraView onCapture={onCapture} onError={onError} />;
};

export default App;
