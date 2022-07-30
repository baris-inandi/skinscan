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
    <div className="transition duration-300">
      <div
        className={`rounded-3xl font-sk z-50 px-11 pt-12 pb-14 m-3 left-0 fixed bottom-0 shadow-xl ${
          props.err ? "bg-sk-err-bg text-sk-err-fg" : "bg-sk-bg text-sk-fg"
        }`}
      >
        <h2 className="text-2xl font-medium pb-3">{props.title}</h2>
        <p className="pb-9">{props.content}</p>
        <SkButton
          fill
          overrideColors={
            props.err ? "bg-sk-err-fg text-sk-err-bg" : "bg-sk-fg text-sk-bg"
          }
          onClick={props.onClick}
        >
          {props.btnText}
        </SkButton>
      </div>
    </div>
  );
};

export default BottomInformCard;
