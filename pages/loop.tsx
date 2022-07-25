import dynamic from "next/dynamic";
import React from "react";

const App = dynamic(() => import("../components/Loop/Loop"), {
  ssr: false,
});

export default function Loop() {
  return <App />;
}
