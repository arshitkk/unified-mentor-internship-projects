import React from "react";

function StartQuiz({ startQuizHide, startHandler }) {

  return (
    <div
      className={`rounded-xl bg-white/75 m-6 mt-24 p-3 pt-0  h-[25rem] shadow-2xl border-black flex flex-col items-center gap-4 justify-center ${startQuizHide} w-[20rem] sm:w-[33rem]`}
    >
      <h1 className="text-4xl font-semibold">Start the Quiz</h1>
      <button
        className={`shadow-lg bg-green-500 px-9 text-4xl  py-3 rounded-lg border-2 font-semibold hover:border-black/30 active:scale-[0.95]`}
        type="click"
        onClick={startHandler}
      >
        Start
      </button>
    </div>
  );
}

export default StartQuiz;
