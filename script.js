const createGameBoard = (() => {
   let gamePlayer;
   let gamePlayer1 = "";
   let gamePlayer2 = "";
   const gameBoard = [];
   let x = true;
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
   const controlGame = (row, col) => {
      if (x) {
         console.log("hyeon X 차례입니다.");
         gameBoard[row][col] = "X";
         x = false;
      } else {
         console.log("steve O 차례입니다.");
         gameBoard[row][col] = "O";
         x = true;
      }
   };
   return { newGameBoard, player, controlGame };
})();

createGameBoard.newGameBoard();
createGameBoard.player("hyeon", "X");
createGameBoard.player("steve", "O");
createGameBoard.controlGame(1, 2);
createGameBoard.controlGame(0, 2);

//  여기서 키포인트는 1. 즉시실행함수와 팩토리함수로 인스턴스 사용하는것
//  2. 안에서부터 집짓기 콘솔로부터 하고 DOM으로 마지막연결 메서드간 호출되며 상호작용이 되며 집안 내부구조가 잘 돌아가는지가 중요
//  3. 전역변수는 없이 만드는것
