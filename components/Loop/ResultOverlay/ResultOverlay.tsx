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
  const [wikiInfo, setWikiInfo] = useState({});

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
            clearInterval(interval)
            let probs = [];
            for (var disease in resp.data) {
              probs.push([disease, resp.data[disease]]);
            }

            probs.sort(function (a, b) {
              return b[1] - a[1];
            });
            let response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${probs[0][0]}`)
            let wiki = (await response.json())
            setWikiInfo(wiki)
            setIsComplete(true)
          }
        }
      }, 1000);
    },
    [props, isLooping]
  );

  return <div></div>;
};

export default ResultOverlay;
