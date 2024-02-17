const board = document.querySelector('.game-board');

const snake = [{ row: 10, col: 10 }];
let food = generateFood();
let direction = 'up';
let startGame = false;
let gameSpeed = 200;

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

console.log(snake);

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
  foodElement.className = 'food';
  foodElement.style.gridColumn = food.row;
  foodElement.style.gridRow = food.col;
  board.appendChild(foodElement);
}

function move() {
  draw();

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
  
  if (snake[0].row === food.row && snake[0].col === food.col) {
    snake.unshift(head);
    food = generateFood();
  } else {
    snake.unshift(head);
    snake.pop();
  }
}

function playGame(e) {
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

document.addEventListener('keydown', playGame);

setInterval(() => {
  move()
}, gameSpeed);