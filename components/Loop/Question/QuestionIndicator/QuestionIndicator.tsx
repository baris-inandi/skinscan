import React from "react";

interface Props {
  index: number;
  length: number;
}

const QuestionIndicator: React.FC<Props> = (props) => {
  return (
    <div className="text-center">
      <h2 className="font-sk font-medium text-xl py-3 leading-tight">
        Help us get a <br />
        more accurate result
      </h2>
      Question {props.index} of {props.length}
    </div>
  );
};

export default QuestionIndicator;
