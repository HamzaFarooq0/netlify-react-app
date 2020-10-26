import React from "react";

//Component
import QuestionCard from "./component/QuestionCard";
import { Level } from "./component/Skill-level";



export const QuizApp: React.FC = () => {
  return (
    <React.Fragment>
      <h1>DevOps Quiz</h1>
      <Level />

      <button>
        Start Quiz
      </button>

    </React.Fragment>
  );
};
