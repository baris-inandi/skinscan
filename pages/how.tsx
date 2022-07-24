import dynamic from "next/dynamic";
import React from "react";

const App = dynamic(() => import("../components/How/How"), {
  ssr: false,
});

export default function Index() {
  return <App />;
}
