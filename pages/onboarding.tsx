import dynamic from "next/dynamic";
import React from "react";

const App = dynamic(() => import("../components/FirstTime/FirstTime"), {
  ssr: false,
});

export default function Index() {
  return <App />;
}
