import React from "react";

interface Props {
  negative?: boolean;
}

const NotchLogo: React.FC<Props> = (props) => {
  return (
    <div className={`h-0 ${props.negative ? "text-sk-bg" : "text-sk-fg"}`}>
      <div className="w-full text-center font-sk safe-area-top">
        <div className="pt-2 text-base">skinscan</div>
      </div>
    </div>
  );
};

export default NotchLogo;
