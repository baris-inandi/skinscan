import React, { useEffect, useState } from "react";
import useSkAPI from "../../../hooks/useSkAPI";
import SkButton from "../../global/SkButton";
import NotchLogo from "../../global/NotchLogo";
import Router from "next/router";
import { createStore, get } from "../../../lib/store/store";
import { logout } from "../../../lib/auth";

const InitialOverlay: React.FC = () => {
  const { takePhoto } = useSkAPI();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const f = async () => {
      await createStore();
      const email = String(await get("currentUserEmail"));
      setEmail(email);
    };
    f();
  }, [setEmail]);

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
        <div className="m-2 border border-sk-sub text-xs p-1 rounded-full flex items-center justify-between gap-2">
          <span className="text-sk-sub pl-4 font-medium">Logout</span>
          <div className="uppercase text-sm rounded-full flex items-center justify-center font-medium font-sk bg-sk-err-bg h-7 w-7 text-sk">{`${email.slice(
            0,
            1
          )}`}</div>
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
                  Router.replace(`/loop/${r.id}`);
                  return;
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
