// variables
const tttContainer = document.querySelector(".ttt_container");
const allBtn = document.querySelectorAll(".btn");
const resetBtn = document.querySelector(".resetBtn");
const modalCon = document.querySelector(".modal-container");
const modalBtn = document.getElementById("modal-btn");
const modalImage = document.getElementById("modal-image");
const modalDltBtn = document.getElementById("dlt-modal");
const modalMssg = document.getElementById("modal-mssg");
const line = document.getElementById("line");
// array for image path
const modalSrc = {
  tieImg: "./assests/images/tie.png",
  winImg: "./assests/images/winner.png",
  winMssg: "Congratulations",
  tieMssg: "Let's give a try again!",
};

// Audio
const tieSound = new Audio("./assests/sound/aww.mp3");
const winSound = new Audio("./assests/sound/win.mp3");

// initial turn

let turnX = true;

// win patterns
let winPatterns = [
  [0, 1, 2, 5, -321, 0],
  [0, 4, 8, 0, -200, 48],
  [0, 3, 6, -110, -190, 90],
  [1, 4, 7, 4, -192, 90],
  [2, 5, 8, 121, -192, 90],
  [2, 4, 6, 0, -192, -47],
  [3, 4, 5, 5, -191, 0],
  [6, 7, 8, 5, -64, 0],
];

// funciton for chnage the turn
const chnageTurn = (btn) => {
  if (turnX) {
    turnX = false;
    btn.innerText = "X";
    btn.style.color = "blue";
  } else {
    turnX = true;
    btn.style.color = "red";
    btn.innerText = "O";
  }
  btn.disabled = true;
};

// function for checking winner

const checkWinner = () => {
  for (let pattern of winPatterns) {
    // console.log(pattern[0] , pattern[1] , pattern[2]);
    let pos1Val = allBtn[pattern[0]].innerText;
    let pos2Val = allBtn[pattern[1]].innerText;
    let pos3Val = allBtn[pattern[2]].innerText;
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        winSound.play();
        allBtn.forEach((e) => (e.disabled = true));
        line.classList.add("show");
        line.style.transform = `translate(${pattern[3]}px,${pattern[4]}px) rotate(${pattern[5]}deg)`;
        setTimeout(() => {
          modalCon.style.display = "block";
          modalMssg.innerText = `${modalSrc.winMssg}  ${pos1Val}  `;

          modalImage.src = modalSrc.winImg;

          tttContainer.style.display = "none";
        }, 1500);
        return true;
      }
    }
  }
};

// check for tie

const checkTie = () => {
  if (modalCon.style.display === "block") return;
  let allFilled = true;
  allBtn.forEach((e) => {
    if (e.innerText === "") allFilled = false;
  });
  if (allFilled) {
    winSound.pause();
    winSound.currentTime = 0;
    tieSound.play();
    modalCon.style.display = "block";
    modalMssg.innerText = modalSrc.tieMssg;
    tttContainer.style.display = "none";
    allBtn.forEach((e) => (e.disabled = true));
    modalImage.src = modalSrc.tieImg;
  }
};

allBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    chnageTurn(btn);
    const win = checkWinner();
    if (win) return;
    checkTie();
  });
});

// function for reset
const resetGame = () => {
  allBtn.forEach((e) => {
    e.innerText = "";
    e.disabled = false;
  });
  line.classList.remove("show");
  modalCon.style.display = "none";
  modalImage.src = "";
  modalMssg.innerText = "";
  tttContainer.style.display = "block";
  turnX = true;
  winSound.pause();
  winSound.currentTime = 0;
  tieSound.pause();
  tieSound.currentTime = 0;
};


// button listners
resetBtn.addEventListener("click", resetGame);
modalDltBtn.addEventListener("click", resetGame);
modalBtn.addEventListener("click", resetGame);
