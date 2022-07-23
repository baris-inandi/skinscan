import React from "react";

interface Props {
  layer: number;
  title: string;
  content: string;
  btnContent: string;
}

const Greeter: React.FC<Props> = (props) => {
  return (
    <div
      style={{ zIndex: props.layer + 999 }}
      className="h-screen w-screen fixed top-0 left-0 font-bold text-xl"
    >
      {props.title}
    </div>
  );
};

export default Greeter;
