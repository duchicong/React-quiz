import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard'
import {
  fetchQuizQuestions,
  Difficulty,
  QuestionState
} from './utils/API'
import { GlobalStyle, Wrapper } from './App.styles'

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}
const TOTAL_QUESTION = 10

const App = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [number, setNumber] = useState(0)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  console.log(questions)
  
  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTION,
      Difficulty.EASY
    )

    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // user answer
      const answer = e.currentTarget.value.trim()
      // check anser against correct answer
      const correct = questions[number].correct_answer === answer
      // Add score if answer is correct
      if (correct) setScore(prev => prev + 1)
      // save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers(prev => [...prev, answerObject])
    }
  }
  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQuestion = number + 1
    if (nextQuestion === TOTAL_QUESTION) setGameOver(true)
      else setNumber(nextQuestion)
  }
  return (
    <>
      <GlobalStyle/>
      <Wrapper>
        <h1>REACT QUIZ</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTION
          ? (<button className='start' onClick={startTrivia}>Start</button>)
          : null}
        {!gameOver ? <p className="score">Score: {score}</p> : null}
        {loading ? <p>Loading Question ...</p> : null}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTION}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver && !loading
          && userAnswers.length === number + 1
          && number !== TOTAL_QUESTION - 1 ? (
            <button className="next" onClick={nextQuestion}>Next Question</button>
          ): null}
      </Wrapper>
    </>
  );
}

export default App;
