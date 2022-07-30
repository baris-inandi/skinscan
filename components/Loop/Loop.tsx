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
        style={{
          backgroundImage: `url("${datauri}")`,
          filter: "brightness(75%)",
        }}
        className="w-screen h-screen bg-no-repeat bg-cover"
      />
    </div>
  );
};

export default Loop;
