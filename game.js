const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('scoreValue');

// 设置画布大小
canvas.width = 400;
canvas.height = 400;

// 游戏配置
const gridSize = 20;
const tileCount = canvas.width / gridSize;
let score = 0;

// 蛇的初始位置和速度
let snake = [
    { x: 5, y: 5 }
];
let velocityX = 0;
let velocityY = 0;

// 食物位置
let foodX = 10;
let foodY = 10;

// 游戏主循环
function gameLoop() {
    updateSnake();
    if (checkGameOver()) {
        alert('游戏结束！得分：' + score);
        resetGame();
        return;
    }
    clearCanvas();
    checkFoodCollision();
    drawFood();
    drawSnake();
    setTimeout(gameLoop, 100);
}

// 更新蛇的位置
function updateSnake() {
    const head = { x: snake[0].x + velocityX, y: snake[0].y + velocityY };
    snake.unshift(head);
    if (!checkFoodCollision()) {
        snake.pop();
    }
}

// 检查是否吃到食物
function checkFoodCollision() {
    if (snake[0].x === foodX && snake[0].y === foodY) {
        score += 10;
        scoreElement.textContent = score;
        generateFood();
        return true;
    }
    return false;
}

// 生成新的食物位置
function generateFood() {
    foodX = Math.floor(Math.random() * tileCount);
    foodY = Math.floor(Math.random() * tileCount);
}

// 检查游戏是否结束
function checkGameOver() {
    const head = snake[0];
    
    // 撞墙检测
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        return true;
    }
    
    // 自身碰撞检测
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    
    return false;
}

// 清空画布
function clearCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// 绘制食物
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(foodX * gridSize, foodY * gridSize, gridSize - 2, gridSize - 2);
}

// 绘制蛇
function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });
}

// 重置游戏
function resetGame() {
    snake = [{ x: 5, y: 5 }];
    velocityX = 0;
    velocityY = 0;
    score = 0;
    scoreElement.textContent = score;
    generateFood();
    gameLoop();
}

// 键盘控制
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (velocityY !== 1) {
                velocityX = 0;
                velocityY = -1;
            }
            break;
        case 'ArrowDown':
            if (velocityY !== -1) {
                velocityX = 0;
                velocityY = 1;
            }
            break;
        case 'ArrowLeft':
            if (velocityX !== 1) {
                velocityX = -1;
                velocityY = 0;
            }
            break;
        case 'ArrowRight':
            if (velocityX !== -1) {
                velocityX = 1;
                velocityY = 0;
            }
            break;
    }
});

// 开始游戏
gameLoop();