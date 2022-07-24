import Head from "next/head";
import React, { useEffect, useState } from "react";

import FirstTime from "../components/FirstTime/FirstTime";
import { createStore, get, set, clear as clearStore } from "../store/store";

import "tailwindcss/tailwind.css";
import "@ionic/react/css/core.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import "../styles/global.css";
import "../styles/variables.css";

const forceWelcomeOnStartup = false;

function App({ Component, pageProps }) {
  const [showWelcome, setShowWelcome] = useState(false);
  const [storeAccessed, setStoreAccessed] = useState(false);

  useEffect(() => {
    const setupStore = async () => {
      await createStore("__sk_store");
      if (forceWelcomeOnStartup) {
        clearStore();
        setShowWelcome(true);
        setStoreAccessed(true);
        return;
      }
      const noFirstTimeRaw = await get("noFirstTime");
      const noFirstTime = noFirstTimeRaw === true ? true : false;
      set("noFirstTime", true);
      setShowWelcome(!noFirstTime);
      setStoreAccessed(true);
    };
    setupStore();
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        ></meta>
      </Head>
      {storeAccessed && (
        <>
          {showWelcome !== null && (
            <main className="bg-sk-bg text-sk-fg leading-snug select-none">
              <>
                {showWelcome && <FirstTime />}
                <Component {...pageProps} />
              </>
            </main>
          )}
        </>
      )}
    </>
  );
}

export default App;
