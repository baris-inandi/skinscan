import React, { useEffect, useState } from "react";
import { get } from "../../../lib/store/store";
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
      if (props.id == "undefined" || isLooping) {
        return;
      }
      setIsLooping(true);
      let interval = setInterval(async function () {
        const res = await fetch(
          `https://skinscan.withskyfallen.com/status/${
            props.id
          }?token=${await get("currentUserToken")}`
        );
        let rspTxt = await res.text();
        /*if (rspTxt === "Internal Server Error") {
        logout();
      } else {
        const status = String(JSON.parse(rspTxt).status);
        if(status === "completed"){
          setIsComplete(true)
          clearInterval(interval)
          console.log("processed")
        }
      }*/
      }, 5000);
    },
    [props, isLooping]
  );

  return <div>{props.id}</div>;
};

export default ResultOverlay;
