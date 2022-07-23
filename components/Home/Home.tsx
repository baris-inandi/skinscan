import React from "react";
import InitialOverlay from "./InitialOverlay/InitialOverlay";
import CameraStream from "./CameraStream/CameraStream";

const Home: React.FC = () => {
  return (
    <div>
      <CameraStream />
      <InitialOverlay />;
    </div>
  );
};

export default Home;
