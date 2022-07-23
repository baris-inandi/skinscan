import React from "react";

interface Props {
  fill?: boolean;
  outlined?: boolean;
  negative?: boolean;
  onclick: () => void;
  children: React.ReactNode;
}

const SkButton: React.FC<Props> = (props) => {
  return (
    <button
      onClick={props.onclick}
      className={`text-center text-lg px-8 py-3 ${
        props.fill && "w-full"
      } cursor-pointer rounded-full font-sk ${
        props.outlined
          ? "border " +
            (props.negative
              ? "border-sk-bg text-sk-bg"
              : "border-sk-fg text-sk-fg")
          : "bg-sk text-sk-bg"
      }`}
    >
      {props.children}
    </button>
  );
};

export default SkButton;
