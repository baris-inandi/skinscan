import React, { useEffect, useState } from "react";
import Router from "next/router";
import Resolver from "./ResultOverlay/Resolver/Resolver";
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
      <Resolver id={String(Router.query.id)} />
      <div
        className="fixed top-0 left-0 w-screen h-screen z-20"
        style={{
          background: "rgba(14,12,10,0.75)",
        }}
      />
      <div
        style={{
          backgroundImage: `url("${datauri}")`,
        }}
        className="w-screen h-screen bg-no-repeat bg-cover"
      />
    </div>
  );
};

export default Loop;
