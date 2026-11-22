// Game state variables
let gameStarted = false;
let playerName = "";
let wins = 0;
let losses = 0;
let draws = 0;
let roundCount = 0;
let results = [];

// Starts the game after validating the player's name
function startGame() {
  const nameInput = document.getElementById("playerName").value.trim();

  if (nameInput === "") {
    alert("Please enter your name.");
    return;
  }

  playerName = nameInput;
  gameStarted = true;

  document.getElementById("welcomeMsg").innerHTML = "Welcome, " + playerName + "!";
  document.getElementById("startTime").innerHTML = "Started on: " + new Date();
}

// Randomly returns "rock", "paper", or "scissors"
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

// Plays one round, updates images, result text , score, and history table
function playRound(playerChoice) {
  if (!gameStarted) {
    alert("Click Start Game first.");
    return;
  }

  const computerChoice = getComputerChoice();
  roundCount++;

  // Update both choice images
  document.getElementById("playerImg").src = playerChoice + ".png";
  document.getElementById("computerImg").src = computerChoice + ".png";

  let outcome = "";
  let colour = "";

  if (playerChoice === computerChoice) {
    outcome = "Draw";
    colour = "grey";
    draws++;
    document.getElementById("draws").innerHTML = draws;
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "scissors" && computerChoice === "paper") ||
    (playerChoice === "paper" && computerChoice === "rock")
  ) {
    outcome = "Win";
    colour = "green";
    wins++;
    document.getElementById("wins").innerHTML = wins;
  } else {
    outcome = "Lose";
    colour = "red";
    losses++;
    document.getElementById("losses").innerHTML = losses;
  }

  const resultEl = document.getElementById("result");
  resultEl.innerHTML = outcome + "! You chose " + playerChoice + " and Computer chose " + computerChoice + ".";
  resultEl.style.color = colour;

  // Store round outcome and append a row to the history table
  results.push(outcome);
  document.getElementById("historyBody").innerHTML +=
    "<tr>" +
    "<td>" + roundCount + "</td>" +
    "<td>" + playerChoice + "</td>" +
    "<td>" + computerChoice + "</td>" +
    "<td>" + outcome + "</td>" +
    "</tr>";
}

// Loops through results to count wins and displays total rounds and win percentage
function showSummary() {
  const totalRounds = results.length;
  let winCount = 0;

  for (let i = 0; i < results.length; i++) {
    if (results[i] === "Win") {
      winCount++;
    }
  }

  const percentage = totalRounds > 0 ? Math.round((winCount / totalRounds) * 100) : 0;
  document.getElementById("summary").innerHTML =
    "You played " + totalRounds + " rounds and won " + percentage + "%.";
}

// Resets scores, results array, history rows, result text, and summary
function resetGame() {
  wins = 0;
  losses = 0;
  draws = 0;
  roundCount = 0;
  results = [];

  document.getElementById("wins").innerHTML = "0";
  document.getElementById("losses").innerHTML = "0";
  document.getElementById("draws").innerHTML = "0";
  document.getElementById("historyBody").innerHTML = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("summary").innerHTML = "";
}