import React, { useState } from 'react';
import './App.css'; 
import QuizSummary from './QuizSummary';
import questionsData from './Questions.json';


const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array.from({ length: questionsData.length }, () => ''));
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const handleOptionSelect = (option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestion] = option;
    setSelectedOptions(updatedOptions);
  };

  const handleNextQuestion = () => {
    if (!selectedOptions[currentQuestion]) {
      console.log('select an option');
      setValidationMessage('*Please select an option before proceeding.');
      return;
    }else{
      setValidationMessage('');
    };
    if (selectedOptions[currentQuestion] === questionsData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setCurrentQuestion(currentQuestion + 1);

    if (currentQuestion === questionsData.length - 1) {
      setQuizCompleted(true);
    }
  };

  const handlePrevQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
  };
  const remainingCount = questionsData.length - currentQuestion;
  const totalCount = questionsData.length;

  
  return (
    
  
    <div className="max-w-md mx-auto mt-10 p-4 bg-yellow-200 shadow-md rounded-md mb-0">
      {quizCompleted ? (
        <QuizSummary questionsData={questionsData} selectedOptions={selectedOptions} />
      ) : (
        <div>
          
          <h2 className="text-xl font-sans font-semibold  mb-4">{currentQuestion + 1}. {questionsData[currentQuestion].question}</h2>
          <ul>
            {questionsData[currentQuestion].options.map((option, index) => (
              
              <li key={index} className="mb-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={option === selectedOptions[currentQuestion]}
                    onChange={() => handleOptionSelect(option)}
                    className="form-checkbox text-blue-500 focus:ring-blue-300 w-5 h-5 rounded"
                  />
                  <span>{option}</span>
                </label>
               
              </li>
              
            ))}
             {validationMessage && <p className="text-red-500 mt-2">{validationMessage}</p>}
          </ul>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-300"
            >
              Back
            </button>
            <button
              onClick={handleNextQuestion}
              
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              {currentQuestion === questionsData.length - 1 ? 'Submit' : 'Next Question'}
            </button>
          </div>
          <div className="mt-3">
            Remaining: {remainingCount}/{totalCount}
          </div>
        </div>
      )}
    
  </div>
  
  );
};

export default App;