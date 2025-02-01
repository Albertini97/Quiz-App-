import React, { useState } from 'react';

const QuestionCard = ({ question, timeLeft, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleSelect = (option) => {
    setSelectedAnswer(option); // Guarda la respuesta seleccionada
    setTimeout(() => {
      onAnswer(option === question.answer); // Verifica si la respuesta es correcta
    }, 2000);
  };

  return (
    <div className="question-card">
      {/* Pregunta */}
      <h2>{question.question}</h2>

      {/* Temporizador */}
      <p>Tiempo restante: {timeLeft} segundos</p>

      {/* Respuestas */}
      <div className="options">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(option)} // Maneja la selección
            style={{
              backgroundColor:
                selectedAnswer === option
                  ? option === question.answer
                    ? "green" // Verde si es correcta
                    : "red" // Rojo si es incorrecta
                  : "white", // Blanco si no se ha seleccionado
              color: selectedAnswer ? (option === question.answer ? "white" : "white") : "black",
              cursor: "pointer",
              padding: "10px",
              margin: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Mostrar la respuesta correcta después de seleccionar */}
      {selectedAnswer && (
        <p>
          Respuesta correcta: <strong>{question.answer}</strong>
        </p>
      )}
    </div>
  );
};

export default QuestionCard;