import React from "react";
import SkButton from "../../global/SkButton";
import Router from "next/router";
import { IonIcon } from "@ionic/react";
import { images } from "ionicons/icons";

const InitialOverlay: React.FC = () => {
  return (
    <div
      style={{
        background: "rgba(0,0,0,.7)",
        zIndex: "99999999999",
      }}
      className="h-screen w-screen fixed top-0 left-0 text-sk-bg font-sk"
    >
      <div className="h-0">
        <div className="w-full text-center font-sk safe-area-top">
          <div className="pt-2 text-base">skinscan</div>
        </div>
      </div>
      <div className="text-center flex flex-col items-center justify-center h-full w-full">
        <h1 className="text-4xl py-8">
          Tap to take
          <br />
          photo
        </h1>
        <SkButton
          outlined
          negative
          onclick={() => {
            Router.replace("/how");
          }}
        >
          How does it work?
        </SkButton>
      </div>
      <div className="bottom-0 right-0 fixed py-10 px-8">
        <div
          style={{ background: "rgba(255,255,255,0.33)" }}
          className="w-11 h-11 flex items-center justify-center rounded-full shadow-lg backdrop-blur-md"
        >
          <IonIcon size="medium" color="light" icon={images} />
        </div>
      </div>
    </div>
  );
};

export default InitialOverlay;
