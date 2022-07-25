import React, { useState } from "react";
import ISkAnalysis from "../../Interface/ISkAnalysis";
import SkButton from "../../../../global/SkButton";
import SkErr from "../../../../global/SkErr";
import Question from "../../../Question";
import Router from "next/router";

interface Props {
  analysis: ISkAnalysis | undefined;
}

const Analysis: React.FC<Props> = (props) => {
  const [insight, setInsight] = useState(false);
  const w = props.analysis?.wiki;
  return (
    <div>
      {insight && (
        <div className="px-10 py-20 font-sk fixed z-40 h-screen w-screen bg-sk-bg">
          <h1 className="pb-8 text-3xl font-medium">{w.displaytitle}</h1>
          <p>{w.extract}</p>
          <div className="py-8">
            <SkButton fill onClick={() => setInsight(false)}>
              Close
            </SkButton>
          </div>
        </div>
      )}
      {props.analysis && (
        <div>
          <Question />
          <div className="px-10 py-20 font-sk fixed z-30 h-screen w-screen bg-sk-bg">
            <h1 className="pb-8 text-3xl font-medium">Your Results</h1>
            <div className="pb-4">
              <h2 className="capitalize text-2xl">
                {props.analysis.probs[0][0]}
              </h2>
              <h3>
                with {parseFloat(props.analysis.probs[0][1]).toFixed(2) * 100}%
                accuracy
              </h3>
            </div>
            <p className="text-sm text-sk-sub">
              {props.analysis.wiki.extract.slice(0, 180)}...
            </p>
            <div className="py-8">
              <SkButton onClick={() => setInsight(true)} snug outlined>
                Get more info on {props.analysis.probs[0][0]}
              </SkButton>
            </div>
            <SkErr
              level="err"
              content="This is solely an AI-generated educated guess that is not reviewed by a dermatologist. Please consult your dermotologist if you feel the need to do so."
            />
            <div className="w-full pb-4 pt-8 text-sk-sub text-center text-xs">
              other possibilities
            </div>
            <div className="text-center pb-8">
              <h2 className="capitalize text-xl">
                {props.analysis.probs[1][0]}
              </h2>
              <h3 className="text-sm">
                with {parseFloat(props.analysis.probs[1][1]).toFixed(2) * 100}%
                accuracy
              </h3>
            </div>
            <SkButton onClick={() => Router.replace("/")} snug fill outlined>
              Done
            </SkButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analysis;
