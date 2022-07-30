import React from "react";
import Greeter from "./QuestionGreeter/QuestionGreeter";
import questions from "../../../lib/questions";
import Indicator from "./QuestionIndicator/QuestionIndicator";

interface Props {
  probs: any[];
  setProbs: (newProbs: any[]) => void;
  setDismissed: (val: boolean) => void;
}

const Question: React.FC<Props> = (props) => {
  const secondaryFollowUpThreshold = 0.25; // the probability that condition #2 must have in order to get its questions to be shown.
  const noQuestionThreshold = 0.85; // no questions will be asked past this point

  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [selfStyle, setSelfStyle] = React.useState<any>({
    opacity: "100%",
  });

  const [dismissed, setDismissed] = React.useState(false);

  const handleAnswer = (isPositive: boolean) => {
    const newProbs = props.probs;
    props.setProbs(newProbs);
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex >= viableQuestions.length) {
      setSelfStyle({
        opacity: "0",
      });
      setDismissed(true);
      props.setDismissed(true);
      return;
    }
    setCurrentQuestionIndex(nextIndex);
  };

  const probsMap = {
    primaryName: props.probs[0][0],
    primaryProb: props.probs[0][1],
    secondaryName: props.probs[1][0],
    secondaryProb: props.probs[1][1],
  };

  const currentQuestions = {
    primary: questions[probsMap.primaryName],
    secondary: questions[probsMap.secondaryName],
  };

  const secondaryFollowUp: string[] =
    probsMap.secondaryProb >= secondaryFollowUpThreshold
      ? currentQuestions.secondary
      : [];

  const viableQuestions: string[] =
    probsMap.primaryProb <= noQuestionThreshold
      ? [...currentQuestions.primary, ...secondaryFollowUp]
      : [];

  return (
    <div
      className={`z-10 transition duration-300 ${
        dismissed ? "" : "h-screen w-screen bg-black"
      }`}
      style={selfStyle}
    >
      <Greeter
        title={viableQuestions[currentQuestionIndex]}
        top={
          <Indicator
            index={currentQuestionIndex + 1}
            length={viableQuestions.length}
          />
        }
        content=""
        btnContent="No"
        overrideFunction={() => {
          handleAnswer(false);
        }}
        secondaryButtonContent="Yes"
        secondaryButtonFunction={() => {
          handleAnswer(true);
        }}
      />
    </div>
  );
};

export default Question;
