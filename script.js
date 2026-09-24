const createGameBoard = (() => {
   let gamePlayer;
   let gamePlayer1 = "";
   let gamePlayer2 = "";
   const newGameBoard = () => {
      const gameBoard = [];
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
      gamePlayer = name + marker;
      if (gamePlayer1 === "") {
         gamePlayer1 = gamePlayer;
         console.log(gamePlayer1);
      } else {
         gamePlayer2 = gamePlayer;
         console.log(gamePlayer2);
      }
   };
   return { newGameBoard, player };
})();
createGameBoard.newGameBoard();
createGameBoard.player("hyeon", "X");
createGameBoard.player("hyeon", "O");

//  팩토리함수로 플레이어가 어떻게 할수있을까
//  플레이어가 객체로 저장하는데 어떻게 내는 걸 맞추고 게임을 진행시킬수있을까
//  게임의 흐름을 제어하는 객체도 만들자
// 각함수끼리 값을 던져서 그함수가 실행되게 하는게 이번 과제 키포인트같음
// 하나의 팩토리함수에서 사용되게끔하고
