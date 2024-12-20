import React, { useEffect, useState, useRef } from "react";
import QuizCard from "./QuizCard"; // Import QuizCard component for displaying quiz questions
import { quizList } from "../quizList/quizList"; // Import quiz data
import StartQuiz from "./StartQuiz"; // Import StartQuiz component for initiating the quiz

function quiz() {
  // State to manage visibility of StartQuiz and QuizCard components
  const [startQuizHide, setStartQuizHide] = useState();
  const [quizCardHide, setQuizCardHide] = useState("hidden");

  // State to store quiz question, options, and related data
  const [question, setQuestion] = useState();
  const [op1, setOp1] = useState();
  const [op2, setOp2] = useState();
  const [op3, setOp3] = useState();
  const [op4, setOp4] = useState();
  const [hint, setHint] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [qNum, setQNum] = useState();

  // State to manage question number and current count
  const [count, setCount] = useState(1);
  const [ans, setAns] = useState();

  // Using useRef to track the count across renders
  const countRef = useRef(count);

  // Handler function to start the quiz and show the quiz card
  function startHandler() {
    nextHandler(); // Show the first question
    setQuizCardHide(""); // Unhide QuizCard
    setStartQuizHide("hidden"); // Hide StartQuiz button
  }

  // Function to show the next question and options
  function nextHandler() {
    let randIndex = Math.floor(Math.random() * (20 + 1)); // Randomly select a question from quizList

    if (count <= 6) {
      // Set question and options from quizList
      setQuestion(quizList[randIndex].Q);
      setOp1(quizList[randIndex].op1);
      setOp2(quizList[randIndex].op2);
      setOp3(quizList[randIndex].op3);
      setOp4(quizList[randIndex].op4);
      setHint(quizList[randIndex].hint);
      setImgUrl(quizList[randIndex].img);
      setAns(quizList[randIndex].ans);
      setQNum(count);

      // Increment count or reset after 5 questions
      if (count < 6) {
        setCount((prev) => prev + 1);
      } else {
        setCount(1); // Reset count after 6 questions
      }
    }
  }

  // Function to reset the quiz and show the first question again
  function resethandler() {
    setCount(1); // Reset question count
    nextHandler(); // Show the first question
    console.log("clicked", countRef.current); // Log count value for debugging
  }

  // useEffect to keep countRef updated with the current count value
  useEffect(() => {
    countRef.current = count; // Update ref whenever count state changes
  }, [count]);

  return (
    <div>
      {/* QuizCard component to display the quiz question, options, and related data */}
      <QuizCard
        question={question}
        op1={op1}
        op2={op2}
        op3={op3}
        op4={op4}
        nextHandler={nextHandler} // Function to move to the next question
        hint={hint} // Hint for the question
        imgUrl={`${imgUrl}`} // Image URL for the question (if any)
        qNum={qNum} // Current question number
        btnName={count < 5 ? "Next" : "Submit"} // Button name based on question count
        quizCardHide={quizCardHide} // Visibility control for QuizCard
        ans={ans} // Correct answer for the current question
        resetHandler={resethandler} // Reset quiz handler
      />
      {/* StartQuiz component to start the quiz */}
      <StartQuiz startQuizHide={startQuizHide} startHandler={startHandler} />
    </div>
  );
}

export default quiz;
