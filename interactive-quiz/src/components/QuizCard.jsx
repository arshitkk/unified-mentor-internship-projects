import React, { useEffect, useState } from "react";

function QuizCard({
  op1, // Option 1 for the quiz
  op2, // Option 2 for the quiz
  op3, // Option 3 for the quiz
  op4, // Option 4 for the quiz
  question, // The current question
  hint, // Hint for the current question
  nextHandler, // Handler to go to the next question
  imgUrl, // Image URL related to the question
  qNum, // The current question number
  btnName, // Button name (Next/Submit)
  quizCardHide, // Control visibility of the quiz card
  ans, // The correct answer for the current question
  resetHandler, // Handler to reset the quiz
}) {
  const [score, setScore] = useState(1); // Initial score state
  const [disableBtn, setDisableBtn] = useState(true); // State to disable/enable the button
  const initialOptionCss =
    "rounded-md border cursor-pointer block border-black/35 p-1 w-full m-1 hover:border-black/100 linear duration-[0.4s] hover:scale-[1.02 select-none"; // Initial styles for options
  const [disable, setDisable] = useState(); // State to track whether the option is selected
  const [optionStyles, setOptionStyles] = useState({
    op1: initialOptionCss,
    op2: initialOptionCss,
    op3: initialOptionCss,
    op4: initialOptionCss,
  }); // Object holding styles for each option

  // Handler for option selection
  const optionHandler = (e) => {
    setDisableBtn(false); // Enable the button after selection
    if (!disable) {
      const selectedOption = e.target.textContent; // Get selected option text
      let newOptionStyles = { ...optionStyles }; // Clone current option styles

      // Set the selected option's style based on the answer
      if (selectedOption === ans) {
        newOptionStyles[e.target.htmlFor] = `${initialOptionCss} bg-green-300`; // Correct answer style
        setScore((p) => p + 1); // Increment score if answer is correct
        setDisableBtn(false); // Allow button click
      } else {
        newOptionStyles[e.target.htmlFor] = `${initialOptionCss} bg-red-400`; // Incorrect answer style
        setDisableBtn(false); // Allow button click
      }

      setOptionStyles(newOptionStyles); // Update option styles
      setDisable(true); // Disable further option selections
    }
  };

  // Effect to reset options and button state when the question changes
  useEffect(() => {
    setDisableBtn(true); // Disable the button initially
    // Reset styles and enable options when question changes
    setOptionStyles({
      op1: initialOptionCss,
      op2: initialOptionCss,
      op3: initialOptionCss,
      op4: initialOptionCss,
    });
    setDisable(false); // Re-enable the options for the new question
  }, [question]); // Triggered whenever the question changes

  return qNum < 6 ? (
    // Render quiz question and options if quiz is not yet completed
    <div
      className={`rounded-xl bg-white/75 m-6 mt-24 p-3 pt-0 sm:w-[33rem] w-[20rem] text-sm sm:text-[1rem] sm:h-[25rem] shadow-2xl border-black flex flex-col items-center gap-1 ${quizCardHide} transition-all ease-linear duraiton-[0.5s]`}
    >
      <h1 className="text-3xl font-extrabold mb-3">Quiz</h1>
      <div className="border-orange-500 bg-black/15 flex items-center gap-3 border rounded-xl h-fit w-full p-2 justify-between">
        <p className="select-none font-bold">{`Q${qNum} ${question}`}</p>
        <img className="h-20 rounded-md" src={imgUrl} alt="" />
      </div>
      <div className="w-full mt-2 ">
        {/* Render options as clickable labels */}
        <div>
          <input hidden type="radio" id="op1" name="options" />
          <label
            onClick={optionHandler}
            className={`${optionStyles.op1}`}
            htmlFor="op1"
          >
            {op1}
          </label>
        </div>
        <div>
          <input hidden type="radio" id="op2" name="options" />
          <label
            onClick={optionHandler}
            className={`${optionStyles.op2}`}
            htmlFor="op2"
          >
            {op2}
          </label>
        </div>
        <div>
          <input hidden type="radio" id="op3" name="options" />
          <label
            onClick={optionHandler}
            className={`${optionStyles.op3}`}
            htmlFor="op3"
          >
            {op3}
          </label>
        </div>
        <div>
          <input hidden type="radio" id="op4" name="options" />
          <label
            onClick={optionHandler}
            className={`${optionStyles.op4}`}
            htmlFor="op4"
          >
            {op4}
          </label>
        </div>
      </div>
      <div>
        <p className="text-[0.7rem] text-gray-600">Hint: {hint} </p>
      </div>
      <div>
        {/* Button to go to the next question */}
        <button
          className="shadow-lg bg-green-500 px-3 py-1 rounded-lg border-2 hover:border-black/30 active:scale-[0.95]"
          type="submit"
          onClick={nextHandler}
          disabled={disableBtn === true} // Disable button if no option is selected
        >
          {btnName}
        </button>
      </div>
    </div>
  ) : (
    // Render the completed message after the last question
    <div
      className={`rounded-xl bg-white/75 m-6 mt-24 p-3 pt-0 sm:w-[33rem] w-[20rem] h-[25rem] sm:h-[25rem] shadow-2xl border-black flex flex-col items-center gap-1 ${quizCardHide} transition-all ease-linear duraiton-[0.5s] flex justify-center`}
    >
      <h1 className="text-xl font-bold">The Quiz Has Been Completed</h1>
      <p className="text-xl">
        You Scored {score - 1} out of {qNum - 1}
      </p>
      <button
        className="shadow-lg bg-green-500 px-3 py-1 rounded-lg border-2 hover:border-black/30 active:scale-[0.95]"
        onClick={() => {
          resetHandler(); // Reset the quiz on button click
          setScore(1); // Reset the score to the initial value
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default QuizCard;
