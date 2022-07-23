import React from "react";
import Greeter from "./Greeter/Greeter";

const FirstTime: React.FC = () => {
  return (
    <div className="h-screen w-screen">
      <Greeter
        order={1}
        title="Welcome To skinscan"
        content="We use AI technology to identify dermatological disorders and diseases and provide insight about them."
        btnContent="Next"
      />
      <Greeter
        order={2}
        title="Upload your photo"
        content="Upload a photo of a sample and let us identify the disease and provide info."
        btnContent="Next"
      />
    </div>
  );
};

export default FirstTime;
