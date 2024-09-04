// src/App.js
import React, { useState, useEffect } from 'react';
import Question from './components/Question';
import Result from './components/Result';
import './App.css'; // Add this line to include your CSS file

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch('https://opentdb.com/api.php?amount=10');
      const data = await response.json();
      setQuestions(data.results);
    };
    fetchQuestions();
  }, []);

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
    return <Result score={score} totalQuestions={questions.length} />;
  }

  return (
    <div className="App">
      {questions.length > 0 && (
        <Question
          questionData={questions[currentQuestionIndex]}
          onAnswerSubmit={handleAnswerSubmit}
          isLastQuestion={currentQuestionIndex === questions.length - 1}
        />
      )}
    </div>
  );
};

export default App;
