import React from "react";

interface Props {
  fill?: boolean;
  outlined?: boolean;
  negative?: boolean;
  disabled?: boolean;
  snug?: boolean;
  overrideColors?: string;
  type?: "button" | "submit" | "reset";
  onClick: () => void;
  children: React.ReactNode;
}

const SkButton: React.FC<Props> = (props) => {
  return (
    <button
      type={props.type}
      onClick={!props.disabled ? props.onClick : () => {}}
      className={`
      transition duration-200
      text-center ${props.snug ? "text-sm px-7 py-3" : "text-base px-9 py-3"} ${
        props.fill && "w-full"
      } cursor-pointer rounded-full font-sk ${
        props.outlined
          ? "border " +
            (props.negative
              ? "border-sk-bg text-sk-bg"
              : "border-sk-fg text-sk-fg")
          : props.overrideColors
          ? props.overrideColors
          : "bg-sk text-sk-bg"
      }
        ${props.disabled && "opacity-30 pointer-events-none"}`}
    >
      {props.children}
    </button>
  );
};

export default SkButton;
