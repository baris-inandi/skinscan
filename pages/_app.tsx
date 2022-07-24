import Head from "next/head";
import React, { useEffect, useState } from "react";
import Router from "next/router";

import { defineCustomElements } from "@ionic/pwa-elements/loader";

import { createStore, get, set, clear as clearStore } from "../lib/store/store";
import overrides from "../lib/overrides";

import "@ionic/react/css/core.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import "../styles/global.css";
import "../styles/tailwind.css";
import "../styles/variables.css";

function App({ Component, pageProps }) {
  const [showWelcome, setShowWelcome] = useState(false);
  const [storeAccessed, setStoreAccessed] = useState(false);

  useEffect(() => {
    defineCustomElements(window);
  }, []);

  useEffect(() => {
    const f = async () => {
      let noFirstTime: boolean;
      await createStore("__sk_store");
      if (overrides.forceWelcomeOnStartup) {
        clearStore();
        setShowWelcome(true);
        setStoreAccessed(true);
        noFirstTime = false;
      } else {
        noFirstTime = Boolean(await get("noFirstTime"));
        set("noFirstTime", true);
        setShowWelcome(!noFirstTime);
        setStoreAccessed(true);
      }
      if (noFirstTime && !overrides.overrideMandatoryAuth) {
        const isAuthenticated = Boolean(await get("isAuthenticated"));
        console.log(isAuthenticated);
        if (!isAuthenticated && Router.asPath !== "/onboarding") {
          Router.replace("/accounts/create");
        }
      }
    };
    f();
  }, []);

  if (storeAccessed && showWelcome) {
    Router.replace("/onboarding");
  }

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        ></meta>
      </Head>
      <main className="bg-sk-bg text-sk-fg leading-snug select-none">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default App;
