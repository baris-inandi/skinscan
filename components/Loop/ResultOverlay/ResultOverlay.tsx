import React, { useState } from "react";
import Resolver from "./Resolver/Resolver";
import ISkAnalysis from "./Interface/ISkAnalysis";

interface Props {
  id: string;
}

const ResultOverlay: React.FC<Props> = (props) => {
  const [analysis, setAnalysis] = useState<ISkAnalysis | undefined>(undefined);
  return (
    <div>
      <Resolver id={props.id} analysisSetter={setAnalysis} />
    </div>
  );
};

export default ResultOverlay;
