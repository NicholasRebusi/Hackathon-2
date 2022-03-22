let colorlist = ['gold', 'yellow', 'turquoise', 'red'];
var gridwidth = 20;
var fps = 15;
var framesMove = 12;
var lostStatus = false;
var frames = 0;
var blocks = [];
var curBlock = [];
var score = 0;
//var grid = new gridDraw();

var typesNames = ["O", "J", "L", "S", "Z", "T", "I"];
let types = {
  O: [
    ['#E5F72C', '#E5F72C'],
    ['#E5F72C', '#E5F72C']
  ],
  J: [
    ['#1E68FC', null, null],
    ['#1E68FC', '#1E68FC', '#1E68FC'],
    [null, null, null]
  ],
  L: [
    [null, null, '#7AFF33'],
    ['#7AFF33', '#7AFF33', '#7AFF33'],
    [null, null, null]
  ],
  S: [
    [null, '#ECAC0E', '#ECAC0E'],
    ['#ECAC0E', '#ECAC0E', null],
    [null, null, null]
  ],
  Z: [
    ['#EC0EBA', '#EC0EBA', null],
    [null, '#EC0EBA', '#EC0EBA'],
    [null, null, null]
  ],
  T: [
    [null, '#f43', null],
    ['#f43', '#f43', '#f43'],
    [null, null, null]
  ],
  I: [
    [null, null, null, null],
    ['#000000', '#000000', '#000000', '#000000'],
    [null, null, null, null],
    [null, null, null, null],
  ]
};

class Rectangle {
  constructor(x, y, hex, type) {
    this.xPos = x;
    this.yPos = y;
    this.hexVal = hex;
    this.type = type;
  }
};

function blockDraw(block) {
  var pieces = [];
  for (let i = 0; i < types[block].length; i++) {
    for (let o = 0; o < types[block][i].length; o++) {
      if (types[block][i][o] !== null) {
        pieces.push(new Rectangle((3 + o) * 20, (i - 2) * 20, types[block][i][o], block));
      }
    }
  }
  return pieces;
}

function drawCurBlock() {
  for (let i = 0; i < curBlock.length; i++) {
    fill(curBlock[i].hexVal);
    rect(curBlock[i].xPos, curBlock[i].yPos, 19, 19);
  }
}

function checkBlocksBelow() {
  for (let c = 0; c < curBlock.length; c++) {
    for (let i = 0; i < blocks.length; i++) {
      for (let o = 0; o < blocks[i].length; o++) {
        if (blocks[i][o].yPos - curBlock[c].yPos == 20 && blocks[i][o].xPos == curBlock[c].xPos) {
          return true;
        }
      }
    }
  }
  return false;
}

function clearEmptyBlocks(){
  let tempBlocks = [];
  for(let i = 0; i < blocks.length; i++){
    if(blocks[i].length != 0){
      tempBlocks.push(blocks[i]);
    }
  }
  blocks = tempBlocks;
}

function tetris() {
  for (let i = 0; i < 20; i++) {
    for (let x = 0; x < 10; x++) {
      if (tetris2(x, i) == false) {
        break;

      } else if (x == 9) {
        score++;
        clearLine(i);
        moveBlocksDown(i);
        clearAndRedraw();
        if (score % 10 >= 0 && framesMove > 10) {
          framesMove -= 2.5;
        }
      }
    }
  }
}

function tetris2(x, y) {
  for (let i = 0; i < blocks.length; i++) {
    for (let o = 0; o < blocks[i].length; o++) {
      if (blocks[i][o].xPos == x * 20 && blocks[i][o].yPos == y * 20) {
        return true;
      }
    }
  }
  return false;
}

function checkBlocking(x, y) {
  for (let i = 0; i < blocks.length; i++) {
    for (let o = 0; o < blocks[i].length; o++) {
      if (blocks[i][o].xPos == x && blocks[i][o].yPos == y) {
        return true;
      }
    }
  }
  return false;
}

function moveBlocksDown(line) {
  for (let i = 0; i < blocks.length; i++) {
    for (let o = 0; o < blocks[i].length; o++) {
      if (blocks[i][o].yPos <= line * 20 - 5) {
        blocks[i][o].yPos += 20;
      }
    }
  }
}

function clearLine(line) {
  for (let i = 0; i < blocks.length; i++) {
    for (let o = 0; o < blocks[i].length; o++) {
      if (blocks[i][o].yPos >= line * 20 - 5 && blocks[i][o].yPos <= line * 20 + 5) {
        blocks[i].splice(o, 1);
        console.log(blocks);
        o--;
      }
    }
  }
}

function checkLoss() {
  for (let i = 0; i < blocks.length; i++) {
    for (let o = 0; o < blocks[i].length; o++) {
      if (blocks[i][o].yPos < 0) {
        lostStatus = true;
        fps = 0;
        alert("you lost click restart to play again");
      }
    }
  }
}


function drawBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    for (let o = 0; o < blocks[i].length; o++) {
      fill(blocks[i][o].hexVal);
      rect(blocks[i][o].xPos, blocks[i][o].yPos, 19, 19);
    }
  }
}


function setup() {
  createCanvas(gridwidth * 10 + 1, gridwidth * 20 + 1);
  clearAndRedraw();
  frameRate(fps);
  if (curBlock.length == 0) {
    curBlock = blockDraw(random(typesNames));
  }
  for (let i = 0; i < curBlock.length; i++) {
    fill(curBlock[i].hexVal);
    rect(curBlock[i].xPos, curBlock[i].yPos, 19, 19);
  }
}

function draw() {
  frames++;
  if (frames % framesMove == 0) {
    checkBottom();
    moveDown();
    clearAndRedraw();
  }
  tetris();
  if (lostStatus == false) {
    checkLoss();
  }
  if (curBlock.length == 0) {
    curBlock = blockDraw(random(typesNames));
  }
  restart();
}

function checkBottom(){
  if (curBlock[0].yPos == 380 || curBlock[1].yPos == 380 || curBlock[2].yPos == 380 || curBlock[3].yPos == 380 || checkBlocksBelow() == true) {
    blocks.push(curBlock);
    curBlock = blockDraw(random(typesNames));
  }
}

function clearAndRedraw(){
  clear();
  background(162, 235, 223);
  for (let i = 0; i < 11; i++) {
    stroke(100);
    strokeWeight(1);
    line(i * gridwidth, 0, i * gridwidth, height);
  }
  for (let i = 0; i < 21; i++) {
    stroke(100);
    strokeWeight(1);
    line(0, i * gridwidth, width, i * gridwidth);
  }
  scoreBox(score);
  drawBlocks();
  drawCurBlock();
}

function scoreBox(score) {
  fill(0);
  textSize(20);
  text("Score: " + score, 2, 18);
}


function slam() {
  var dropHeight = 380;
  for (let i = 0; i < curBlock.length; i++) {
    if (setHeight(curBlock[i].xPos, curBlock[i].yPos) < dropHeight) {
      dropHeight = setHeight(curBlock[i].xPos, curBlock[i].yPos);
    }
  }
  for (let i = 0; i < curBlock.length; i++) {
    curBlock[i].yPos += dropHeight - 20;
  }
}

function setHeight(x, y) {
  var dif = 800;
  if (blocks.length !== 0) {
    for (let i = 0; i < blocks.length; i++) {
      for (let o = 0; o < blocks[i].length; o++) {
        console.log(blocks[i][o].yPos - y)
        if (blocks[i][o].xPos == x && blocks[i][o].yPos - y < dif) {
          dif = blocks[i][o].yPos - y;

        } if (400 - y < dif) {
          console.log(400 - y);
          dif = 400 - y;
        }
      }
    }
  }
  if (400 - y < dif) {
    console.log(400 - y);
    dif = 400 - y;
  }
  return dif;
}

function moveDown() {
  for (let i = 0; i < curBlock.length; i++) {
    curBlock[i].yPos += 20;
  }
  clearAndRedraw();
}

function moveRight() {
  let bool = false;
  for (let i = 0; i < curBlock.length; i++) {
    if (checkBlocking(curBlock[i].xPos + 20, curBlock[i].yPos) == true || curBlock[i].xPos + 20 >= 200) {
      bool = true;
    }
  }
  for (let i = 0; i < curBlock.length; i++) {
    if (bool == false) {
      curBlock[i].xPos += 20;
    }
  }
}

function moveLeft() {
  let bool = false;
  for (let i = 0; i < curBlock.length; i++) {
    if (checkBlocking(curBlock[i].xPos - 20, curBlock[i].yPos) == true || curBlock[i].xPos - 20 < 0) {
      bool = true;
    }
  }
  for (let i = 0; i < curBlock.length; i++) {
    if (bool == false) {
      curBlock[i].xPos -= 20;
    }
  }
}

function restart() {
  let button = createButton("Restart");
  button.id = 'restart';
  button.size(200, 100);
  button.position(250, 100);
  button.style("background-color", "rgb(138, 235, 252)");
  button.style("font-family", "Verdana, Geneva, Tahoma, sans-serif");
  button.style("font-size", "38px");
  button.mousePressed(restartGame);
}

function restartGame(button) {
  window.location = "";
}

function keyPressed() {
  let direction = "";
  if (keyCode === RIGHT_ARROW) {
    moveRight();
    clearAndRedraw();
  }
  if (keyCode === LEFT_ARROW) {
    moveLeft();
    clearAndRedraw();
  }
  if (keyCode === DOWN_ARROW) {
    //clockwise
    rotation(true);
    clearAndRedraw();
  }
  if (keyCode === UP_ARROW) {
    //counterclockwise
    rotation(false);
    clearAndRedraw();
  }
  if (keyCode === 16) {
    slam();
    clearAndRedraw();
  }
  if (keyCode === 32) {
    framesMove = framesMove / 2;
  }
}

/*function keyIsDown(){
  if(keyCode === 32) {
    framesMove = 1
  }
}*/

function keyReleased() {
  if (keyCode === 32) {
    framesMove = framesMove * 2;
  }
}

/*function xy(x, y) {
  return { x: x, y: y };
}*/


var clockwiseMatrix = [
[0, -1],
[1, 0]
];

var counterClockwiseMatrix = [
[0, 1],
[-1, 0]
];

function rotation(clockwise){
  let piece0RelativePositionTo2 = [curBlock[0].xPos - curBlock[2].xPos, curBlock[0].yPos - curBlock[2].yPos];
  let piece1RelativePositionTo2 = [curBlock[1].xPos - curBlock[2].xPos, curBlock[1].yPos - curBlock[2].yPos];
  let piece3RelativePositionTo2 = [curBlock[3].xPos - curBlock[2].xPos, curBlock[3].yPos - curBlock[2].yPos];
  clockwise == true ? rotations = clockwiseRotation(piece0RelativePositionTo2, piece1RelativePositionTo2, piece3RelativePositionTo2) : rotations = counterClockwiseRotation(piece0RelativePositionTo2, piece1RelativePositionTo2, piece3RelativePositionTo2);
  curBlock[0].xPos = curBlock[2].xPos + rotations[0][1];
  curBlock[0].yPos = curBlock[2].yPos + rotations[0][0];
  curBlock[1].xPos = curBlock[2].xPos + rotations[1][1];
  curBlock[1].yPos = curBlock[2].yPos + rotations[1][0];
  curBlock[3].xPos = curBlock[2].xPos + rotations[2][1];
  curBlock[3].yPos = curBlock[2].yPos + rotations[2][0];
}

function clockwiseRotation(ORelCenter, iRelCenter, ERelCenter){
  for(let i = 0; i < 2; i++){
    ORelCenter[i] = ORelCenter[i] * clockwiseMatrix[0][i] + ORelCenter[i] * clockwiseMatrix[1][i];
    iRelCenter[i] = iRelCenter[i] * clockwiseMatrix[0][i] + iRelCenter[i] * clockwiseMatrix[1][i];
    ERelCenter[i] = ERelCenter[i] * clockwiseMatrix[0][i] + ERelCenter[i] * clockwiseMatrix[1][i];
  }
  return [[ORelCenter[0], ORelCenter[1]], [iRelCenter[0], iRelCenter[1]], [ERelCenter[0], ERelCenter[1]]]
}

function counterClockwiseRotation(ORelCenter, iRelCenter, ERelCenter){
  for(let i = 0; i < 2; i++){
    ORelCenter[i] = ORelCenter[i] * counterClockwiseMatrix[0][i] + ORelCenter[i] * counterClockwiseMatrix[1][i];
    iRelCenter[i] = iRelCenter[i] * counterClockwiseMatrix[0][i] + iRelCenter[i] * counterClockwiseMatrix[1][i];
    ERelCenter[i] = ERelCenter[i] * counterClockwiseMatrix[0][i] + ERelCenter[i] * counterClockwiseMatrix[1][i];
  }
  return [[ORelCenter[0], ORelCenter[1]], [iRelCenter[0], iRelCenter[1]], [ERelCenter[0], ERelCenter[1]]]
}