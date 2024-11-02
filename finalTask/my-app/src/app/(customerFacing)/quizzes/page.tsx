'use client';

import { useState } from 'react';

const DSAQuiz = () => {
  const [score, setScore] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(-1));

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const calculateScore = () => {
    const correctAnswers = questions.map((q, i) => q.correctAnswerIndex === selectedAnswers[i]);
    const score = correctAnswers.filter(Boolean).length;
    setScore(score);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>DSA Quiz</h1>
      <div style={styles.quizContainer}>
        {questions.map((question, questionIndex) => (
          <div key={questionIndex} style={styles.questionContainer}>
            <h2 style={styles.question}>{question.question}</h2>
            {question.answers.map((answer, answerIndex) => (
              <label key={answerIndex} style={styles.answerLabel}>
                <input
                  type="radio"
                  name={`question-${questionIndex}`}
                  value={answerIndex}
                  checked={selectedAnswers[questionIndex] === answerIndex}
                  onChange={() => handleAnswerChange(questionIndex, answerIndex)}
                  style={styles.radioButton}
                />
                {answer}
              </label>
            ))}
          </div>
        ))}
        <button onClick={calculateScore} style={styles.submitButton}>
          Submit
        </button>
        {score !== null && <p style={styles.score}>Your score: {score} / {questions.length}</p>}
      </div>
    </div>
  );
};

const questions = [
  {
    question: "What is the time complexity of binary search?",
    answers: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
    correctAnswerIndex: 1,
  },
  {
    question: "Which data structure is used in a depth-first search (DFS)?",
    answers: ["Queue", "Stack", "Heap", "Linked List"],
    correctAnswerIndex: 1,
  },
  {
    question: "What is the best-case time complexity of quicksort?",
    answers: ["O(n)", "O(n log n)", "O(log n)", "O(n^2)"],
    correctAnswerIndex: 1,
  },
];

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  } as React.CSSProperties,
  title: {
    textAlign: 'center' as 'center',
    color: 'black',
  } as React.CSSProperties,
  quizContainer: {
    marginTop: '20px',
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  } as React.CSSProperties,
  questionContainer: {
    marginBottom: '20px',
  } as React.CSSProperties,
  question: {
    marginBottom: '10px',
    fontWeight: 'bold' as 'bold',
    color: 'black',
  } as React.CSSProperties,
  answerLabel: {
    display: 'block',
    marginBottom: '5px',
    color: 'black',
  } as React.CSSProperties,
  radioButton: {
    marginRight: '10px',
  } as React.CSSProperties,
  submitButton: {
    padding: '10px 20px',
    backgroundColor: 'rgb(238, 75, 43)',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  } as React.CSSProperties,
  score: {
    marginTop: '20px',
    fontSize: '18px',
    fontWeight: 'bold' as 'bold',
    textAlign: 'center' as 'center',
    color: 'black',
  } as React.CSSProperties,
};

export default DSAQuiz;
