import React, { useState } from "react";
import { quiz_questions } from "./data/quiz_questions";

export default function App() {
  const [question_count, set_question_count] = useState(0);
  const [score, set_score] = useState([]);
  const [option] = useState("option");
  const [selected, setSelected] = useState(-1);

  function handle__set_question_count() {
    set_score((score) => [
      ...score,
      selected === quiz_questions[question_count].answer,
    ]);
    set_question_count((i) => ++i);
    setSelected(-1);
  }

  function handleReset() {
    setSelected(-1);
    set_question_count(0);
    set_score([]);
  }

  return (
    <main>
      <h1 className="head title">Da Quiz</h1>
      <div className="quiz">
        {question_count < quiz_questions.length && (
          <>
            <div className="question" key={crypto.randomUUID()}>
              Q#{question_count + 1}. {quiz_questions[question_count].question}
            </div>
            <div className="options">
              {quiz_questions[question_count].options.map((each, i) => (
                <div
                  onClick={() => {
                    setSelected(i);
                  }}
                  className={selected === i ? option + " selected" : option}
                  key={crypto.randomUUID()}
                >
                  {i + 1}. {each}
                </div>
              ))}
            </div>
            {selected === -1 ? (
              <div className="prompt">
                ** please select the appropriate option **
              </div>
            ) : (
              <button onClick={handle__set_question_count}>
                {question_count !== quiz_questions.length - 1
                  ? "Next"
                  : "submit"}
              </button>
            )}
          </>
        )}
        {question_count === quiz_questions.length && (
          <>
            <div className="results">
              <span className="head">You scored</span>
              <p className="score">
                <span className="result">
                  {score.reduce((each, previous) => +each + previous, 0)}
                </span>
                /{" " + score.length}
              </p>
            </div>
            <button style={{ marginTop: "1em" }} onClick={handleReset}>
              retake
            </button>
          </>
        )}
      </div>
    </main>
  );
}
