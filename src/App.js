import React, { useState, useEffect } from 'react';
import quizData from './data/quizData.json';
import QuestionCard from './components/QuestionCard';
import Results from './components/Results';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (currentQuestion > 0 && currentQuestion <= quizData.length) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            clearInterval(timer);
            handleAnswer(false); // Penalización si no responde a tiempo
            return 60;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentQuestion]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    } else {
      setScore(score - 1); // Penalización si no responde a tiempo
    }

    if (currentQuestion < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(60); // Reiniciar temporizador
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setTimeLeft(60);
  };

  return (
    <div className="App">
      {showResults ? (
        <Results score={score} total={quizData.length} onRestart={resetQuiz} />
      ) : currentQuestion === 0 ? (
        <div>
          <h1>Bienvenido al Quiz</h1>
          <p>Este quiz tiene {quizData.length} preguntas. ¡Buena suerte!</p>
          <button onClick={() => setCurrentQuestion(1)}>Comenzar</button>
        </div>
      ) : (
        <QuestionCard
          key={currentQuestion} // Clave única para forzar el reinicio del componente
          question={quizData[currentQuestion - 1]}
          timeLeft={timeLeft}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
}

export default App;