let ball = document.getElementById("ball");
let box = document.getElementById("box");
let bar = document.getElementById("bar");
let replayCard = document.getElementById("replayCard");
// localStorage.removeItem("highScore");
function startGame() {
    let x = 0;
    let y = 0;
    let flagX = 0;
    let flagY = 0;
    let ballSpeed=1;
    let currentScore = 0;
    let highScore = localStorage.getItem("highScore");
    document.getElementById("hScore").innerHTML = highScore;
    document.getElementById("playCard").style.display = "none";
    replayCard.style.display = "none";
    let highScoreFlag = 0;
    let play = setInterval(() => {
        ball.style.transform = `translate(${x}px, ${y}px)`;
        if (x + 35 >= box.offsetWidth) {
            flagX = 1;
        } else if (x <= 0) {
            flagX = 0;
        }
        if (flagX) {
            if (box.offsetWidth < 500) {
                x -= ballSpeed-0.3;
            } else {
                x -= ballSpeed;
            }
        } else {
            if (box.offsetWidth < 500) {
                x += ballSpeed-0.3;
            } else {
                x += ballSpeed;
            }
        }
        let ballpos = ball.getBoundingClientRect();
        let barpos = bar.getBoundingClientRect();
        if (ballpos.bottom >= barpos.top) {
            flagY = 1;
        } else if (y <= 0) {
            flagY = 0;
        }
        if (flagY) {
            if (box.offsetWidth < 500) {
                y -= ballSpeed-0.3;
            } else {
                y -= ballSpeed;
            }
        } else {
            if (box.offsetWidth < 500) {
                y += ballSpeed-0.3;
            } else {
                y += ballSpeed;
            }
        }

        if (ballpos.bottom >= barpos.top) {
            if (!(ballpos.right >= barpos.left && ballpos.left <= barpos.right)) {
                clearInterval(play);
                replayCard.style.display = "flex";
                if (highScoreFlag) {
                    document.getElementById("showScore").innerHTML = `New High Score!: ${currentScore}`;
                } else {
                    document.getElementById("showScore").innerHTML = `Your Score: ${currentScore}`;
                }
            } else {
                currentScore++;
                ballSpeed+=0.05;
                document.getElementById("currScore").innerHTML = currentScore;
                if (highScore < currentScore) {
                    highScoreFlag = 1;
                    highScore = currentScore;
                    localStorage.setItem("highScore", highScore);
                    document.getElementById("hScore").innerHTML = highScore;
                }
            }
        }

    });

}

let barX = 0;
let leftButton = document.getElementById("button1");
let rightButton = document.getElementById("button2");

function shiftLeftBar() {
    if ((Math.abs(barX) + ((bar.offsetWidth) / 2) < (box.offsetWidth) / 2) || barX > 0) {
        barX -= 40;
        bar.style.transform = `translate(${barX}px,0px)`;
    }
}
function shiftRightBar() {
    if ((Math.abs(barX) + ((bar.offsetWidth) / 2) < (box.offsetWidth) / 2) || barX < 0) {
        barX += 40;
        bar.style.transform = `translate(${barX}px,0px)`;
    }
}

leftButton.addEventListener("click", () => {
    shiftLeftBar();
});

rightButton.addEventListener("click", () => {
    shiftRightBar();
});

addEventListener("keydown", (event) => {
    if (event.code === "ArrowRight") {
        shiftRightBar();
        rightButton.style.boxShadow = "inset 0px 0px 10px 5px black";
    }
    if (event.code === "ArrowLeft") {
        shiftLeftBar();
        leftButton.style.boxShadow = "inset 0px 0px 10px 5px black";
    }
});


addEventListener("keyup", (event) => {
    if (event.code === "ArrowRight") {
        shiftRightBar();
        rightButton.style.boxShadow = "inset 0px 0px 0px 0px black";
    }
    if (event.code === "ArrowLeft") {
        leftButton.style.boxShadow = "inset 0px 0px 0px 0px black";
    }
});