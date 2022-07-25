import React, { useEffect, useState } from "react";
import { get, createStore } from "../../../lib/store/store";
import { logout } from "../../../lib/auth";

interface Props {
  id: string;
}

export const ResultOverlay: React.FC<Props> = (props) => {
  console.log(props);

  const [isCompleted, setIsComplete] = useState(false);
  const [isLooping, setIsLooping] = useState(false);

  useEffect(
    function () {
      const f = async () => {
        await createStore("__sk_store");
      };
      f();
      if (props.id == "undefined" || isLooping) {
        return;
      }
      setIsLooping(true);
      let interval = setInterval(async function () {
        await createStore("__sk_store");
        const res = await fetch(
          `https://skinscan.withskyfallen.com/status/${props.id}?token=${String(
            await get("currentUserToken")
          )}`
        );
        let rspTxt = await res.text();
        if (rspTxt === "Internal Server Error") {
        logout();
      } else {
        const status = String(JSON.parse(rspTxt).status);
        if(status === "completed"){
          setIsComplete(true)
          clearInterval(interval)
        }
      }
      }, 1000);
    },
    [props, isLooping]
  );

  return <div></div>;
};

export default ResultOverlay;
