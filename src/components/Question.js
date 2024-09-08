// src/components/Question.js
import React, { useState, useEffect } from "react";
import "../App.css"; // Import CSS for styling

const Question = ({
  questionData,
  onAnswerSubmit,
  isLastQuestion,
  currentQuestionIndex,
}) => {
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
    const combinedOptions = [
      ...questionData.incorrect_answers,
      questionData.correct_answer,
    ];
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

  console.log("questionData============", questionData);

  return (
    <div className="question-container">
      <h2>
        {currentQuestionIndex + 1}. {questionData.question}
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "50px",
        }}
      >
        {shuffledOptions.map((option, index) => (
          <div
            style={{
              alignItems: "center",
              display: "flex",
              width: "45%",
              // justifyContent: "center",
              backgroundColor: "#f7f7f7",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #d4d4d4",
            }}
          >
            <label
              key={index}
              className="option-label"
              style={{ color: "black", fontWeight: "bold" }}
            >
              <input
                type="radio"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
                disabled={isSubmitted} // Disable selection after submission
              />
              {option}
            </label>
          </div>
        ))}
      </div>

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
          <button onClick={handleNext} className="next-button">
            {isLastQuestion ? "Submit" : "Next"}
          </button>
        </>
      )}
    </div>
  );
};

export default Question;
