import React, { useState } from "react";
import Greeter from "../FirstTime/Greeter/Greeter";

const Question: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const kill = () => {
    setVisible(false);
  };
  return (
    <div className={visible ? "z-50" : "hidden"}>
      <Greeter
        order={1}
        title="Does it itch?"
        content="This question helps us understand your situation better."
        btnContent="No"
        overrideFunction={() => {
          kill();
        }}
        secondaryButtonContent="Yes"
        secondaryButtonFunction={() => {
          kill();
        }}
      />
    </div>
  );
};

export default Question;
