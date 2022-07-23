import React from "react";
import Greeter from "./Greeter/Greeter";

const FirstTime: React.FC = () => {
  return (
    <div className="h-screen w-screen">
      <Greeter
        order={1}
        title="Welcome To Skinscan"
        content="We use AI technology to make dermatology more accessible, easy and fast."
        btnContent="Take a Tour"
      />
      <Greeter
        order={2}
        title="Upload your photo"
        content="Skinscan uses its advanced AI model to diagnose skin conditions based on image samples."
        btnContent="Next"
      />
      <Greeter
        order={3}
        title="Answer a few questions"
        content="Skinscan asks you questions about your condition to produce the most accurate results possible."
        btnContent="Next"
      />
      <Greeter
        order={4}
        title="Get insight"
        content="Skinscan provides you with helpful insight about dermatological conditions."
        btnContent="Get started"
      />
    </div>
  );
};

export default FirstTime;
