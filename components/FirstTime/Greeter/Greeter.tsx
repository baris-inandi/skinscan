import React from "react";
import SkButton from "../../global/SkButton";

interface Props {
  order: number;
  title: string;
  content: string;
  btnContent: string;
  overrideFunction?: () => void;
  secondaryButtonContent?: string;
  secondaryButtonFunction?: () => void;
}

const Greeter: React.FC<Props> = (props) => {
  const [posX, setPosX] = React.useState("0%");
  const [elemFilter, setElemFilter] = React.useState("none");
  const killThis = () => {
    setPosX("-150%");
    setElemFilter("brightness(.5)");
  };
  return (
    <div
      className="w-screen h-screen fixed top-0 left-0 font-sk px-12 text-center bg-sk-bg transition-all duration-1000 ease-in-out shadow-2xl"
      style={{
        outline: "10px solid black",
        zIndex: 1000 - props.order,
        transform: `translateX(${posX})`,
        filter: elemFilter,
      }}
    >
      <div className="flex flex-col w-full h-full items-center justify-center">
        <h1 className="px-2 font-medium text-4xl pb-7">{props.title}</h1>
        <p>{props.content}</p>
      </div>
      <div className="fixed bottom-0 left-0 w-screen h-fit-contents flex items-center justify-center">
        <div className="w-full py-8 px-7 flex gap-4">
          <SkButton
            onclick={() => {
              props.overrideFunction ? props.overrideFunction() : killThis();
            }}
            fill
            snug={props.secondaryButtonContent !== undefined}
          >
            {props.btnContent}
          </SkButton>
          {props.secondaryButtonContent && (
            <SkButton
              onclick={() => {
                props.secondaryButtonFunction
                  ? props.secondaryButtonFunction()
                  : killThis();
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
