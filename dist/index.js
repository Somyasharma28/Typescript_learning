const mainBoard = {
    playerTurn: "X",
    board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ],
    gameEnd: false,
};
const updateBoard = () => {
    const boardValue = [
        ...mainBoard.board[0],
        ...mainBoard.board[1],
        ...mainBoard.board[2],
    ];
    for (let i = 0; i < boardValue.length; i++) {
        const id = i + 1;
        const gridBoardElement = document.getElementById(`${id}`);
        gridBoardElement.innerText = boardValue[i];
    }
    const playerElement = document.getElementById("playerInfo");
    if (mainBoard.playerTurn === "X")
        playerElement.innerText = "Player 1 Turn ";
    else
        playerElement.innerText = "Player 2 Turn ";
};
const checkRow = () => {
    const boardValue = [
        ...mainBoard.board[0],
        ...mainBoard.board[1],
        ...mainBoard.board[2],
    ];
    for (let i = 0; i < boardValue.length; i += 3) {
        if (boardValue[i] !== "" &&
            boardValue[i] === boardValue[i + 1] &&
            boardValue[i + 1] === boardValue[i + 2]) {
            return true;
        }
    }
    return false;
};
const checkColumn = () => {
    const boardValue = [
        ...mainBoard.board[0],
        ...mainBoard.board[1],
        ...mainBoard.board[2],
    ];
    for (let i = 0; i < boardValue.length; i++) {
        if (boardValue[i] !== "" &&
            boardValue[i] === boardValue[i + 3] &&
            boardValue[i + 3] === boardValue[i + 6]) {
            return true;
        }
    }
    return false;
};
const checkLeftDiagonal = () => {
    for (let i = 0; i < mainBoard.board.length - 1; i++) {
        if (mainBoard.board[i][i] === "" ||
            mainBoard.board[i][i] !== mainBoard.board[i + 1][i + 1])
            return false;
    }
    return true;
};
const checkRightDiagonal = () => {
    for (let i = 2, j = 0; i > 0; i--, j++) {
        if (mainBoard.board[j][i] === "" ||
            mainBoard.board[j][i] !== mainBoard.board[j + 1][i - 1])
            return false;
    }
    return true;
};
const checkDraw = () => {
    const boardValue = [
        ...mainBoard.board[0],
        ...mainBoard.board[1],
        ...mainBoard.board[2],
    ];
    for (let i = 0; i < boardValue.length; i++) {
        if (boardValue[i] === "") {
            return false;
        }
    }
    return true;
};
const checkGameEnd = () => {
    const result = checkRow() || checkColumn() || checkLeftDiagonal() || checkRightDiagonal();
    if (result) {
        const player = mainBoard.playerTurn === "X" ? "Player2" : "Player1";
        const resultElement = document.getElementById('result');
        resultElement.innerText = `${player} won!!!`;
        mainBoard.gameEnd = true;
    }
    const draw = checkDraw();
    if (draw) {
        const resultElement = document.getElementById('result');
        resultElement.innerText = `Match Draw!!!`;
        mainBoard.gameEnd = true;
    }
};
const onBoardClick = (element) => {
    const idVal = Number(element.id);
    const i = Math.floor((idVal - 1) / 3);
    const j = (idVal - 1) % 3;
    if (mainBoard.board[i][j] === "" && mainBoard.gameEnd === false) {
        mainBoard.board[i][j] = mainBoard.playerTurn;
        if (mainBoard.playerTurn === "X")
            mainBoard.playerTurn = "O";
        else
            mainBoard.playerTurn = "X";
        updateBoard();
        checkGameEnd();
    }
    if (mainBoard.gameEnd === true) {
        const buttonElement = document.createElement("button");
        buttonElement.id = "reset";
        buttonElement.innerHTML = "ResetGame";
        buttonElement.addEventListener("click", reset);
        const playerInfoElement = document.getElementById('playerInfo');
        playerInfoElement.innerText = "";
        playerInfoElement.appendChild(buttonElement);
    }
};
//start game
updateBoard();
const reset = () => {
    mainBoard.playerTurn = "X";
    mainBoard.board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];
    mainBoard.gameEnd = false;
    const resultElement = document.getElementById('result');
    resultElement.innerText = "";
    updateBoard();
};
