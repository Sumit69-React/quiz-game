// src/components/Result.js
import React from 'react';
import "../App.css"


const Result = ({ score, totalQuestions }) => {
  return (
    <div className="result-container">
      <h1>Game Over</h1>
      <p>Total Questions: {totalQuestions}</p>
      <p>Correct Answers: {score.correct}</p>
      <p>Incorrect Answers: {score.incorrect}</p>
    </div>
  );
};

export default Result;
