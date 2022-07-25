import React, { useEffect, useState } from "react";
import { get, createStore } from "../../../../lib/store/store";
import { logout } from "../../../../lib/auth";

interface Props {
  id: string;
  analysisSetter: (analysis: any) => void;
}

export const ResultOverlay: React.FC<Props> = (props) => {
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
          const resp = JSON.parse(rspTxt);
          if (resp.status === "completed") {
            clearInterval(interval);
            let probs: any[] = [];
            for (var disease in resp.data) {
              probs.push([disease, resp.data[disease]]);
            }
            probs.sort((a, b) => {
              return b[1] - a[1];
            });
            let response = await fetch(
              `https://en.wikipedia.org/api/rest_v1/page/summary/${probs[0][0]}`
            );
            let wiki = await response.json();
            props.analysisSetter({
              probs,
              wiki,
            });
          }
        }
      }, 1000);
    },
    [props, isLooping]
  );

  return <></>;
};

export default ResultOverlay;
