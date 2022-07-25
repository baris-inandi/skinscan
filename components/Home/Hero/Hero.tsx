import React from "react";
import useSkAPI from "../../../hooks/useSkAPI";
import SkButton from "../../global/SkButton";
import NotchLogo from "../../global/NotchLogo";
import Router from "next/router";
import { logout } from "../../../lib/auth";

const InitialOverlay: React.FC = () => {
  const { takePhoto } = useSkAPI();

  return (
    <div>
      <NotchLogo />
      <p className="w-screen fixed bottom-0 pointer-events-none text-center text-sk-sub text-xs pb-2 safe-area-bottom">
        Made with love in Turkey by team line0
      </p>
      <div
        style={{ zIndex: 9 }}
        onClick={logout}
        className="fixed right-0 top-0 safe-area-top self-end"
      >
        <div className="m-2 text-sk-sub font-medium border border-sk-sub text-sm p-2 px-5 rounded-full flex items-center justify-between gap-2">
          Logout
        </div>
      </div>
      <div className="h-screen w-screen fixed top-0 left-0 font-sk">
        <div className="text-center flex flex-col items-center justify-center h-full w-full gap-3">
          <div className="py-6">
            <h1 className="text-5xl">skinscan</h1>
            <p className="text-lg text-sk-sub">Technical demo</p>
          </div>
          <SkButton
            onClick={() => {
              takePhoto(false).then((r) => {
                console.log(r);
                if (r.success) {
                  Router.replace(`/loop?id=${r.id}`);
                }
              });
            }}
          >
            Submit your photo
          </SkButton>
          <SkButton
            outlined
            onClick={() => {
              Router.replace("/how");
            }}
          >
            How does it work?
          </SkButton>
        </div>
      </div>
    </div>
  );
};

export default InitialOverlay;
