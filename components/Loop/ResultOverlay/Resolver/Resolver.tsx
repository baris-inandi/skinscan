import React, { useEffect, useState } from "react";
import { get, createStore } from "../../../../lib/store/store";
import { logout } from "../../../../lib/auth";
import Analysis from "./Analysis/Analysis";
import ISkAnalysis from "../Interface/ISkAnalysis";
import Router from "next/router";
import BottomInformCard from "../../BottomInformCard/BottomInformCard";

interface Props {
  id: string;
}

export const ResultOverlay: React.FC<Props> = (props) => {
  interface ICardProps {
    title: string;
    content: string;
    btnText: string;
    onClick: () => void;
  }

  const maxRequests = 50;
  const requestIntervalSeconds = 3;

  const [cardProps, setCardProps] = useState<ICardProps>({
    title: "Loading...",
    content: "We're analyzing your image. This might take up to a few minutes",
    btnText: "Cancel",
    onClick: () => {
      Router.replace("/");
    },
  });

  const [isError, setIsError] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [analysis, setAnalysis] = useState<ISkAnalysis | undefined>(undefined);
  useEffect(() => {
    const f = async () => {
      await createStore("__sk_store");
      if (props.id == "undefined" || isLooping) {
        return;
      }
      setIsLooping(true);
      let n = 0;
      let interval = setInterval(async () => {
        n++;
        console.log("request number", n);
        if (n > maxRequests) {
          setIsError(true);
          clearInterval(interval);
          console.log("cleared interval, max requests reached");
          setCardProps({
            title: "Sorry",
            content:
              "It's taking too long for our servers to respond. Please try again later.",
            btnText: "OK",
            onClick: () => {
              Router.replace("/");
            },
          });
          return;
        }
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
            const skAnalysis = {
              probs,
              wiki,
            };
            setAnalysis(skAnalysis);
          }
        }
      }, requestIntervalSeconds * 1000);
    };
    f();
  }, [props, isLooping]);

  return (
    <>
      <Analysis analysis={analysis} />
      {!analysis && <BottomInformCard err={isError} {...cardProps} />}
    </>
  );
};

export default ResultOverlay;
