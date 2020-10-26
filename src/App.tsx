import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";

//Component
import QuestionCard from "./component/QuestionCard";
//Types
import { Difficulty, QuestionState } from "./API";
//Styles
import { GlobalStyle, Wrapper } from "./AppStyle.styles";
import "./loaderstyle.css";
//Audio
const buttonSound = require("./audio/button.mp3");
const rightNotification = require("./audio/right-answer.mp3");
const wrongNotification = require("./audio/wrong-answer.mp3");

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setNumber(0);
    setUserAnswer([]);
    setScore(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //users answer
      const answer = e.currentTarget.value;
      //check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      //Add score if answer is correct

      const incorrectSound = document.getElementById("wrong-sound");
      (incorrectSound as HTMLAudioElement).play();

      if (correct) {
        setScore((prev) => prev + 1);
        const correctSound = document.getElementById("correct-sound");
        (correctSound as HTMLAudioElement).play();
      }

      //save answer in the arry for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswer((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    //Move on to the next question if not the last one
    const nextQuestion = number + 1;

    const button = document.getElementById("button-sound");
    (button as HTMLAudioElement).play();

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY));

  return (
    <Wrapper>
      <React.Fragment>
        <audio id="button-sound" src={buttonSound} />
        <audio id="correct-sound" src={rightNotification} />
        <audio id="wrong-sound" src={wrongNotification} />
      </React.Fragment>
      <GlobalStyle />
      <h1>REACT QUIZ</h1>
      {gameOver || userAnswer.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>
          Start
        </button>
      ) : null}
      {!gameOver ? <p className="score">Score: {score}</p> : null}
      {loading && (
        <p>
          <div className="sk-folding-cube">
            <div className="sk-cube1 sk-cube"></div>
            <div className="sk-cube2 sk-cube"></div>
            <div className="sk-cube4 sk-cube"></div>
            <div className="sk-cube3 sk-cube"></div>
          </div>
        </p>
      )}
      {!loading && !gameOver ? (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswer ? userAnswer[number] : undefined}
          callback={checkAnswer}
        />
      ) : null}
      {!gameOver &&
      !loading &&
      userAnswer.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
    </Wrapper>
  );
};

export default App;
