import dynamic from "next/dynamic";
import React from "react";

const App = dynamic(() => import("../../components/global/misc/ExampleGangrene"), {
  ssr: false,
});

export default function Loop() {
  return <App />;
}
