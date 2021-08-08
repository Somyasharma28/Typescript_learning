interface Board {
  playerTurn: string;
  board: string[][];
  gameEnd: true | false;
}

interface Reset {
  (): void;
}

type updateBoardType = () => void;
type squareClick = (element: HTMLElement) => void;
type checkGameEndType = () => void;
type checkRowType = () => true | false;
type checkColumnType = () => boolean;
type checkDiagonalType = () => true | false;
type checkDrawType = () => true | false;

const mainBoard: Board = {
  playerTurn: "X",
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  gameEnd: false,
};

const updateBoard: updateBoardType = () => {
  const boardValue = [
    ...mainBoard.board[0],
    ...mainBoard.board[1],
    ...mainBoard.board[2],
  ];

  for (let i = 0; i < boardValue.length; i++) {
    const id = i + 1;
    const gridBoardElement = document.getElementById(`${id}`) as HTMLDivElement;
    gridBoardElement.innerText = boardValue[i];
  }

  const playerElement = document.getElementById("playerInfo") as HTMLDivElement;
  if (mainBoard.playerTurn === "X") playerElement.innerText = "Player 1 Turn ";
  else playerElement.innerText = "Player 2 Turn ";

  
};

const checkRow: checkRowType = () => {
  const boardValue = [
    ...mainBoard.board[0],
    ...mainBoard.board[1],
    ...mainBoard.board[2],
  ];

  for (let i = 0; i < boardValue.length; i += 3) {
    if (
      boardValue[i] !== "" &&
      boardValue[i] === boardValue[i + 1] &&
      boardValue[i + 1] === boardValue[i + 2]
    ) {
      return true;
    }
  }
  return false;
};

const checkColumn: checkColumnType = () => {
  const boardValue = [
    ...mainBoard.board[0],
    ...mainBoard.board[1],
    ...mainBoard.board[2],
  ];

  for (let i = 0; i < boardValue.length; i++) {
    if (
      boardValue[i] !== "" &&
      boardValue[i] === boardValue[i + 3] &&
      boardValue[i + 3] === boardValue[i + 6]
    ) {
      return true;
    }
  }
  return false;
};

const checkLeftDiagonal: checkDiagonalType = () => {
  for (let i = 0; i < mainBoard.board.length - 1; i++) {
    if (
      mainBoard.board[i][i] === "" ||
      mainBoard.board[i][i] !== mainBoard.board[i + 1][i + 1]
    )
      return false;
  }

  return true;
};

const checkRightDiagonal: checkDiagonalType = () => {
  for (let i = 2, j = 0; i > 0; i--, j++) {
    if (
      mainBoard.board[j][i] === "" ||
      mainBoard.board[j][i] !== mainBoard.board[j + 1][i - 1]
    )
      return false;
  }

  return true;
};

const checkDraw: checkDrawType = () => {
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

const checkGameEnd: checkGameEndType = () => {
  const result =
    checkRow() || checkColumn() || checkLeftDiagonal() || checkRightDiagonal();
  if (result) {
    const player = mainBoard.playerTurn === "X" ? "Player2" : "Player1";
    const resultElement= document.getElementById('result');
    resultElement.innerText=`${player} won!!!`;
    mainBoard.gameEnd = true;
  }

  const draw = checkDraw();

  if (draw) {
    const resultElement= document.getElementById('result');
    resultElement.innerText=`Match Draw!!!`;
    mainBoard.gameEnd = true;
  }
};

const onBoardClick: squareClick = (element: HTMLElement) => {
  const idVal = Number(element.id);
  const i = Math.floor((idVal - 1) / 3);
  const j = (idVal - 1) % 3;
  if (mainBoard.board[i][j] === "" && mainBoard.gameEnd === false) {
    mainBoard.board[i][j] = mainBoard.playerTurn;
    if (mainBoard.playerTurn === "X") mainBoard.playerTurn = "O";
    else mainBoard.playerTurn = "X";

    updateBoard();
    checkGameEnd();
  }
  if (mainBoard.gameEnd === true) {
    const buttonElement = document.createElement("button");
    buttonElement.id = "reset";
    buttonElement.innerHTML = "ResetGame";
    buttonElement.addEventListener("click", reset);
  
    const playerInfoElement=document.getElementById('playerInfo');
    playerInfoElement.innerText="";
    playerInfoElement.appendChild(buttonElement);
  }
};

//start game
updateBoard();

const reset: Reset = () => {
  mainBoard.playerTurn = "X";
  mainBoard.board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  mainBoard.gameEnd = false;
  const resultElement= document.getElementById('result');
  resultElement.innerText="";
  updateBoard();
};


