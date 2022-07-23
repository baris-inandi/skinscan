import React from "react";
import { CameraPreview } from "@awesome-cordova-plugins/camera-preview";

const CameraStream: React.FC = () => {
  let options = {
    x: 100,
    y: 100,
    width: window.screen.width,
    height: window.screen.height,
    camera: CameraPreview.CAMERA_DIRECTION.BACK,
    toBack: false,
    tapPhoto: false,
    tapFocus: true,
    previewDrag: false,
    storeToFile: false,
    disableExifHeaderStripping: false,
  };

  CameraPreview.startCamera(options);
  CameraPreview.show();
  return <div className="w-screen h-screen bg-sk"></div>;
};

export default CameraStream;
