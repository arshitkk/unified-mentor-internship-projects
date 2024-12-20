const dayBox = document.querySelector(".day");
const hrBox = document.querySelector(".hr");
const minBox = document.querySelector(".min");
const secBox = document.querySelector(".sec");
const start = document.querySelector(".btn-grad");
const reset = document.querySelector(".btn-reset");
const timeInput = document.querySelector(".timeInput");
const dateInput = document.querySelector(".dateInput");
const inputPanel = document.querySelector(".content");
const container = document.querySelector("#container");
const error = document.querySelector(".error");
const titleInput = document.querySelector("#titleInput");
const heading = document.querySelector(".heading");
const countdownPanel = document.querySelector(".countdown-section");
const home = document.querySelector(".home");
const about = document.querySelector(".about");
const aboutSection = document.querySelector(".about-section");
const finished = document.querySelector(".finished");
let mainPage = "home";

// Manage the selection of Home or About page
mainPage === "home"
  ? home.classList.add("selected")
  : home.classList.remove("selected");

home.addEventListener("click", () => {
  mainPage = "home";
  home.classList.add("selected");
  about.classList.remove("selected");
  aboutSection.style.display = "none";
  container.style.display = "flex";
});

about.addEventListener("click", () => {
  mainPage = "about";
  home.classList.remove("selected");
  about.classList.add("selected");
  aboutSection.style.display = "block";
  container.style.display = "none";
});

let date = new Date();
let currHr, currMin, currSec; // Current time
let inputSec, inputHr, inputMin; // User's input time
let finalSec, finalMin, finalHr; // Final calculated countdown time

let daysInMs;
let intervalId;

// Calculate time differences when time input changes
timeInput.addEventListener("change", (e) => {
  const now = new Date();
  currHr = now.getHours();
  currMin = now.getMinutes();
  currSec = now.getSeconds();

  let [hr, min] = e.target.value.split(":");
  inputHr = parseInt(hr);
  inputMin = parseInt(min);
  inputSec = 0;

  let secDiff = inputSec - currSec;
  let minDiff = inputMin - currMin;

  // Calculate the final time (seconds, minutes, hours)
  finalSec = secDiff >= 0 ? secDiff : 60 + secDiff;
  if (secDiff < 0) minDiff--;
  finalMin = minDiff >= 0 ? minDiff : 60 + minDiff;
  finalHr = inputHr >= currHr ? inputHr - currHr : 24 + (inputHr - currHr);
  if (minDiff < 0) finalHr--;

  console.log("Hours:", finalHr, "Minutes:", finalMin, "Seconds:", finalSec);
});

// Handle date input and calculate the days in milliseconds
dateInput.addEventListener("change", (e) => {
  let fetchDate = new Date(e.target.value).getTime();
  const currDate = Date.now();
  daysInMs = Math.round((fetchDate - currDate) / (1000 * 60 * 60 * 24));
  console.log(daysInMs);
});

// Update the title input
titleInput.addEventListener("change", (e) => {
  heading.textContent = e.target.value;
});

// Start the countdown when the start button is clicked
start.addEventListener("click", () => {
  // Check if all inputs are filled and valid
  if (
    (finalHr || finalMin || finalSec || daysInMs) &&
    heading.textContent !== "" &&
    dateInput.value !== "" &&
    timeInput.value !== "" &&
    titleInput.value !== ""
  ) {
    if (finalHr < 0 || daysInMs < 0) {
      // Reset if invalid time or date
      resetInputs();
      alert("Please Mr. Time Traveller!! Don't choose past time");
      updateDisplayTime(); // Update the time boxes with reset values
    } else {
      inputPanel.style.display = "none";
      countdownPanel.style.display = "block";
      reset.style.display = "block";
      finished.style.display = "none";

      intervalId = setInterval(() => {
        // Countdown logic: decrement seconds, minutes, and hours
        if (finalSec > 0) {
          finalSec--;
        } else {
          if (finalMin > 0) {
            finalMin--;
            finalSec = 59;
          } else {
            if (finalHr > 0) {
              finalHr--;
              finalMin = 59;
            } else {
              // Countdown finished
              clearInterval(intervalId);
              console.log("Countdown finished");
              finished.style.display = "block"; // Show the finished panel
              countdownPanel.style.display = "none"; // Hide the countdown panel
            }
          }
        }

        updateDisplayTime(); // Update the countdown display after each tick
        console.log(finalHr, finalMin, finalSec); // Log the current countdown values
      }, 1000);
    }
  } else {
    error.style.opacity = 1; // Show error if inputs are incomplete
  }
});

// Reset functionality
reset.addEventListener("click", () => {
  resetInputs();
  updateDisplayTime(); // Reset the time display
  finished.style.display = "none"; // Hide the finished panel when resetting
});

// Function to reset all input fields and time values
function resetInputs() {
  reset.style.display = "none";
  inputPanel.style.display = "flex";
  countdownPanel.style.display = "none";

  clearInterval(intervalId); // Clear any ongoing countdown

  // Reset all time and input values
  dateInput.value = "";
  timeInput.value = "";
  titleInput.value = "";
  heading.textContent = "";
  finalHr = 0;
  finalMin = 0;
  finalSec = 0;
  daysInMs = 0;
}

// Function to update the display time
function updateDisplayTime() {
  hrBox.textContent = finalHr.toString().padStart(2, "0");
  minBox.textContent = finalMin.toString().padStart(2, "0");
  secBox.textContent = finalSec.toString().padStart(2, "0");
  dayBox.textContent = daysInMs.toString().padStart(2, "0");
}
