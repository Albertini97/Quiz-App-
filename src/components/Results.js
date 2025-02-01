import React from 'react';

const Results = ({ score, total, onRestart }) => {
  return (
    <div className="results">
      <h2>¡Quiz Completado!</h2>
      <p>Tu puntuación final es: {score} / {total}</p>
      <button onClick={onRestart}>Volver a Intentar</button>
    </div>
  );
};

export default Results;