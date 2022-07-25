import React from "react";
import Router from "next/router";
import Greeter from "../FirstTime/Greeter/Greeter";

const Question: React.FC = () => {
    return (
        <div className="h-screen w-screen">
            <Greeter
                order={1}
                title="Does it itch?"
                content="This question helps us understand your situation better."
                btnContent="No"
                overrideFunction={() => {
                    Router.replace("/loop");
                }}
                secondaryButtonContent="Yes"
                secondaryButtonFunction={() => {
                    Router.replace("/loop");
                }}
            />
        </div>
    );
};

export default Question;
