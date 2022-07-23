import React from "react";
import Greeter from "./Greeter/Greeter";

const FirstTime: React.FC = () => {
  return (
    <div className="h-screen w-screen">
      <Greeter
        key={1}
        layer={1}
        title="hi"
        content="ho"
        btnContent="continue"
      />
      <Greeter
        key={2}
        layer={2}
        title="hi"
        content="ho"
        btnContent="continue"
      />
      <Greeter
        key={3}
        layer={3}
        title="hi"
        content="ho"
        btnContent="continue"
      />
      <Greeter
        key={4}
        layer={4}
        title="hi"
        content="ho"
        btnContent="continue"
      />
    </div>
  );
};

export default FirstTime;
