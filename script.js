const createGameBoard = (() => {
   let gamePlayer;
   let gamePlayer1 = "";
   let gamePlayer2 = "";
   const gameBoard = [];
   let isPlayer = true;
   const newGameBoard = () => {
      for (let i = 0; i < 3; i++) {
         const row = [];
         for (let j = 0; j < 3; j++) {
            row.push(0);
         }
         gameBoard.push(row);
      }
      console.log(gameBoard);
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

   return { gameBoard, newGameBoard, player, isPlayer };
})();

function gameControl() {
   const inGameBoard = createGameBoard.gameBoard;
   let playerTurn = createGameBoard.isPlayer;

   function game(row, col) {
      if (playerTurn) {
         console.log("hyeon X 차례입니다.");
         inGameBoard[row][col] = "X";

         playerTurn = false;
      } else {
         console.log("steve O 차례입니다.");
         inGameBoard[row][col] = "O";
         playerTurn = true;
      }
   }

   return { gameControl, game };
}

createGameBoard.newGameBoard();
createGameBoard.player("hyeon", "X");
createGameBoard.player("steve", "O");
callGame();
function callGame() {
   const inGameControl = gameControl();
   inGameControl.game(0, 0);
   inGameControl.game(0, 1);
   inGameControl.game(0, 2);
}

/* 게임 다시 function으로 하고 좀더 고민하고 안되면 문제해결 방법 논의*/
//  여기서 키포인트는 1. 즉시실행함수와 팩토리함수로 인스턴스 사용하는것
//  2. 안에서부터 집짓기 콘솔로부터 하고 DOM으로 마지막연결 메서드간 호출되며 상호작용이 되며 집안 내부구조가 잘 돌아가는지가 중요
//  3. 전역변수는 없이 만드는것
//  객체니까 . 점표시법가능
// 하려다 만것 -> let active = createGameBoard.my;를 어떻게 안에서 만들어서
//  순서마다 호출되게 할건지
//  팩토리함수에서 또다른 함수가 참조하는 방법은 return을 한 후에 변수에 담아 참조하면됨
//  오딘에서 참조했던것 그거 보면서 다른것들은 어떻게 참조했는지만 보면 팩토리함수 얼추 다됐다.
