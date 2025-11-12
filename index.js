console.log("Javascript from Tic Tac Toe")

let turn = "x" //x, o
let xResponseArray = []
let oResponseArray = []

var confettiIntervalID = 0

const winArray = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]
var win = 0
var xScore = document.getElementById("xScore")
var xScoreCount = 0

var oScore = document.getElementById("oScore")
var oScoreCount = 0

var drawScore = document.getElementById("drawScore")
var drawScoreCount = 0

var playerTurnLabel = document.getElementById("playerTurnLabel")

var trophyContainer = document.getElementById("trophy-container")
var trophy = document.getElementById("trophy")

function boardClicked(id) {
    console.log(id + " boardClicked")
    updateBoardLabel("boardLabel" + id, id)
}
function manageTurn() {
    if (turn === "x")
        turn = "o"
    else if (turn === "o")
        turn = "x"
}
function updateBoardLabel(labelId, id) {
    if (turn === "x") {
        console.log("xResponseArray.includes(id): ", xResponseArray.includes(id))
        if (!xResponseArray.includes(id) && !oResponseArray.includes(id)) {
            document.getElementById(labelId).textContent = "X"
            manageTurn()
            xResponseArray.push(id)
            if (xResponseArray.length > 2) {
                if (winCheck(xResponseArray)) {
                    xScore.textContent = ++xScoreCount
                    win = 1
                    console.log("X won");
                    showTtophy()
                }
            }
        }
    }
    else if (turn === "o") {
        if (!xResponseArray.includes(id) && !oResponseArray.includes(id)) {
            document.getElementById(labelId).textContent = "O"
            manageTurn()
            oResponseArray.push(id)
            if (oResponseArray.length > 2) {
                if (winCheck(oResponseArray)) {
                    oScore.textContent = ++oScoreCount
                    win = 1
                    console.log("O won");
                    showTtophy()
                }
            }
        }
    }
    // console.log("xResponseArray: ", xResponseArray)
    // console.log("oResponseArray: ", oResponseArray)
    if(xResponseArray.length + oResponseArray.length >= 9 && win == 0){
        drawScore.textContent = ++drawScoreCount
        console.log("Draw!!");
        
    }
}
function winCheck(responseArray) {
    return winArray.some(winCombo =>
        winCombo.every(num => responseArray.includes(num))
    );
    // checks in any of the array element is meeting 
    // the function returned output
}
function newGame() {
    for (let count = 1; count < 10; count++) {
        document.getElementById("boardLabel" + count).textContent = ""
    }
    xResponseArray = []
    oResponseArray = []
    turn = "x"
    playerTurnLabel.textContent = "X"
    win = 0
    hideTrophy()
}
function resetScores() {
    newGame()
    oScoreCount = 0
    xScoreCount = 0
    drawScoreCount = 0
    xScore.textContent = xScoreCount
    oScore.textContent = oScoreCount
    drawScore.textContent = drawScoreCount
    
}
function showTtophy(){
    trophyContainer.style.display = "flex"
    trophy.style.opacity = 1
    startConfetti()
}
function hideTrophy(){
    trophyContainer.style.display = "none"
    trophy.style.opacity = 0
    stopConfetti()
}

function startConfetti(){
    confetti({
        particleCount: 500,
        spread: 100,
        origin: {y:0.6},
        colors:['#0047ab', '#00bfff', '#ff0000', '#00ff00']
    })
    confettiIntervalID = setInterval(() =>{
        confetti({
                particleCount: 500,
                spread: 100,
                origin: {y:0.6},
                colors:['#0047ab', '#00bfff', '#ff0000', '#00ff00']
        })
    },4000);
}

function stopConfetti() {
    if (confettiIntervalID) {
        clearInterval(confettiIntervalID);
        confettiIntervalID = null;
    }
}