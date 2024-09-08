import React, { useState, useEffect } from "react";
import Question from "./components/Question";
import Result from "./components/Result";
import "./App.css";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [isGameOver, setIsGameOver] = useState(false);

  // const [responseCode, setResponseCode] = useState(null);

  const fetchQuestions = async () => {
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=10");
      const data = await response.json();
      // setResponseCode(data.response_code);

      if (data.response_code === 0) {
        setQuestions(data.results);
      } else if (data.response_code === 5) {
        const timer = setTimeout(() => {
          fetchQuestions();
        }, 1000);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchQuestions();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  console.log("questions:", questions);

  const handleAnswerSubmit = (isCorrect) => {
    if (isCorrect) {
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsGameOver(true);
    }
  };

  if (isGameOver) {
    return (
      <div className="App">
        <Result score={score} totalQuestions={questions.length} />
      </div>
    );
  }

  return (
    <div className="App">
      {questions.length > 0 && (
        <Question
          questionData={questions[currentQuestionIndex]}
          onAnswerSubmit={handleAnswerSubmit}
          isLastQuestion={currentQuestionIndex === questions.length - 1}
          currentQuestionIndex={currentQuestionIndex}
        />
      )}
    </div>
  );
};

export default App;
