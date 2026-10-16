function createElement() {
   const body = document.querySelector("body");
   const gameBoardContainer = document.createElement("div");
   const gameStatus = document.createElement("div");
   const btn = document.createElement("button");
   const gameMessage = document.createElement("div");
   const playerStatus = document.createElement("div");
   playerStatus.classList.add("player-status");
   gameStatus.classList.add("game-status");
   btn.classList.add("restart-btn");
   btn.textContent = "재시작";

   gameBoardContainer.classList.add("gameBoardContainer");
   body.appendChild(playerStatus);
   body.appendChild(gameStatus);
   gameStatus.appendChild(btn);
   gameStatus.appendChild(gameMessage);

   body.appendChild(gameBoardContainer);

   return { body, gameBoardContainer, btn, gameMessage, playerStatus };
}

function createBoardGrid() {
   const boardElement = createElement();
   const gameBoardContainer = boardElement.gameBoardContainer;

   const grids = [];
   for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
         const grid = document.createElement("div");
         grid.style.width = `calc(100% / 3)`;
         grid.style.height = `calc(100% / 3)`;
         grid.classList.add(`cell-${i}-${j}`);
         gameBoardContainer.appendChild(grid);

         row.push(grid);
      }
      grids.push(row);
   }

   return { grids, gameBoardContainer, boardElement };
}
function restartBoard(
   boardElement,
   restartGame,
   playerInControl,
   showGameMessage,
   showPlayerStatus,
) {
   boardElement.btn.addEventListener("click", () => {
      playerInControl.victoryNotFound = true;
      showGameMessage.textContent = "";
      showPlayerStatus.textContent = "";
      restartGame();
   });
   return { restartBoard };
}
const gameBoard = (() => {
   let gamePlayer;
   let gamePlayer1 = "";
   let gamePlayer2 = "";
   const gameBoard = [];
   let isFirstPlayerTurn = true;
   let isMoveForbidden = false;
   let victoryNotFound = true;

   const newGameBoard = () => {
      for (let i = 0; i < 3; i++) {
         const row = [];
         for (let j = 0; j < 3; j++) {
            row.push(0);
         }
         gameBoard.push(row);
      }
   };

   const player = (name, marker) => {
      gamePlayer = name + " " + marker;
      if (gamePlayer1 === "") {
         gamePlayer1 = gamePlayer;
         console.log(gamePlayer1);
      } else {
         gamePlayer2 = gamePlayer;
         console.log(gamePlayer2);
      }
   };

   return {
      gameBoard,
      newGameBoard,
      player,
      isFirstPlayerTurn,
      isMoveForbidden,
      victoryNotFound,
   };
})();

function gameControl() {
   let inGameBoard = gameBoard.gameBoard;
   let firstPlayerTurn = gameBoard.isFirstPlayerTurn;
   let isMoveForbidden = gameBoard.isMoveForbidden;
   let victoryNotFound = gameBoard.victoryNotFound;

   let successfulMoveCount = 0;

   const boardData = createBoardGrid();
   const grids = boardData.grids;

   const gameMessage = boardData.boardElement;
   const showGameMessage = gameMessage.gameMessage;
   const playerStatus = boardData.boardElement;
   const showPlayerStatus = playerStatus.playerStatus;

   const incrementMoveCount = () => {
      successfulMoveCount++;
      console.log(successfulMoveCount);
   };
   function checkDraw() {
      if (successfulMoveCount === 9) {
         console.log("무승부");

         console.log("게임끝 재시작 해주세요");
         console.log(inGameBoard);

         showGameMessage.textContent = "무승부!";
         showPlayerStatus.textContent = "게임끝 재시작 해주세요";
         isMoveForbidden = true;
      }
   }

   function game(row, col) {
      if (firstPlayerTurn) {
         if (row < 3 && col < 3) {
            if (!isMoveForbidden) {
               if (isDuplication() === true) {
                  console.log("중복");
                  showPlayerStatus.textContent = "중복";
                  return;
               }
               inGameBoard[row][col] = "X";

               grids[row][col].textContent = "X";
               console.log("hyeon X 착수.");
               console.log(isMoveForbidden);
               showPlayerStatus.textContent = "hyeon X 착수";

               incrementMoveCount();

               firstPlayerTurn = false;
            } else {
               console.log("게임끝 재시작해주세요");
               console.log(isMoveForbidden);
               showPlayerStatus.textContent = "게임끝 재시작 해주세요";
            }
         } else if (row >= 3 || col >= 3) {
            console.log("X 차례 범위를 다시 지정하세요 현재 턴: 'X')");
            firstPlayerTurn = true;
         }
      } else if (firstPlayerTurn === false) {
         if (row < 3 && col < 3) {
            if (!isMoveForbidden) {
               if (isDuplication() === true) {
                  console.log("중복");
                  showPlayerStatus.textContent = "중복";
                  return;
               }
               inGameBoard[row][col] = "O";
               grids[row][col].textContent = "O";
               console.log("steve O 착수.");
               showPlayerStatus.textContent = "steve O 착수";

               incrementMoveCount();
               firstPlayerTurn = true;
            } else {
               console.log("게임끝 재시작해주세요");
               console.log(isMoveForbidden);
               showPlayerStatus.textContent = "게임끝 재시작 해주세요";
            }
         } else if (row >= 3 || col >= 3) {
            console.log("범위를 다시 지정하세요 (현재 턴: 'O')");
            firstPlayerTurn = false;
         }
      }

      function blockPlacing() {
         isMoveForbidden = true;
      }

      function isDuplication() {
         if (inGameBoard[row][col] === "X" || inGameBoard[row][col] === "O") {
            return true;
         }
      }

      return { firstPlayerTurn, blockPlacing };
   }

   function restart() {
      for (let i = 0; i < 3; i++) {
         for (let j = 0; j < 3; j++) {
            inGameBoard[i][j] = 0;
            grids[i][j].textContent = "";
         }
      }

      successfulMoveCount = 0;

      isMoveForbidden = false;
      firstPlayerTurn = true;
      victoryNotFound = true;
      return { victoryNotFound };
   }

   return {
      gameControl,
      game,
      restart,
      victoryNotFound,
      inGameBoard,
      checkDraw,
      grids,
      boardData,
      showPlayerStatus,
      showGameMessage,
   };
}

gameBoard.newGameBoard();
gameBoard.player("hyeon", "X");
gameBoard.player("steve", "O");

(function callGame() {
   const callBoard = gameBoard.gameBoard;
   const inGameControl = gameControl();
   const boardData = inGameControl.boardData;
   const boardElement = boardData.boardElement;

   const showGameMessage = inGameControl.showGameMessage;
   const showPlayerStatus = inGameControl.showPlayerStatus;
   let playerInControl = inGameControl.restart();

   const restartGame = inGameControl.restart;

   restartBoard(
      boardElement,
      restartGame,
      playerInControl,
      showGameMessage,
      showPlayerStatus,
   );
   const moveBlock = inGameControl.game();
   const playerCheckDraw = inGameControl.checkDraw;

   (function playStone() {
      for (let i = 0; i < 3; i++) {
         for (let j = 0; j < 3; j++) {
            inGameControl.grids[i][j].addEventListener("click", () => {
               inGameControl.game(i, j);

               declareVictory();
               checkVictory();
            });
         }
      }
   })();

   function checkVictory() {
      if (playerInControl.victoryNotFound === false) {
         moveBlock.blockPlacing();
      } else if (playerInControl.victoryNotFound === true) {
         playerCheckDraw();
      }
   }

   function declareVictory() {
      for (let i = 0; i < 3; i++) {
         if (
            callBoard[i][0] == "X" &&
            callBoard[i][1] == "X" &&
            callBoard[i][2] == "X"
         ) {
            console.log("x승");
            showGameMessage.textContent = "x 승리!";
            playerInControl.victoryNotFound = false;

            console.log(callBoard);
            return;
         } else if (
            callBoard[0][i] == "X" &&
            callBoard[1][i] == "X" &&
            callBoard[2][i] == "X"
         ) {
            console.log("x승");
            showGameMessage.textContent = "x 승리!";
            playerInControl.victoryNotFound = false;
            console.log(callBoard);
            return;
         } else if (
            callBoard[0][0] == "X" &&
            callBoard[1][1] == "X" &&
            callBoard[2][2] == "X"
         ) {
            console.log("x승");
            showGameMessage.textContent = "x 승리!";
            playerInControl.victoryNotFound = false;
            console.log(callBoard);
            return;
         } else if (
            callBoard[2][0] == "X" &&
            callBoard[1][1] == "X" &&
            callBoard[0][2] == "X"
         ) {
            console.log("x승");
            showGameMessage.textContent = "x 승리!";
            playerInControl.victoryNotFound = false;
            console.log(callBoard);
            return;
         }
      }
      for (let i = 0; i < 3; i++) {
         if (
            callBoard[i][0] == "O" &&
            callBoard[i][1] == "O" &&
            callBoard[i][2] == "O"
         ) {
            console.log("O승");
            showGameMessage.textContent = "O 승리!";
            playerInControl.victoryNotFound = false;
            console.log(callBoard);
            return;
         } else if (
            callBoard[0][i] == "O" &&
            callBoard[1][i] == "O" &&
            callBoard[2][i] == "O"
         ) {
            console.log("O승");
            showGameMessage.textContent = "O 승리!";
            playerInControl.victoryNotFound = false;
            console.log(callBoard);
            return;
         } else if (
            callBoard[0][0] == "O" &&
            callBoard[1][1] == "O" &&
            callBoard[2][2] == "O"
         ) {
            console.log("O승");
            showGameMessage.textContent = "O 승리!";
            playerInControl.victoryNotFound = false;
            console.log(callBoard);
            return;
         } else if (
            callBoard[2][0] == "O" &&
            callBoard[1][1] == "O" &&
            callBoard[0][2] == "O"
         ) {
            console.log("O승");
            showGameMessage.textContent = "O 승리!";
            playerInControl.victoryNotFound = false;
            console.log(callBoard);
            return;
         }
      }
   }
})();
