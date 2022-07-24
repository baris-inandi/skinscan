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
    <div
      onClick={() => {
        takePhoto(false).then((x) => {
          console.log(x);
        });
      }}
    >
      <div className="h-screen w-screen fixed top-0 left-0 font-sk">
        <NotchLogo />
        <div className="text-center flex flex-col items-center justify-center h-full w-full">
          <h1 className="text-4xl py-8">
            Tap to take
            <br />a photo
          </h1>
          <SkButton
            outlined
            onclick={() => {
              Router.replace("/how");
            }}
          >
            How does it work?
          </SkButton>
        </div>
        <div className="bottom-0 right-0 fixed py-10 px-8">
          <div className="w-12 h-12 bg-sk flex items-center justify-center rounded-full shadow-lg backdrop-blur-md">
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
