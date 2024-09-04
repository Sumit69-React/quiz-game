import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Question from './Question';

const mockQuestionData = {
  question: 'What is the capital of France?',
  correct_answer: 'Paris',
  incorrect_answers: ['London', 'Berlin', 'Madrid'],
};

const mockOnAnswerSubmit = jest.fn();

describe('Question Component', () => {
  test('renders question and options', () => {
    render(<Question questionData={mockQuestionData} onAnswerSubmit={mockOnAnswerSubmit} />);

    expect(screen.getByText('What is the capital of France?')).toBeInTheDocument();
    expect(screen.getByLabelText('Paris')).toBeInTheDocument();
    expect(screen.getByLabelText('London')).toBeInTheDocument();
    expect(screen.getByLabelText('Berlin')).toBeInTheDocument();
    expect(screen.getByLabelText('Madrid')).toBeInTheDocument();
  });

  test('allows user to select an option', () => {
    render(<Question questionData={mockQuestionData} onAnswerSubmit={mockOnAnswerSubmit} />);

    fireEvent.click(screen.getByLabelText('Paris'));

    expect(screen.getByLabelText('Paris')).toBeChecked();
  });

  test('submits the correct answer', () => {
    render(<Question questionData={mockQuestionData} onAnswerSubmit={mockOnAnswerSubmit} />);

    fireEvent.click(screen.getByLabelText('Paris'));
    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Correct!')).toBeInTheDocument();
    expect(mockOnAnswerSubmit).toHaveBeenCalledWith(true);
  });

  test('submits an incorrect answer', () => {
    render(<Question questionData={mockQuestionData} onAnswerSubmit={mockOnAnswerSubmit} />);

    fireEvent.click(screen.getByLabelText('London'));
    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Wrong! The correct answer is: Paris')).toBeInTheDocument();
    expect(mockOnAnswerSubmit).toHaveBeenCalledWith(false);
  });

  test('disables options after submitting', () => {
    render(<Question questionData={mockQuestionData} onAnswerSubmit={mockOnAnswerSubmit} />);

    fireEvent.click(screen.getByLabelText('Berlin'));
    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByLabelText('Paris')).toBeDisabled();
    expect(screen.getByLabelText('London')).toBeDisabled();
    expect(screen.getByLabelText('Berlin')).toBeDisabled();
    expect(screen.getByLabelText('Madrid')).toBeDisabled();
  });

  test('shows Next button after submission', () => {
    render(<Question questionData={mockQuestionData} onAnswerSubmit={mockOnAnswerSubmit} />);

    fireEvent.click(screen.getByLabelText('Berlin'));
    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Next')).toBeInTheDocument();
  });
});
