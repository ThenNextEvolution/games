const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

canvas.width = 480;
canvas.height = 320;

let score = 0;
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

let rightPressed = false;
let leftPressed = false;

// Dynamic block generation
let blockHeight = 20;
let blockWidth = 75;
let blockPadding = 10;
let blockOffsetTop = 30;
let blockOffsetLeft = 30;
let blockRowCount = 3;
let blockColumnCount = 5;
let blocksGenerated = 0; // Track how many blocks have been generated

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}

function generateBlocks() {
  let blocks = [];
  for (let c = 0; c < blockColumnCount; c++) {
    blocks[c] = [];
    for (let r = 0; r < blockRowCount; r++) {
      let blockX = c * (blockWidth + blockPadding) + blockOffsetLeft;
      let blockY = r * (blockHeight + blockPadding) + blockOffsetTop + blocksGenerated * (blockHeight + blockPadding) * blockRowCount;
      blocks[c][r] = { x: blockX, y: blockY, status: 1 };
    }
  }
  blocksGenerated++;
  return blocks;
}

let blocks = generateBlocks(); // Initialize the first set of blocks

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function collisionDetection() {
  for (let c = 0; c < blockColumnCount; c++) {
    for (let r = 0; r < blockRowCount; r++) {
      let b = blocks[c][r];
      if (b.status === 1) {
        if (x > b.x && x < b.x + blockWidth && y > b.y && y < b.y + blockHeight) {
          dy = -dy;
          b.status = 0;
          score++;
          scoreDisplay.innerHTML = "Score: " + score;

          // Check if new blocks need to be generated
          if (score % (blockRowCount * blockColumnCount) === 0) {
            blocks = generateBlocks();
          }
        }
      }
    }
  }
}

function drawBlocks() {
  for (let c = 0; c < blockColumnCount; c++) {
    for (let r = 0; r < blockRowCount; r++) {
      if (blocks[c][r].status === 1) {
        ctx.beginPath();
        ctx.rect(blocks[c][r].x, blocks[c][r].y, blockWidth, blockHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBlocks();
  drawBall();
  collisionDetection();

  if (rightPressed && x < canvas.width - ballRadius) {
    x += 7;
  } else if (leftPressed && x > ballRadius) {
    x -= 7;
  }

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

draw(); // Initial call to start the game loop