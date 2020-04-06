// this is for the canvas content
const cvs = document.getElementById("breackOut");
const ctx = cvs.getContext("2d");
// this code is background image
const BG_IMG = new Image();
BG_IMG.src = "img/color.jpg";
// border for canvas
cvs.style.border = "1px solid #000000"
// this is the game variable and constants
const PADDLE_WIDTH = 100;
const PADDLE_MARGIN_BOTTOM = 50;
const PADDLE_HEIGHT = 20;
const BALL_RADIUS = 8;
let LIFE = 5;
let leftArrow = false;
let  rightArrow = false;
// code for the line with of the paddle
ctx.lineWidth = 3;
// code for creating paddle
const paddle = {
    x : cvs.width/2 - PADDLE_WIDTH/2,
    y : cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
    width : PADDLE_WIDTH,
    height : PADDLE_WIDTH,
    dx :5
}
// code that will draw the paddle
function drawPaddle (){
    ctx.fillStyle = '#2e3548';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.strokeStyle = "#ffcd05";
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}
drawPaddle();
// code for controling the paddle
document.addEventListener("keydown", function(event){
    if(event.keyCode == 37){
        leftArrow = true;
    }else if (event.keyCode == 39){
        rightArrow = true;
    }
});
document.addEventListener("keyup", function(event){
    if(event.keyCode == 37){
        leftArrow = false;
    }else if (event.keyCode == 39){
        rightArrow = false;
    }
});
// function to be able to move the paddle
function movePaddle(){
    if(rightArrow && paddle.x + paddle.width < cvs.width){
        paddle.x += paddle.dx;
    }else if(leftArrow && paddle.x > 0){
        paddle.x -= paddle.dx;
    }
};
// this code is for creating the ball 
const ball = {
    x : cvs.width/2,
    y : paddle.y - BALL_RADIUS,
    radius : BALL_RADIUS,
    speed : 4,
    dx : 3 * (Math.random() * 2 - 1),
    dy : -3
};
// code to draw the ball
function drawBall(){
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = "#ffcd0f";
    ctx.fill();
    ctx.strokeStyle = "#2e3548";
    ctx.stroke();
    ctx.closePath();
};
// code to move the ball 
function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;
};
// this code will allow for the ball to reset
function resetBall(){
    ball.x = cvs.width/2;
    ball.y = paddle.y - BALL_RADIUS;
    ball.dx = 3 * (Math.random() * 2 - 1);
    ball.dy = -3;
};
// this function will allow for the ball to bounce off the wall
function ballBounceOnSides(){
    if(ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0){
        ball.dx = - ball.dx;
    }
    // code for the ball to bounce of the top of wall
    if(ball.y - ball.radius < 0){
        ball.dy = - ball.dy;
    }
    // this code is for a player to lose a life when the ball misses the platform
    if(ball.y + ball.radius > cvs.height){
        LIFE --;
        resetBall();
    }
}
// this code will allow for the ball to bounce of the the paddle 
function ballBounceOfPaddle(){
    if(ball.x < paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y + paddle.height && ball.y > paddle.y){
           let collideBallWithPaddle = ball.x - (paddle.x + paddle.width/2);
        //    this code will normaize the values
        collideBallWithPaddle = collideBallWithPaddle / (paddle.width/2);
        // code for calculating the angle of the ball when touchin the paddle
        let angle = collideBallWithPaddle * Math.PI/3;
        // this code will allow for the ball to bounce of the paddle when on impact
            ball.dx = ball.speed * Math.sin(angle);
            ball.dy = - ball.speed * Math.cos(angle);
        }
}
// code for the creation of brick
const bricks = {
    row : 3,
    column : 5,
    width : 55,
    height : 20,
    offSetLeft : 20,
    offSetTop : 20,
    marginTop : 40,
    fillColor : "#2e3548",
    strokeColor : "#ffffff"
}
let brick = [];
function creatingBricks(){
    for(let r = 0; r < bricks.row; r++){
        brick[r] = [];
        for(let c = 0; c < bricks.column; c++){
            brick[r][c] = {
                x : c * ( bricks.offSetLeft + bricks.width ) + bricks.offSetLeft,
                Y : r * ( bricks.offSetTop + bricks.height ) + bricks.offSetTop + bricks.marginTop,
                Status : true
            }
        }
    }
};
creatingBricks();
// this code will draw the bricks 
function drawingBricks(){
    for(let r = 0; r < bricks.row; r++){
        for(let c = 0; c < bricks.column; c++){
            let b = brick[r][c];
            // this if statatement will check if the brick is not broken
            if(b.status){
                ctx.fillStyle = bricks.fillColor;
                ctx.fillRect( b.x, b.y, bricks.width, bricks.height );
                ctx.strokeStyle = bricks.strokeColor;
                ctx.strokeRect( b.x, b.y, bricks.width, bricks.height );
            }
        }
    }
};
// code when the ball collides with the bricks 
function ballCrashWithBricks(){
      for(let r = 0; r < bricks.row; r++){
        for(let c = 0; c < bricks.column; c++){
            let b = brick[r][c];
            // this if statatement will check if the brick is not broken
            if(b.status){
                if(ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + bricks.width)
            }
        }
    }
}
// draw function will allow for the drawing
function draw(){
    drawPaddle();

    drawBall();

    drawingBricks();
};
// update function will allowe for the game logic
function update(){
    movePaddle();
    moveBall();
    ballBounceOnSides();
    ballBounceOfPaddle();

};

// game loop this will allow for the game to keep looping 
function loop(){
    // code to clear the canvas
    ctx.drawImage(BG_IMG, 0, 0);
    draw();
    update();
    requestAnimationFrame(loop);
};
loop();