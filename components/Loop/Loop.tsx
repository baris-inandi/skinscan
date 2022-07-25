import React, { useEffect, useState } from "react";
import Router from "next/router";
import ResultOverlay from "./ResultOverlay/ResultOverlay";
import { createStore, get } from "../../lib/store/store";

const Loop: React.FC = () => {
  const [datauri, setDatauri] = useState("");

  useEffect(() => {
    const f = async () => {
      await createStore("__sk_store");
      setDatauri(String(await get("lastDatauri")));
    };
    f();
  }, [setDatauri]);

  console.log(datauri);

  console.log(Router.query.img);
  return (
    <div>
      <ResultOverlay id={String(Router.query.id)} />
      <div
        style={{
          backgroundImage: `url("${datauri}")`,
        }}
        className="w-screen h-screen"
      ></div>
    </div>
  );
};

export default Loop;
