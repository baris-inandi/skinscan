import React from "react";
import Router from "next/router";
import ResultOverlay from "./ResultOverlay/ResultOverlay";

const Loop: React.FC = () => {
  let datauri = "";
  const _id = Router.query.id;
  console.log(Router.query.img);
  return (
    <div>
      <ResultOverlay id={String(_id)} />
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
