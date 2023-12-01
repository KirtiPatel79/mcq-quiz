

//QuizSummary.js it is with cards design
import React from 'react';

const QuizSummary = ({ questionsData, selectedOptions }) => {
    const totalQuestions = questionsData.length;
  const correctAnswers = selectedOptions.filter(
    (selectedOption, index) => selectedOption === questionsData[index].correctAnswer
  ).length;
  return (
    
    <div>

<div className="flex flex-row justify-between items-center mb-4">
  <h2 className="text-xl font-bold">Quiz Summary</h2>
  <div className="bg-white rounded-md shadow-md p-4">
    <p className="font-semibold">Your Score: {correctAnswers} out of {totalQuestions}</p>
   
  </div>
</div>

      {questionsData.map((question, index) => (
        <div key={index} className="bg-white rounded-md shadow-md p-4 mb-4">
          <p className="font-semibold mb-2">{index + 1}. {question.question}</p>
          <ul className="list-disc ml-6">
            {question.options.map((option, optionIndex) => (
             <li
             key={optionIndex}
             className={`mb-1 
             ${question.correctAnswer === option ? 'text-green-500 font-bold    ' : ''}
             ${selectedOptions[index] === option && option === question.correctAnswer ? 'text-lg' : ''}
               ${selectedOptions[index] === option && option !== question.correctAnswer ? 'text-red-500' : ''}`}
           >
           
                <label>
                  <input className='w-4 h-4 rounded' type="checkbox" checked={option === selectedOptions[index]}  readOnly />
                  <span className={`ml-1  ${selectedOptions[index] === option ? 'font-semibold' : ''}`}>
                     {option}
                     {selectedOptions[index] === option &&
                       (option === question.correctAnswer ? (
                         <span className="text-green-500 ml-1">&#10004;</span>
                       ) : (
                         <span className="text-red-500 ml-1">&#10008;</span>
                       ))}
                   </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      
    </div>

  );
};

export default QuizSummary;
