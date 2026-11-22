// 1. Questions Array: stores question text, options array, and correct answer
const questions = [
  {
    question: "Which HTML tag is used to define an internal or external CSS stylesheet?",
    options: ["<script>", "<style>", "<link>", "<css>"],
    answer: "<link>"
  },
  {
    question: "Which JavaScript method removes the last element from an array and returns it?",
    options: ["pop()", "shift()", "slice()", "splice()"],
    answer: "pop()"
  },
  {
    question: "Which CSS property controls the spacing between grid or flex items?",
    options: ["margin", "padding", "gap", "space"],
    answer: "gap"
  },
  {
    question: "What does DOM stand for in web development?",
    options: [
      "Document Object Model",
      "Data Object Manager",
      "Digital Ordinance Model",
      "Document Order Method"
    ],
    answer: "Document Object Model"
  },
  {
    question: "Which keyword declares a block-scoped variable in JavaScript that cannot be reassigned?",
    options: ["var", "let", "const", "static"],
    answer: "const"
  }
];

// Quiz state variables
const TIME_PER_QUESTION = 15; // seconds
let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;
let answerSubmitted = false;
let timeLeft = TIME_PER_QUESTION;
let timerInterval = null;

// DOM references
const questionCounterEl = document.getElementById("question-counter");
const timerEl = document.getElementById("timer");
const questionTextEl = document.getElementById("question-text");
const optionsContainerEl = document.getElementById("options-container");
const feedbackTextEl = document.getElementById("feedback-text");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const scoreDisplayEl = document.getElementById("score-display");

// 2. Randomly shuffles a copy of the questions array (Fisher-Yates shuffle)
function shuffleQuestions() {
  const copy = [...questions];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// 3. Sets a countdown timer for answering each question
function startTimer() {
  clearInterval(timerInterval);
  timeLeft = TIME_PER_QUESTION;
  timerEl.textContent = `Time: ${timeLeft}s`;
  timerEl.classList.remove("warning");

  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time: ${timeLeft}s`;

    if (timeLeft <= 5) {
      timerEl.classList.add("warning");
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      if (!answerSubmitted) {
        // Auto-handle timeout as unanswered / incorrect
        answerSubmitted = true;
        submitBtn.disabled = true;
        nextBtn.disabled = false;

        const currentQ = shuffledQuestions[currentQuestionIndex];
        const optionButtons = optionsContainerEl.querySelectorAll(".option-btn");
        optionButtons.forEach((btn) => {
          btn.disabled = true;
          if (btn.dataset.value === currentQ.answer) {
            btn.classList.add("correct");
          }
        });

        feedbackTextEl.textContent = `Time's up! Correct answer: ${currentQ.answer}`;
        feedbackTextEl.className = "feedback-text incorrect";
      }
    }
  }, 1000);
}

// 4. Displays the current question and answer options
function displayQuestion() {
  selectedOption = null;
  answerSubmitted = false;
  feedbackTextEl.textContent = "";
  feedbackTextEl.className = "feedback-text";

  submitBtn.disabled = true;
  nextBtn.disabled = true;

  const currentQ = shuffledQuestions[currentQuestionIndex];
  questionCounterEl.textContent = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
  questionTextEl.textContent = currentQ.question;
  optionsContainerEl.innerHTML = "";

  currentQ.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn";
    btn.textContent = option;
    btn.dataset.value = option;

    btn.addEventListener("click", () => {
      if (answerSubmitted) return;

      optionsContainerEl.querySelectorAll(".option-btn").forEach((el) => {
        el.classList.remove("selected");
      });
      btn.classList.add("selected");
      selectedOption = option;
      submitBtn.disabled = false;
    });

    optionsContainerEl.appendChild(btn);
  });
}

// 5. Checks whether the selected answer is correct and updates the score
function checkAnswer() {
  if (!selectedOption || answerSubmitted) return;

  answerSubmitted = true;
  clearInterval(timerInterval);
  submitBtn.disabled = true;
  nextBtn.disabled = false;

  const currentQ = shuffledQuestions[currentQuestionIndex];
  const optionButtons = optionsContainerEl.querySelectorAll(".option-btn");

  optionButtons.forEach((btn) => {
    btn.disabled = true;
    if (btn.dataset.value === currentQ.answer) {
      btn.classList.add("correct");
    } else if (btn.dataset.value === selectedOption) {
      btn.classList.add("incorrect");
    }
  });

  if (selectedOption === currentQ.answer) {
    score++;
    feedbackTextEl.textContent = "Correct! Great job.";
    feedbackTextEl.className = "feedback-text correct";
  } else {
    feedbackTextEl.textContent = `Incorrect. The correct answer is: ${currentQ.answer}`;
    feedbackTextEl.className = "feedback-text incorrect";
  }

  scoreDisplayEl.textContent = `Score: ${score}`;
}

// 6. Moves to the next question, resetting the timer and updating the score display
function nextQuestion() {
  clearInterval(timerInterval);
  scoreDisplayEl.textContent = `Score: ${score}`;
  currentQuestionIndex++;

  if (currentQuestionIndex < shuffledQuestions.length) {
    displayQuestion();
    startTimer();
  } else {
    showFinalSummary();
  }
}

function showFinalSummary() {
  clearInterval(timerInterval);
  questionCounterEl.textContent = "Quiz Completed";
  timerEl.textContent = "Time: --";
  timerEl.classList.remove("warning");
  questionTextEl.textContent = `You finished the quiz! Final Score: ${score} / ${shuffledQuestions.length}`;
  optionsContainerEl.innerHTML = "";
  feedbackTextEl.textContent = "";
  feedbackTextEl.className = "feedback-text";

  submitBtn.classList.add("hidden");
  nextBtn.classList.add("hidden");
  restartBtn.classList.remove("hidden");

  scoreDisplayEl.textContent = `Final Score: ${score} / ${shuffledQuestions.length}`;
}

// 7. Starts the quiz by shuffling questions, displaying the first question, and starting the timer
function startQuiz() {
  clearInterval(timerInterval);
  score = 0;
  currentQuestionIndex = 0;
  shuffledQuestions = shuffleQuestions();

  scoreDisplayEl.textContent = `Score: ${score}`;
  submitBtn.classList.remove("hidden");
  nextBtn.classList.remove("hidden");
  restartBtn.classList.add("hidden");

  displayQuestion();
  startTimer();
}

// Event listeners
submitBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);

// Initialize quiz on page load
startQuiz();