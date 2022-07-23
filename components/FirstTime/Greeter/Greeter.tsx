import React, { useEffect } from "react";
import SkButton from "../../global/SkButton";

interface Props {
  order: number;
  title: string;
  content: string;
  btnContent: string;
}

const Greeter: React.FC<Props> = (props) => {
  const [posX, setPosX] = React.useState("0%");
  const [elemFilter, setElemFilter] = React.useState("none");
  return (
    <div
      className="w-screen h-screen fixed top-0 left-0 font-sk px-12 text-center bg-sk-bg transition-all duration-700 ease-in-out shadow-xl rounded-3xl"
      style={{
        zIndex: 1000 - props.order,
        transform: `translateX(${posX})`,
        filter: elemFilter,
      }}
    >
      <div className="flex flex-col w-full h-full items-center justify-center">
        <h1 className="px-2 font-medium text-4xl pb-7">
          {props.title}
        </h1>
        <p>{props.content}</p>
      </div>
      <div className="fixed bottom-0 left-0 w-screen h-fit-contents flex items-center justify-center">
        <div className="w-full py-8 px-7">
          <SkButton
            onclick={() => {
              setPosX("-150%");
              setElemFilter("brightness(2)");
            }}
            fill
          >
            {props.btnContent}
          </SkButton>
        </div>
      </div>
    </div>
  );
};

export default Greeter;
