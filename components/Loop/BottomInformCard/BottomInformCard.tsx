import React from "react";
import SkButton from "../../global/SkButton";

interface Props {
  title: string;
  content: string;
  btnText: string;
  err?: boolean;
  onClick: () => void;
}

const BottomInformCard: React.FC<Props> = (props) => {
  return (
    <div
      className={`z-50 p-12 pb-16 fixed w-screen bottom-0 shadow-xl ${
        props.err ? "bg-sk-err-bg text-sk-err-fg" : "bg-sk-bg text-sk-fg"
      }`}
      style={{
        borderRadius: "40px 40px 0 0",
      }}
    >
      <h2 className="text-2xl font-sk font-medium pb-3">{props.title}</h2>
      <p className="pb-5">{props.content}</p>
      <SkButton
        overrideColors={
          props.err ? "bg-sk-err-fg text-sk-err-bg" : "bg-sk-fg text-sk-bg"
        }
        snug
        onClick={props.onClick}
      >
        {props.btnText}
      </SkButton>
    </div>
  );
};

export default BottomInformCard;
