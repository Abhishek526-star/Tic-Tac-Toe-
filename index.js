let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#Reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let modeToggleBtn = document.querySelector("#mode-toggle");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let playerScoreDisplay = document.querySelector("#player-score");
let aiScoreDisplay = document.querySelector("#ai-score");
let modeDisplay = document.querySelector("#mode-display");

let turn0 = true; 
let moves = 0;
let playerScore = 0;
let aiScore = 0;
let isAI = false; 


const clickSound = new Audio("sounds/tap.mp3");
const winSound = new Audio("sounds/game-win.mp3");
const drawSound = new Audio("sounds/draw.mp3");

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
  turn0 = true;
  moves = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let posval1 = boxes[pattern[0]].innerText;
    let posval2 = boxes[pattern[1]].innerText;
    let posval3 = boxes[pattern[2]].innerText;

    if (posval1 !== "" && posval1 === posval2 && posval2 === posval3) {
      if (posval1 === "O") {
        playerScore++;
        playerScoreDisplay.innerText = `Player: ${playerScore}`;
      } else {
        aiScore++;
        aiScoreDisplay.innerText = `${isAI ? "AI" : "Player 2"}: ${aiScore}`;
      }
      showWinner(posval1);
      return;
    }
  }

  
  if (moves === 9) {
    showDraw();
  }
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Winner is ${winner}! 🎉`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  winSound.play();
};

const showDraw = () => {
  msg.innerText = "It's a Draw! 🤝";
  msgContainer.classList.remove("hide");
  drawSound.play();
};


const aiMove = () => {
  let emptyBoxes = [];
  boxes.forEach((box, index) => {
    if (box.innerText === "") {
      emptyBoxes.push(index);
    }
  });

  
  if (emptyBoxes.length > 0) {
    let randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    boxes[randomIndex].innerText = "X";
    boxes[randomIndex].disabled = true;
    moves++;
    checkWinner();
    turn0 = true;
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    clickSound.play();

    if (turn0) {
      box.innerText = "O";
      turn0 = false;
      box.disabled = true;
      moves++;
      checkWinner();

      if (!msgContainer.classList.contains("hide")) {
        return;
      }

    
      if (isAI) {
        setTimeout(aiMove, 500);
      }
    } else if (!isAI) {
    
      box.innerText = "X";
      turn0 = true;
      box.disabled = true;
      moves++;
      checkWinner();
    }
  });
});


modeToggleBtn.addEventListener("click", () => {
  isAI = !isAI;
  modeDisplay.innerText = `Mode: ${isAI ? "AI" : "Friend"}`;
  resetGame();
});

resetbtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", () => {
  resetGame();
  playerScore = 0;
  aiScore = 0;
  playerScoreDisplay.innerText = "Player: 0";
  aiScoreDisplay.innerText = `${isAI ? "AI" : "Player 2"}: 0`;
});
