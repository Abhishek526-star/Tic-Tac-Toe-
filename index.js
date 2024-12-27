let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#Reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turn0 = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.innerText = "O";
      turn0 = false;
    } else {
      box.innerText = "X";
      turn0 = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

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

const showWinner = (Winner) => {
  msg.innerText = `Winner is ${Winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const showDraw = () => {
  msg.innerText = "Match is a Draw!";
  msgContainer.classList.remove("hide");
};

const checkWinner = () => {
  let isWinner = false;

  for (let patterns of winPatterns) {
    let posval1 = boxes[patterns[0]].innerText;
    let posval2 = boxes[patterns[1]].innerText;
    let posval3 = boxes[patterns[2]].innerText;

    if (posval1 !== "" && posval2 !== "" && posval3 !== "") {
      if (posval1 === posval2 && posval2 === posval3) {
        isWinner = true;
        showWinner(posval1);
        return; // Exit the function if a winner is found
      }
    }
  }

  // Check for a draw if no winner
  const allBoxesFilled = Array.from(boxes).every((box) => box.innerText !== "");
  if (!isWinner && allBoxesFilled) {
    showDraw();
  }
};

newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
