import React from "react";
import Router from "next/router";

const Loop: React.FC = () => {
  let datauri = "";
  const imgid = Router.query.id
  console.log(Router.query.img);
  return (
    <div>
      <ResultOverlay id={imgid} />
    <div
      style={{
        backgroundImage: `url("${Router.query.img}")`,
      }}
      className="w-screen h-screen"
    ></div>
    </div>
  );
};

export default Loop;
