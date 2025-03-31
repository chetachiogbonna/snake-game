const border2 = document.querySelector('.border-2');
const board = document.querySelector(".game-board")

let startGame = false;

function game() {
  const snake = [{ row: 10, col: 10 }];
  let food = generateFood();
  let direction = 'up';
  let isGamePaused = false;
  let gameSpeed = 200;
  let gameSpeedIntervalId;
  
  function generateFood() {
    const row = Math.floor(Math.random() * 20) + 1;
    const col = Math.floor(Math.random() * 20) + 1;
    return { row, col };
  }
  
  function draw() {
    board.innerHTML = '';
    drawSnake();
    drawFood();
  }
  
  function drawSnake() {
    snake.forEach((element) => {
      const snakeElement = document.createElement('div');
      snakeElement.className = 'snake';
      snakeElement.style.gridColumn = element.row;
      snakeElement.style.gridRow = element.col;
      board.appendChild(snakeElement);
    });
  }
  
  function drawFood() {
    const foodElement = document.createElement('div');
    foodElement.className = 'food'
    foodElement.innerHTML = '&#127822;';
    foodElement.style.zIndex = 100;
    foodElement.style.gridColumn = food.row;
    foodElement.style.gridRow = food.col;
    board.appendChild(foodElement);
  }
  
  function move() {
    if (startGame) {
      draw();

      const snakeHiss = new Audio("./snake-hissing.mp3");
      snakeHiss.loop
      snakeHiss.play()
    
      const head = { ...snake[0] };
    
      switch (direction) {
        case 'up':
          head.col--;
          break;
        case 'down':
          head.col++;
          break;
        case 'left':
          head.row--;
          break;
        case 'right':
          head.row++;
          break;
      }
      
      snake.unshift(head);
      
      if (snake[0].row === food.row && snake[0].col === food.col) {
        food = generateFood();
      } else if (snake[0].row > 20 || snake[0].row < 1 || snake[0].col > 20 || snake[0].col < 1) {
        const snakeCry = new Audio("./snake_bite_sound.wav")
        clearInterval(gameSpeedIntervalId)
        snakeCry.play()
        startGame = false;
        
        endGame()
      } else {
        snake.pop();
      }
    
      checkCollission();
    } else {
      endGame()
    }
  }
  
  function checkCollission() {  
    const head = snake[0];
    for (let i = 0; i <= snake.length; i++) {
      const sn = snake[i];
      if (i === 0) continue
      if ((head.row === sn.row) && (head.col === sn.col)) {
        const snakeHiss = new Audio("./snake_bite_sound.wav");
        clearInterval(gameSpeedIntervalId)
        snakeHiss.play()
        endGame()
        startGame = false;
        return game() 
      }
    }
  }

  function endGame() {
    board.classList.remove("game-board-active");
    border2.classList.add("border-2")
    if (document.querySelector(".food")) {
      document.querySelector(".food").remove();
    }
  }
  
  function playGame(e) {
    if (!startGame && e.key === "Enter") {
      startGame = true;
      game();
    }
  
    if (startGame) {
      border2.classList.remove("border-2")
      board.classList.add("game-board-active");
      draw()
    }
  
    if (startGame && !isGamePaused) {
      switch (e.key) {
        case 'ArrowUp':
          direction = 'up';
          break;
        case 'ArrowDown':
          direction = 'down';
          break;
        case 'ArrowLeft':
          direction = 'left';
          break;
        case 'ArrowRight':
          direction = 'right';
          break;
      }
    }
  
    if (e.key === "p") {
      if (startGame && isGamePaused) {
        gameSpeedIntervalId = setInterval(() => {
          move()
        }, gameSpeed);
        isGamePaused = false
      } else {
        clearInterval(gameSpeedIntervalId)
        isGamePaused = true
      }
    }
  }
  
  document.addEventListener('keydown', playGame);
  
  if (startGame) {
    gameSpeedIntervalId = setInterval(() => {
      move()
      console.log("ok...")
    }, gameSpeed);
  }
}

game();