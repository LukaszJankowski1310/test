import './App.css';
import React, {useState, useEffect} from 'react'
import NewQuiz from './components/NewQuiz';
import Quiz from './components/Quiz';

function App() {
  const [quizStarted, setQuizStarted] = useState(false)
  const [numberOfQuestions, setNumberOfQuestions] = useState(5)

  function runQuiz(numOfQuestions) {
    setQuizStarted(true)
  }

  function newQuiz() {
    setQuizStarted(false)
  }


  function handleSetNumberOfQuestions(numOfQuestions) {
    setNumberOfQuestions(numOfQuestions)
  }

  return (
    <div className="App">
      {quizStarted ?  <Quiz newQuiz={newQuiz} numberOfQuestions={numberOfQuestions}/> : <NewQuiz runQuiz={runQuiz} handleSetNumberOfQuestions={handleSetNumberOfQuestions} numOfQuestions={numberOfQuestions}  />}  
    </div>
  );
}

export default App;
