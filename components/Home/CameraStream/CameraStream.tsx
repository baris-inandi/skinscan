import React from "react";
import { CameraPreview } from "@awesome-cordova-plugins/camera-preview";

const CameraStream: React.FC = () => {
  let options = {
    x: 0,
    y: 0,
    width: window.screen.width,
    height: window.screen.height,
    camera: CameraPreview.CAMERA_DIRECTION.BACK,
    toBack: false,
    tapPhoto: true,
    tapFocus: false,
    previewDrag: false,
    storeToFile: false,
    disableExifHeaderStripping: false,
  };

  CameraPreview.startCamera(options);
  CameraPreview.show();
  return <div className="w-screen h-screen"></div>;
};

export default CameraStream;
