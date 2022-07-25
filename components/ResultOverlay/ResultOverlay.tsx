import React from "react";

interface Props {
  id: string;
}

// TODO:
/* 
All content should be useState()
should be display:hidden when not resolved
it should be rendered as an overlay, coming from the bottom to the top after all fetches are resolved
*/

export const ResultOverlay: React.FC<Props> = (props) => {
  return <div>{props.id}</div>;
};

export default ResultOverlay;
