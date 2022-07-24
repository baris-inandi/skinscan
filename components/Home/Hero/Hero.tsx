import React from "react";
import useCamera from "../../../hooks/useCamera";
import SkButton from "../../global/SkButton";
import NotchLogo from "../../global/NotchLogo";
import Router from "next/router";
import { IonIcon } from "@ionic/react";
import { images } from "ionicons/icons";

const InitialOverlay: React.FC = () => {
  const { takePhoto } = useCamera();
  return (
    <div>
      <p className="w-screen fixed bottom-0 pointer-events-none text-center text-sk-sub text-xs pb-2 safe-area-bottom">
        Made with love in Turkey by team line0
      </p>
      <div className="h-screen w-screen fixed top-0 left-0 font-sk">
        <NotchLogo />
        <div className="text-center flex flex-col items-center justify-center h-full w-full gap-3">
          <div className="py-6">
            <h1 className="text-5xl">skinscan</h1>
            <p className="text-lg text-sk-sub">Technical demo</p>
          </div>
          <SkButton
            onclick={() => {
              takePhoto(false);
            }}
          >
            Submit your photo
          </SkButton>
          <SkButton
            outlined
            onclick={() => {
              Router.replace("/how");
            }}
          >
            How does it work?
          </SkButton>
        </div>
        <div className="bottom-0 right-0 fixed py-14 px-10 safe-area-bottom">
          <div className="w-12 h-12 bg-sk flex items-center justify-center rounded-2xl">
            <IonIcon
              onClick={() => {
                takePhoto(true);
              }}
              size="medium"
              color="light"
              icon={images}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialOverlay;
