import dynamic from "next/dynamic";
import React from "react";

const App = dynamic(() => import("../components/Loop/Question"), {
    ssr: false,
});

export default function Question() {
    return <App />;
}
