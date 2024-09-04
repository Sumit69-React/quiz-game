// src/components/Question.js
import React, { useState, useEffect } from 'react';
import '../App.css'; // Import CSS for styling

const Question = ({ questionData, onAnswerSubmit, isLastQuestion }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = () => {
    const correctAnswer = questionData.correct_answer;
    const correct = selectedOption === correctAnswer;
    setIsCorrect(correct);
    setIsSubmitted(true);
  };

  const handleNext = () => {
    setIsSubmitted(false);
    onAnswerSubmit(isCorrect); // Proceed to next question or show results
  };

  // Shuffle options only once when the component is mounted or questionData changes
  useEffect(() => {
    const combinedOptions = [...questionData.incorrect_answers, questionData.correct_answer];
    setShuffledOptions(shuffleArray(combinedOptions));
    setSelectedOption(null);
    setIsSubmitted(false);
  }, [questionData]);

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <div className="question-container">
      <h2>{questionData.question}</h2>
      {shuffledOptions.map((option, index) => (
        <label key={index} className="option-label">
          <input
            type="radio"
            value={option}
            checked={selectedOption === option}
            onChange={handleOptionChange}
            disabled={isSubmitted} // Disable selection after submission
          />
          {option}
        </label>
      ))}
      {!isSubmitted ? (
        <button 
          onClick={handleSubmit} 
          disabled={!selectedOption} // Submit is only enabled when an option is selected
          className="submit-button"
        >
          Submit
        </button>
      ) : (
        <>
          {isCorrect ? (
            <p className="feedback correct">Correct!</p>
          ) : (
            <p className="feedback wrong">
              Wrong! The correct answer is: {questionData.correct_answer}
            </p>
          )}
          <button 
            onClick={handleNext} 
            className="next-button"
          >
            {isLastQuestion ? 'Submit' : 'Next'}
          </button>
        </>
      )}
    </div>
  );
};

export default Question;
