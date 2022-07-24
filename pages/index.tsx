import dynamic from "next/dynamic";
import React from "react";

const App = dynamic(() => import("../components/Home/Home"), {
  ssr: false,
});

export default function Index() {
  return <App />;
}
