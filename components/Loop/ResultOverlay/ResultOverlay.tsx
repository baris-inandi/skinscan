import React, { useState } from "react";
import Resolver from "./Resolver/Resolver";

interface Props {
  id: string;
}

const ResultOverlay: React.FC<Props> = (props) => {
  return (
    <div>
      <Resolver id={props.id} />
    </div>
  );
};

export default ResultOverlay;
