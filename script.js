// HTML, CSS, JavaScript 파일을 만들어 프로젝트를 준비하고, Git 저장소 설정도 마치세요.

// Gameboard 객체 안에 게임판을 배열로 저장할 것이니, 여기서부터 시작하세요! 플레이어도 객체로 저장할 것이며,
// 게임 자체의 흐름을 제어하는 객체도 필요할 것입니다.

function newGameBoard() {
   const gameBoard = [];
   for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
         row.push(0);
      }
      gameBoard.push(row);
   }
   console.log(gameBoard);
}

newGameBoard();
