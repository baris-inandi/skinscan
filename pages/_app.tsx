import Head from "next/head";
import Script from "next/script";
import React from "react";

import FirstTime from "../components/FirstTime/FirstTime";

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

const isFirstTimeUsing = false;

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        ></meta>
      </Head>
      <main className="bg-sk-bg text-sk-fg leading-snug select-none">
        {isFirstTimeUsing ? <FirstTime /> : <Component {...pageProps} />}
      </main>
    </>
  );
}

export default App;
