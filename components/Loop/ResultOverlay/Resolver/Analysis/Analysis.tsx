import React, { useState } from "react";
import ISkAnalysis from "../../Interface/ISkAnalysis";
import SkButton from "../../../../global/SkButton";
import SkErr from "../../../../global/SkErr";
import Question from "../../../Question";
import Image from "next/image";
import Router from "next/router";
import { IonIcon } from "@ionic/react";
import { alertCircleOutline } from "ionicons/icons";

interface Props {
  analysis: ISkAnalysis | undefined;
}

const Analysis: React.FC<Props> = (props) => {
  const lowConfidenceThreshold = 60;

  const getAccuracy = (rankOfCondition: number): number => {
    return (
      parseFloat(
        parseFloat(props.analysis!.probs[rankOfCondition][1]).toFixed(2)
      ) * 100
    );
  };

  const primaryAccuracy = props.analysis ? getAccuracy(0) : 0;
  const secondaryAccuracy = props.analysis ? getAccuracy(1) : 0;

  const [insight, setInsight] = useState<any>({
    transform: "translateY(100%)",
  });
  const [analysis, setAnalysis] = useState<any>({
    transform: "translateY(0%)",
  });
  const lowConfidence = props.analysis
    ? props.analysis.probs[0][1] <= lowConfidenceThreshold / 100
    : false;
  const w = props.analysis?.wiki;

  return (
    <div className="bg-black">
      {props.analysis && (
        <>
          <div
            style={analysis}
            className="transition duration-500 z-20 h-screen w-screen bg-transparent"
          >
            <Question />
            <div className="overflow-y-auto px-10 py-20 font-sk fixed z-20 h-screen mt-10 rounded-t-3xl w-screen bg-sk-bg">
              <h1 className="pb-8 text-3xl font-medium">Your Results</h1>
              <div className="pb-4 flex items-center justify-between">
                <div>
                  <h2 className="capitalize text-2xl">
                    {props.analysis.probs[0][0]}
                  </h2>
                  <h3 className="flex items-center">
                    with {primaryAccuracy}% accuracy
                  </h3>
                </div>
                {lowConfidence && (
                  <div className="pr-4p">
                    <IonIcon icon={alertCircleOutline} size="large" />
                  </div>
                )}
              </div>
              <p className="text-sm text-sk-sub">
                {props.analysis.wiki.extract.slice(0, 180)}...
              </p>
              <div className="py-8">
                <SkButton
                  onClick={() => {
                    setInsight({ transform: "translateY(-100%)" });
                    setAnalysis({ transform: "translateY(100%)" });
                  }}
                  outlined
                >
                  <span className="capitalize">
                    {props.analysis.probs[0][0] + " "}
                  </span>
                  Insights
                </SkButton>
              </div>
              <div className="flex flex-col gap-3">
                <SkErr
                  level="err"
                  content="This is solely an AI-generated educated guess that is not reviewed by a dermatologist. Please consult your dermotologist if you feel the need to do so."
                />
                {lowConfidence && (
                  <SkErr
                    level="warn"
                    content="The percentage of accuracy of this result is fairly low, note that there is a high chance this result is inaccurate."
                  />
                )}
              </div>

              <div className="flex items-center pt-12 pb-8">
                <div className="border-t border-sk-sub w-full" />
                <div className="flex-shrink-0 px-3 text-sk-sub text-center text-xs">
                  Another possibility:
                </div>
                <div className="border-t border-sk-sub w-full" />
              </div>

              <div className="flex justify-between items-center pb-8">
                <h2 className="capitalize text-xl">
                  {props.analysis.probs[1][0]}
                </h2>
                <h3 className="text-sm">with {secondaryAccuracy}% accuracy</h3>
              </div>
              <div className="pb-8">
                <SkButton onClick={() => Router.replace("/")} fill outlined>
                  Done
                </SkButton>
              </div>
            </div>
          </div>
          <div
            className="transition duration-500 z-30 h-screen w-screen bg-transparent"
            style={insight}
          >
            <div className="overflow-y-auto px-10 py-20 fixed h-screen mt-10 rounded-t-3xl w-screen bg-sk-bg">
              <div className="flex flex-col gap-8">
                <div className="pb-2">
                  <h1 className="font-sk pb-2 text-3xl font-medium">
                    {w.displaytitle}
                  </h1>
                  <p>{w.description}</p>
                </div>
                <div className="border border-gray-300 relative rounded-lg w-full h-56 bg-sk-sub">
                  <Image
                    className="rounded-lg"
                    alt="insights image"
                    layout="fill"
                    objectFit="cover"
                    src={props.analysis?.wiki.thumbnail.source}
                  />
                </div>
                <p dangerouslySetInnerHTML={{ __html: w.extract_html }} />
                <div className="pb-8">
                  <SkButton
                    fill
                    outlined
                    onClick={() => {
                      setInsight({ transform: "translateY(100%)" });
                      setAnalysis({ display: "translateY(0%)" });
                    }}
                  >
                    Close
                  </SkButton>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analysis;
