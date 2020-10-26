import React from "react";
//Types
import { AnswerObject } from "../App";
//Styles
import { Wrapper, ButtonWrapper } from "./CardStyle.styles";

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  answers,
  callback,
  question,
  questionNr,
  totalQuestions,
  userAnswer,
}) => {
  return (
    <Wrapper>
      <h1>DevOpa Quiz</h1>
      <p className="number">
        Question: {questionNr} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers.map((answer) => (
          <ButtonWrapper
            key={answer}
            correct={userAnswer?.correctAnswer === answer}
            userClicked={userAnswer?.answer === answer}
          >
            <div key={answer}>
              <button
                disabled={userAnswer ? true : false}
                value={answer}
                onClick={callback}
              >
                <span dangerouslySetInnerHTML={{ __html: answer }}></span>
              </button>
            </div>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  );
};

export default QuestionCard;
