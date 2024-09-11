let buttons = document.querySelectorAll(".butt");
let newGameButton = document.querySelector(".newgame-button");
let resetGameButton = document.querySelector("#reset");

let turnPlayer1 = true;
let winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function resetGame() {
  turnPlayer1 = true;
  enableAllButtons();

  for (let b of buttons) {
    b.innerText = "";
  }
}

function enableAllButtons() {
  buttons.forEach((button) => {
    button.disabled = false;
  });
  resetGameButton.disabled = false;
}

function markButton(button) {
  if (turnPlayer1) {
    button.innerText = "X";
    turnPlayer1 = false;
  } else {
    button.innerText = "O";
    turnPlayer1 = true;
  }
  button.disabled = true;
}

function furtherProcessing() {
  if (isWon()) {
    winnerBoard();
  } else if (isDraw()) {
    drawBoard();
  }
}

function isWon() {
  let isWon = false;

  for (let pattern of winningPatterns) {
    let val1 = buttons[pattern[0]].innerText;
    let val2 = buttons[pattern[1]].innerText;
    let val3 = buttons[pattern[2]].innerText;

    if (val1 != "" && val2 != "" && val3 != "") {
      if (val1 == val2 && val2 == val3) {
        isWon = true;
        break;
      }
    }
  }
  return isWon;
}

function winnerBoard() {
  disableAllButtons();

  let heading = document.querySelector(".winner-header");
  let player = turnPlayer1 ? "2" : "1";
  let str = `Player-${player} is Winner !!!`;
  heading.innerText = str;

  let winnerDiv = document.querySelector(".winner");
  winnerDiv.style.display = "flex";
}

function disableAllButtons() {
  buttons.forEach((button) => {
    button.disabled = true;
  });
  resetGameButton.disabled = true;
}

function isDraw() {
  let isDraw = true;

  for (let button of buttons) {
    if (button.innerText == "") {
      isDraw = false;
      break;
    }
  }

  return isDraw;
}

function drawBoard() {
  console.log("game draw!!");
  disableAllButtons();

  let heading = document.querySelector(".winner-header");
  let str = "GAME DRAW !!";
  heading.innerText = str;

  let winnerDiv = document.querySelector(".winner");
  winnerDiv.style.display = "flex";
}

// Board Button Events
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    markButton(button);
    furtherProcessing();
  });
  button.addEventListener("mouseover", () => {
    if (button.disabled == false) {
      button.classList.add("buttonhover");
    }
  });
  button.addEventListener("mouseout", () => {
    button.classList.remove("buttonhover");
  });
});

// Reset Button Events
resetGameButton.addEventListener("click", () => {
  resetGame();
});

resetGameButton.addEventListener("mouseover", () => {
  if (resetGameButton.disabled == false) {
    resetGameButton.classList.add("resethover");
  }
});

resetGameButton.addEventListener("mouseout", () => {
  resetGameButton.classList.remove("resethover");
});

// New Game Button Events
newGameButton.addEventListener("click", () => {
  let winnerDiv = document.querySelector(".winner");
  winnerDiv.style.display = "none";
  resetGame();
});


