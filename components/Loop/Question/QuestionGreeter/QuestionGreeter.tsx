import React, { useState, useEffect } from "react";
import SkButton from "../../../global/SkButton";

interface Props {
  title: string;
  content: string;
  btnContent: string;
  overrideFunction?: () => void;
  secondaryButtonContent?: string;
  secondaryButtonFunction?: () => void;
  top: React.ReactElement;
}

const Greeter: React.FC<Props> = (props) => {
  const [elemFilter, setElemFilter] = useState("none");
  const [drawerStyle, setDrawerStyle] = useState<any>({
    transform: "translateY(100%)",
  });

  useEffect(() => {
    setDrawerStyle({
      transform: "translateY(0)",
    });
  }, []);

  return (
    <div
      className="rounded-t-3xl top-16 pb-16 duration-500 w-screen h-screen fixed left-0 font-sk px-12 text-center bg-sk-bg transition-all ease-in-out shadow-2xl"
      style={{
        zIndex: 99,
        filter: elemFilter,
        ...drawerStyle,
      }}
    >
      {props.top && (
        <div className="pt-6 h-0">
          <div className="h-0">{props.top}</div>
        </div>
      )}
      <div className="flex flex-col w-full h-full items-center justify-center">
        <h1 className="px-2 font-medium text-4xl pb-7">{props.title}</h1>
        <p>{props.content}</p>
      </div>
      <div className="fixed bottom-0 safe-area-bottom mb-16 left-0 w-screen h-fit-contents flex items-center justify-center">
        <div className="w-full py-8 px-7 flex gap-4">
          <SkButton
            onClick={() => {
              props.overrideFunction ? props.overrideFunction() : () => {};
            }}
            fill
            snug={props.secondaryButtonContent !== undefined}
          >
            {props.btnContent}
          </SkButton>
          {props.secondaryButtonContent && (
            <SkButton
              onClick={() => {
                props.secondaryButtonFunction
                  ? props.secondaryButtonFunction()
                  : () => {};
              }}
              fill
              snug={props.secondaryButtonContent !== undefined}
            >
              {props.secondaryButtonContent}
            </SkButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Greeter;
