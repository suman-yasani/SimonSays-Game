let gameSeq = [];
let userSeq = [];

const btnColors = ["blue", "yellow", "purple", "orange"];

let started = false;
let level = 0;
let highscore = 0;

let h3 = document.querySelector("h3");
let highscoreDisplay = document.querySelector("#highscore");

// Load highscore from local storage
if (localStorage.getItem("highscore")) {
    highscore = parseInt(localStorage.getItem("highscore"));
    highscoreDisplay.innerText = `Your Highscore: ${highscore}`;
}

document.addEventListener("keypress", () => {
    if (!started) {
        started = true;
    }

    levelUp();
});

function gameFlash(btn) {
    btn.classList.add("gameFlash");
    setTimeout(() => {
        btn.classList.remove("gameFlash");
    }, 500);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 500);
}

function levelUp() {
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btnColors.length);
    let randColor = btnColors[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

function updateHighscore() {
    if (level - 1 > highscore) {
        highscore = level - 1;
        localStorage.setItem("highscore", highscore);
        highscoreDisplay.innerText = `Highscore: ${highscore}`;
    }
}

function checkSeq(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(() => {
                levelUp();
            }, 1000);
        }
    } else {
        h3.innerHTML = `Game Over! Your score was <b>${level - 1}</b>. <br> Press any key to start again.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        }, 500);
        reset();
        updateHighscore(); // Check and update highscore when the game is over
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkSeq(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
