import dynamic from "next/dynamic";
import React from "react";

const App = dynamic(() => import("../components/Index"), {
  ssr: false,
});

export default function Index() {
  return <App />;
}
