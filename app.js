let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#resetBtn');
let newGameBtn = document.querySelector('#newBtn');
let msg = document.querySelector('#msg');
let msgContainer = document.querySelector('.msg-container');
let music = new Audio('mixkit2.wav');
let cheerup = new Audio('applause.mp3');
let gif = document.querySelector('.image');
let drawImg = document.querySelector('#gift');

let turnO = true; //playerX,playerO

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

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
            }
        }
    }
}


const resetGame = () => {
    boxes.forEach((box)=>{
    box.style.backgroundColor = 'white';
    })
    turnO = true;
    enableBoxes();
    msgContainer.classList.add('hide');
    cheerup.pause();
    cheerup.currentTime = 0;

}

const isTieMatch = () => {
    // Check if all boxes are filled and no winner is found
    for (let box of boxes) {
        if (!box.innerText) {
            return false;
        }
    }

    // No empty boxes, no winner => tie
    return true;
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulation, Winner is ${winner} `;
    msgContainer.classList.remove('hide');
    drawImg.style.display = 'none';
    disableBoxes();
    cheerup.currentTime =0;
    cheerup.play();
}

const showdraw = () => {
    msg.innerText = "Match Draw."
    msgContainer.classList.remove('hide');
    drawImg.classList.remove('hide');
    gif.style.display = 'none';
    drawImg.style.display = 'block';
    disableBoxes();
    cheerup.pause();

}



boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (turnO) {
            box.innerText = "O";
            box.style.color = 'white';
            box.style.backgroundColor = 'purple';
            turnO = false;
        }
        else {
            box.innerText = "X";
            box.style.color = 'white';
            box.style.backgroundColor = 'indigo';
            turnO = true;
        }
        box.disabled = true;
        music.play();
       // checkWinners();
       if(checkWinners()){
        showWinner();
       }
        else if (!checkWinners() && isTieMatch()) {
            showdraw();
        }
    })
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
