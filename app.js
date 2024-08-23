let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#resetBtn');
let newGameBtn = document.querySelector('#newBtn');
let msg = document.querySelector('#msg');
let msgContainer = document.querySelector('.msg-container');
let music = new Audio('mixkit2.wav');
let cheerup = new Audio('applause.mp3');
let gif = document.querySelector('.image');
let drawImg = document.querySelector('#gift');

let turnO = true; // playerX, playerO

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const checkWinners = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                return pos1; // Return the winner
            }
        }
    }
    return null; // No winner yet
}

const resetGame = () => {
    boxes.forEach((box) => {
        box.style.backgroundColor = 'white';
        box.innerText = ''; // Clear the text
        box.disabled = false;
    });
    turnO = true;
    msgContainer.classList.add('hide');
    drawImg.style.display = 'none';
    gif.style.display = 'block';
    cheerup.pause();
    cheerup.currentTime = 0;
}

const isTieMatch = () => {
    for (let box of boxes) {
        if (box.innerText === "") {
            return false;
        }
    }
    return true; // No empty boxes, hence a tie
}

const disableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}!`;
    msgContainer.classList.remove('hide');
    drawImg.style.display = 'none';
    disableBoxes();
    cheerup.currentTime = 0;
    cheerup.play();
}

const showDraw = () => {
    msg.innerText = "Match Draw.";
    msgContainer.classList.remove('hide');
    drawImg.classList.remove('hide');
    gif.style.display = 'none';
    disableBoxes();
    cheerup.pause();
}

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (turnO) {
            box.innerText = "O";
            box.style.color = 'white';
            box.style.backgroundColor = 'purple';
        } else {
            box.innerText = "X";
            box.style.color = 'white';
            box.style.backgroundColor = 'indigo';
        }
        box.disabled = true;
        turnO = !turnO; // Switch turns
        music.play();

        let winner = checkWinners();
        if (winner) {
            showWinner(winner);
        } else if (isTieMatch()) {
            showDraw();
        }
    });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
