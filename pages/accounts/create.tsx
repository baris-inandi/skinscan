import dynamic from "next/dynamic";
import React from "react";

const App = dynamic(() => import("../../components/Accounts/Create/Create"), {
  ssr: false,
});

export default function Index() {
  return <App />;
}
