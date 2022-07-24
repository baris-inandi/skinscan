import React from "react";

const How: React.FC = () => {
  const title: React.FC<{ title: string }> = (props) => {
    return <h1 className="text-3xl font-medium">{props.title}</h1>;
  };
  return <div>Upload your Photo</div>;
};

export default How;
