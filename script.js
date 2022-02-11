let colorlist = ['gold', 'yellow', 'turquoise', 'red']
var gridwidth = 20
var fps = 15
var framesMove = 12;
var lost = false;
var frames = 0
var blocks = [];
var curBlock = [];
var score = 0;
// var direction = ""

var typesNames = ["O", "J", "L", "S", "Z", "T", "I"]
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
}

class Rectangle {
  constructor(x, y, hex, type) {
    this.xPos = x;
    this.yPos = y;
    this.hexVal = hex;
    this.type = type
  }
}

function blockDraw(block) {
  //alert(types[block][0][0])
  var pieces = [];
  for (let i = 0; i < types[block].length; i++) {
    for (let o = 0; o < types[block][i].length; o++) {
      if (types[block][i][o] !== null) {
        //
        pieces.push(new Rectangle((3 + o) * 20, (i - 2) * 20, types[block][i][o], block))
      }
    }
  }
  return pieces;
}

function drawCurBlock() {
  for (let i = 0; i < curBlock.length; i++) {
    fill(curBlock[i].hexVal)
    rect(curBlock[i].xPos, curBlock[i].yPos, 19, 19)
  }
}

function checkBlocks() {
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

function tetris() {
  for (let i = 0; i < 20; i++) {
    for (let x = 0; x < 10; x++) {
      if (tetris2(x, i) == false) {
        break;

      } else if (x == 9) {
        score++
        clearLine(i);
        moveBlocksDown(i)
        if (score % 10 >= 0 && framesMove > 10) {
          framesMove -= 2.5
        }
      }
      // console.log("this is your score = " + score)
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
        blocks[i][o].yPos += 20
      }
    }
  }
}

function clearLine(line) {
  for (let i = 0; i < blocks.length; i++) {
    for (let o = 0; o < blocks[i].length; o++) {
      if (blocks[i][o].yPos >= line * 20 - 5 && blocks[i][o].yPos <= line * 20 + 5) {
        blocks[i].splice(o, 1)
        o--
      }
    }
  }
}

function checkLoss() {
  for (let i = 0; i < blocks.length; i++) {
    for (let o = 0; o < blocks[i].length; o++) {
      if (blocks[i][o].yPos < 0) {
        lost = true
        fps = 0;
        alert("you lost click restart to play again")

      }
    }
  }
}


function drawBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    for (let o = 0; o < blocks[i].length; o++) {
      fill(blocks[i][o].hexVal)
      rect(blocks[i][o].xPos, blocks[i][o].yPos, 19, 19)
    }
  }
}


function setup() {
  createCanvas(gridwidth * 10 + 1, gridwidth * 20 + 1);
  background(255);
  background('rgb(162, 235, 223)');
  frameRate(fps)
  if (curBlock.length == 0) {
    curBlock = blockDraw(random(typesNames))
  }
  for (let i = 0; i < curBlock.length; i++) {
    fill(curBlock[i].hexVal)
    rect(curBlock[i].xPos, curBlock[i].yPos, 19, 19)
  }
}

function draw() {
  frames++
  noStroke()
  fill(random(colorlist));

  if (frames % framesMove == 0) {
    moveDown();
  }
  tetris();
  if (lost == false) {
    checkLoss();
  }
  clear();
  background('rgb(162, 235, 223)');
  var grid = new gridDraw();

  if (curBlock.length == 0) {
    curBlock = blockDraw(random(typesNames))
  }
  if (curBlock[0].yPos == 380 || curBlock[1].yPos == 380 || curBlock[2].yPos == 380 || curBlock[3].yPos == 380 || checkBlocks() == true) {
    blocks.push(curBlock);
    curBlock = blockDraw(random(typesNames))
  }
  drawBlocks();
  drawCurBlock();
  scoreBox(score);
  restart();

  //for (let i = 0; i < curBlock.length; i++) {
  //  fill(curBlock[i].hexVal)
  // rect(curBlock[i].xPos, curBlock[i].yPos, 19, 19)
  // }
}

function scoreBox(score) {
  fill(0);
  textSize(20);
  text("Score: " + score, 2, 18);
}


function slam() {
  //var farLeft = 400;
  //var farRight = 0;
  var dropHeight = 380;
  for (let i = 0; i < curBlock.length; i++) {
    console.log(curBlock)
    if (setHeight(curBlock[i].xPos, curBlock[i].yPos) < dropHeight) {
      dropHeight = setHeight(curBlock[i].xPos, curBlock[i].yPos)
    }
  }
  for (let i = 0; i < curBlock.length; i++) {
    curBlock[i].yPos += dropHeight - 20
  }
}

function setHeight(x, y) {
  var dif = 800;
  if (blocks.length !== 0) {
    for (let i = 0; i < blocks.length; i++) {
      for (let o = 0; o < blocks[i].length; o++) {
        console.log(blocks[i][o].yPos - y)
        if (blocks[i][o].xPos == x && blocks[i][o].yPos - y < dif) {
          dif = blocks[i][o].yPos - y

        } if (400 - y < dif) {
          console.log(400 - y)
          dif = 400 - y
        }
      }
    }
  }
  if (400 - y < dif) {
          console.log(400 - y)
          dif = 400 - y
        }
  console.log(dif)
  return dif;
}

class gridDraw {
  constructor() {
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
    this.backRGBVal = 'rgb(162, 235, 223)';
  }
}

function moveDown() {
  for (let i = 0; i < curBlock.length; i++) {
    curBlock[i].yPos += 20
  }
}

function moveRight() {
  let bool = false
  for (let i = 0; i < curBlock.length; i++) {
    if (checkBlocking(curBlock[i].xPos + 20, curBlock[i].yPos) == true || curBlock[i].xPos + 20 >= 200) {
      bool = true
    }
  }
  for (let i = 0; i < curBlock.length; i++) {
    if (bool == false) {
      curBlock[i].xPos += 20
    }
  }
}

function moveLeft() {
  let bool = false
  for (let i = 0; i < curBlock.length; i++) {
    if (checkBlocking(curBlock[i].xPos - 20, curBlock[i].yPos) == true || curBlock[i].xPos - 20 < 0) {
      bool = true
    }
  }
  for (let i = 0; i < curBlock.length; i++) {
    if (bool == false) {
      curBlock[i].xPos -= 20
    }
  }
}

function restart() {
  let button = createButton("Restart");
  button.id = 'restart';
  button.size(200, 100);
  button.position(250, 100);
  button.style("background-color", "rgb(138, 235, 252)")
  button.style("font-family", "Verdana, Geneva, Tahoma, sans-serif");
  button.style("font-size", "38px");
  button.mousePressed(restartGame);
}

function restartGame(button) {
  console.log("game restarts");
  // button.hide();
}

function keyPressed() {
  let direction = "";
  if (keyCode === RIGHT_ARROW) {
    moveRight()
  }
  if (keyCode === LEFT_ARROW) {
    moveLeft()
  }
  if (keyCode === DOWN_ARROW) {
    //clockwise
    rotateBlock(true)
  }
  if (keyCode === UP_ARROW) {
    //counterclockwise
    rotateBlock(false)
  }
  if (keyCode === 16) {
    slam();
  }
  if (keyCode === 32) {
    framesMove = framesMove / 2
  }
}

/*function keyIsDown(){
  if(keyCode === 32) {
    framesMove = 1
  }
}*/

function keyReleased() {
  if (keyCode === 32) {
    framesMove = framesMove * 2
  }
}

function rotateJC1(){
  curBlock[0].xPos += 40
  curBlock[1].xPos += 20
  curBlock[1].yPos -= 20
  curBlock[3].xPos -= 20
  curBlock[3].yPos += 20
}

function rotateJC2(){
  curBlock[0].yPos -= 40
  curBlock[1].xPos -= 20
  curBlock[1].yPos -= 20
  curBlock[3].xPos += 20
  curBlock[3].yPos += 20
}

function rotateJC3(){
  curBlock[0].yPos += 40
  curBlock[1].xPos += 20
  curBlock[1].yPos += 20
  curBlock[3].xPos -= 20
  curBlock[3].yPos -= 20
}

function rotateJC4(){
  curBlock[0].xPos -= 40
  curBlock[1].xPos -= 20
  curBlock[1].yPos += 20
  curBlock[3].xPos += 20
  curBlock[3].yPos -= 20
}

function rotateJCC1(){
  curBlock[0].yPos += 40
  curBlock[1].xPos += 20
  curBlock[1].yPos += 20
  curBlock[3].xPos -= 20
  curBlock[3].yPos -= 20
}

function rotateJCC2(){
  curBlock[0].xPos += 40
  curBlock[1].xPos += 20
  curBlock[1].yPos -= 20
  curBlock[3].xPos -= 20
  curBlock[3].yPos += 20
}

function rotateJCC3(){
  curBlock[0].xPos -= 40
  curBlock[1].xPos -= 20
  curBlock[1].yPos += 20
  curBlock[3].xPos += 20
  curBlock[3].yPos -= 20
}

function rotateJCC4(){
  curBlock[0].yPos -= 40
  curBlock[1].xPos -= 20
  curBlock[1].yPos -= 20
  curBlock[3].xPos += 20
  curBlock[3].yPos += 20
}

function checkJRotationClockwise(){
  if (curBlock[0].xPos <= curBlock[3].xPos && curBlock[0].yPos <= curBlock[3].yPos) {
    rotateJC1();
  } else if (curBlock[0].xPos <= curBlock[3].xPos && curBlock[0].yPos >= curBlock[3].yPos) {
    rotateJC2();
  } else if (curBlock[0].xPos >= curBlock[3].xPos && curBlock[0].yPos <= curBlock[3].yPos) {
    rotateJC3();
  } else if (curBlock[0].xPos >= curBlock[3].xPos && curBlock[0].yPos >= curBlock[3].yPos) {
    rotateJC4();
  }
}

function checkJRotationCounterClockwise(){
  if (curBlock[0].xPos <= curBlock[3].xPos && curBlock[0].yPos <= curBlock[3].yPos) {
    rotateJCC1();
  } else if (curBlock[0].xPos <= curBlock[3].xPos && curBlock[0].yPos >= curBlock[3].yPos) {
    rotateJCC2();
  } else if (curBlock[0].xPos >= curBlock[3].xPos && curBlock[0].yPos <= curBlock[3].yPos) {
    rotateJCC3();
  } else if (curBlock[0].xPos >= curBlock[3].xPos && curBlock[0].yPos >= curBlock[3].yPos) {
    rotateJCC4();
  }
}

function checkJRotationDirection(bool){
  if (bool) {
    checkJRotationClockwise();
  }else {
    checkJRotationCounterClockwise();
  }
}

/////////////////////////////////////////////////////////////

function rotateLC1(){
  curBlock[0].xPos += 40
  curBlock[1].xPos -= 20
  curBlock[1].yPos -= 20
  curBlock[3].xPos += 20
  curBlock[3].yPos += 20
}

function rotateLC2(){
  curBlock[0].yPos -= 40
  curBlock[1].xPos -= 20
  curBlock[1].yPos += 20
  curBlock[3].xPos += 20
  curBlock[3].yPos -= 20
}

function rotateLC3(){
  curBlock[0].yPos += 40
  curBlock[1].xPos += 20
  curBlock[1].yPos -= 20
  curBlock[3].xPos -= 20
  curBlock[3].yPos += 20
}

function rotateLC4(){
  curBlock[0].xPos -= 40
  curBlock[1].xPos += 20
  curBlock[1].yPos += 20
  curBlock[3].xPos -= 20
  curBlock[3].yPos -= 20
}

function rotateLCC1(){
  curBlock[0].yPos += 40
  curBlock[1].xPos += 20
  curBlock[1].yPos -= 20
  curBlock[3].xPos -= 20
  curBlock[3].yPos += 20
}

function rotateLCC2(){
  curBlock[0].xPos += 40
  curBlock[1].xPos -= 20
  curBlock[1].yPos -= 20
  curBlock[3].xPos += 20
  curBlock[3].yPos += 20
}

function rotateLCC3(){
  curBlock[0].xPos -= 40
  curBlock[1].xPos += 20
  curBlock[1].yPos += 20
  curBlock[3].xPos -= 20
  curBlock[3].yPos -= 20
}

function rotateLCC4(){
  curBlock[0].yPos -= 40
  curBlock[1].xPos -= 20
  curBlock[1].yPos += 20
  curBlock[3].xPos += 20
  curBlock[3].yPos -= 20
}

function checkLRotationClockwise(){
  if (curBlock[0].xPos < curBlock[3].xPos) {
    rotateLC1();
  } else if (curBlock[0].yPos > curBlock[3].yPos) {
    rotateLC2();
  } else if (curBlock[0].yPos < curBlock[3].yPos) {
    rotateLC3();
  } else if (curBlock[0].xPos > curBlock[3].xPos) {
    rotateLC4();
  }
}

function checkLRotationCounterClockwise(){
  if (curBlock[0].xPos < curBlock[3].xPos) {
    rotateLCC1();
  } else if (curBlock[0].yPos > curBlock[3].yPos) {
    rotateLCC2();
  } else if (curBlock[0].yPos < curBlock[3].yPos) {
    rotateLCC3();
  } else if (curBlock[0].xPos > curBlock[3].xPos) {
    rotateLCC4()
  }
}

function checkLRotationDirection(bool){
  if (bool) {
    checkLRotationClockwise();
  }else {
    checkLRotationCounterClockwise();
  }
}

///////////////////////////////////////////////////////////////////////

function rotateSC1(){
  curBlock[1].xPos += 40
  curBlock[0].xPos += 20
  curBlock[0].yPos -= 20
  curBlock[2].xPos -= 20
  curBlock[2].yPos -= 20
}

function rotateSC2(){
  curBlock[1].yPos -= 40
  curBlock[0].xPos -= 20
  curBlock[0].yPos -= 20
  curBlock[2].xPos -= 20
  curBlock[2].yPos += 20
}

function rotateSC3(){
  curBlock[1].yPos += 40
  curBlock[0].xPos += 20
  curBlock[0].yPos += 20
  curBlock[2].xPos += 20
  curBlock[2].yPos -= 20
}

function rotateSC4(){
  curBlock[1].xPos -= 40
  curBlock[0].xPos -= 20
  curBlock[0].yPos += 20
  curBlock[2].xPos += 20
  curBlock[2].yPos += 20
}

function rotateSCC1(){
  curBlock[1].yPos += 40
  curBlock[0].xPos += 20
  curBlock[0].yPos += 20
  curBlock[2].xPos += 20
  curBlock[2].yPos -= 20
}

function rotateSCC2(){
  curBlock[1].xPos += 40
  curBlock[0].xPos += 20
  curBlock[0].yPos -= 20
  curBlock[2].xPos -= 20
  curBlock[2].yPos -= 20
}

function rotateSCC3(){
  curBlock[1].xPos -= 40
  curBlock[0].xPos -= 20
  curBlock[0].yPos += 20
  curBlock[2].xPos += 20
  curBlock[2].yPos += 20
}

function rotateSCC4(){
  curBlock[1].yPos -= 40
  curBlock[0].xPos -= 20
  curBlock[0].yPos -= 20
  curBlock[2].xPos -= 20
  curBlock[2].yPos += 20
}

function checkSRotationClockwise(){
  if (curBlock[0].xPos < curBlock[3].xPos) {
    rotateSC1();
  } else if (curBlock[0].yPos > curBlock[3].yPos) {
    rotateSC2();
  } else if (curBlock[0].yPos < curBlock[3].yPos) {
    rotateSC3();
  } else if (curBlock[0].xPos > curBlock[3].xPos) {
    rotateSC4();
  }
}

function checkSRotationCounterClockwise(){
  if (curBlock[0].xPos < curBlock[3].xPos) {
    rotateSCC1();
  } else if (curBlock[0].yPos > curBlock[3].yPos) {
    rotateSCC2();
  } else if (curBlock[0].yPos < curBlock[3].yPos) {
    rotateSCC3()
  } else if (curBlock[0].xPos > curBlock[3].xPos) {
    rotateSCC4()
  }
}

function checkSRotationDirection(bool){
  if (bool) {
    checkSRotationClockwise();
  }else {
    checkSRotationCounterClockwise();
  }
}

/////////////////////////////////////////////////////////////

function rotateZC1(){
  curBlock[0].xPos += 40
  curBlock[1].xPos += 20
  curBlock[1].yPos += 20
  curBlock[3].xPos -= 20
  curBlock[3].yPos += 20
}

function rotateZC2(){
  curBlock[0].yPos -= 40
  curBlock[1].xPos += 20
  curBlock[1].yPos -= 20
  curBlock[3].xPos += 20
  curBlock[3].yPos += 20
}

function rotateZC3(){
  curBlock[0].yPos += 40
  curBlock[1].xPos -= 20
  curBlock[1].yPos += 20
  curBlock[3].xPos -= 20
  curBlock[3].yPos -= 20
}

function rotateZC4(){
  curBlock[0].xPos -= 40
  curBlock[1].xPos -= 20
  curBlock[1].yPos -= 20
  curBlock[3].xPos += 20
  curBlock[3].yPos -= 20
}

function rotateZCC1(){
  curBlock[0].yPos += 40
  curBlock[1].xPos -= 20
  curBlock[1].yPos += 20
  curBlock[3].xPos -= 20
  curBlock[3].yPos -= 20
}

function rotateZCC2(){
  curBlock[0].xPos += 40
  curBlock[1].xPos += 20
  curBlock[1].yPos += 20
  curBlock[3].xPos -= 20
  curBlock[3].yPos += 20
}

function rotateZCC3(){
  curBlock[0].xPos -= 40
  curBlock[1].xPos -= 20
  curBlock[1].yPos -= 20
  curBlock[3].xPos += 20
  curBlock[3].yPos -= 20
}

function rotateZCC4(){
  curBlock[0].yPos -= 40
  curBlock[1].xPos += 20
  curBlock[1].yPos -= 20
  curBlock[3].xPos += 20
  curBlock[3].yPos += 20
}

function checkZRotationClockwise(){
  if (curBlock[0].xPos < curBlock[3].xPos && curBlock[0].yPos < curBlock[3].yPos) {
    rotateZC1();
  } else if (curBlock[0].xPos < curBlock[3].xPos && curBlock[0].yPos > curBlock[3].yPos) {
    rotateZC2();
  } else if (curBlock[0].xPos > curBlock[3].xPos && curBlock[0].yPos < curBlock[3].yPos) {
    rotateZC3();
  } else if (curBlock[0].xPos > curBlock[3].xPos && curBlock[0].yPos > curBlock[3].yPos) {
    rotateZC4(); 
  }
}

function checkZRotationCounterClockwise(){
  if (curBlock[0].xPos < curBlock[3].xPos && curBlock[0].yPos < curBlock[3].yPos) {
    rotateZCC1();
  } else if (curBlock[0].xPos < curBlock[3].xPos && curBlock[0].yPos > curBlock[3].yPos) {
    rotateZCC2();
  } else if (curBlock[0].xPos > curBlock[3].xPos && curBlock[0].yPos < curBlock[3].yPos) {
    rotateZCC3();
  } else if (curBlock[0].xPos > curBlock[3].xPos && curBlock[0].yPos > curBlock[3].yPos) {
    rotateZCC4();
  }
}

function checkZRotationDirection(bool){
  if (bool) {
    checkZRotationClockwise();
  }else {
    checkZRotationCounterClockwise();
  }
}

/////////////////////////////////////////////

function rotateTC1(){
  curBlock[0].xPos += 20
  curBlock[0].yPos += 20
  curBlock[1].xPos += 20
  curBlock[1].yPos -= 20
  curBlock[3].xPos -= 20
  curBlock[3].yPos += 20
}

function rotateTC2(){
  curBlock[0].xPos += 20
  curBlock[0].yPos -= 20
  curBlock[1].xPos -= 20
  curBlock[1].yPos -= 20
  curBlock[3].xPos += 20
  curBlock[3].yPos += 20
}

function rotateTC3(){
  curBlock[0].xPos -= 20
  curBlock[0].yPos += 20
  curBlock[1].xPos += 20
  curBlock[1].yPos += 20
  curBlock[3].xPos -= 20
  curBlock[3].yPos -= 20
}

function rotateTC4(){
  curBlock[0].xPos -= 20
  curBlock[0].yPos -= 20
  curBlock[1].xPos -= 20
  curBlock[1].yPos += 20
  curBlock[3].xPos += 20
  curBlock[3].yPos -= 20
}

function rotateTCC1(){
  curBlock[0].xPos -= 20
  curBlock[0].yPos += 20
  curBlock[1].xPos += 20
  curBlock[1].yPos += 20
  curBlock[3].xPos -= 20
  curBlock[3].yPos -= 20
}

function rotateTCC2(){
  curBlock[0].xPos += 20
  curBlock[0].yPos += 20
  curBlock[1].xPos += 20
  curBlock[1].yPos -= 20
  curBlock[3].xPos -= 20
  curBlock[3].yPos += 20
}

function rotateTCC3(){
  curBlock[0].xPos -= 20
  curBlock[0].yPos -= 20
  curBlock[1].xPos -= 20
  curBlock[1].yPos += 20
  curBlock[3].xPos += 20
  curBlock[3].yPos -= 20
}

function rotateTCC4(){
  curBlock[0].xPos += 20
  curBlock[0].yPos -= 20
  curBlock[1].xPos -= 20
  curBlock[1].yPos -= 20
  curBlock[3].xPos += 20
  curBlock[3].yPos += 20
}

function checkTRotationClockwise(){
  if (curBlock[0].xPos < curBlock[3].xPos && curBlock[0].yPos < curBlock[3].yPos) {
    rotateTC1();
  } else if (curBlock[0].xPos < curBlock[3].xPos && curBlock[0].yPos > curBlock[3].yPos) {
    rotateTC2();
  } else if (curBlock[0].xPos > curBlock[3].xPos && curBlock[0].yPos < curBlock[3].yPos) {
    rotateTC3();
  } else if (curBlock[0].xPos > curBlock[3].xPos && curBlock[0].yPos > curBlock[3].yPos) {
    rotateTC4();
  }
}

function checkTRotationCounterClockwise(){
  if (curBlock[0].xPos < curBlock[3].xPos && curBlock[0].yPos < curBlock[3].yPos) {
    rotateTCC1();
  } else if (curBlock[0].xPos < curBlock[3].xPos && curBlock[0].yPos > curBlock[3].yPos) {
    rotateTCC2();
  } else if (curBlock[0].xPos > curBlock[3].xPos && curBlock[0].yPos < curBlock[3].yPos) {
    rotateTCC3();
  } else if (curBlock[0].xPos > curBlock[3].xPos && curBlock[0].yPos > curBlock[3].yPos) {
    rotateTCC4();
  }
}

function checkTRotationDirection(bool){
  if (bool) {
    checkTRotationClockwise();
  }else {
    checkTRotationCounterClockwise();
  }
}

///////////////////////////////////////////////////////////

function rotateIC1(){
  curBlock[0].xPos += 20
  curBlock[0].yPos -= 20
  curBlock[2].xPos -= 20
  curBlock[2].yPos += 20
  curBlock[3].xPos -= 40
  curBlock[3].yPos += 40
}

function rotateIC2(){
  curBlock[0].xPos -= 20
  curBlock[0].yPos -= 20
  curBlock[2].xPos += 20
  curBlock[2].yPos += 20
  curBlock[3].xPos += 40
  curBlock[3].yPos += 40
}

function rotateIC3(){
  curBlock[0].xPos += 20
  curBlock[0].yPos += 20
  curBlock[2].xPos -= 20
  curBlock[2].yPos -= 20
  curBlock[3].xPos -= 40
  curBlock[3].yPos -= 40
}

function rotateIC4(){
  curBlock[0].xPos -= 20
  curBlock[0].yPos += 20
  curBlock[2].xPos += 20
  curBlock[2].yPos -= 20
  curBlock[3].xPos += 40
  curBlock[3].yPos -= 40
}

function rotateICC1(){
  curBlock[0].xPos += 20
  curBlock[0].yPos += 20
  curBlock[2].xPos -= 20
  curBlock[2].yPos -= 20
  curBlock[3].xPos -= 40
  curBlock[3].yPos -= 40
}

function rotateICC2(){
  curBlock[0].xPos += 20
  curBlock[0].yPos -= 20
  curBlock[2].xPos -= 20
  curBlock[2].yPos += 20
  curBlock[3].xPos -= 40
  curBlock[3].yPos += 40
}

function rotateICC3(){
  curBlock[0].xPos -= 20
  curBlock[0].yPos += 20
  curBlock[2].xPos += 20
  curBlock[2].yPos -= 20
  curBlock[3].xPos += 40
  curBlock[3].yPos -= 40
}

function rotateICC4(){
  curBlock[0].xPos -= 20
  curBlock[0].yPos -= 20
  curBlock[2].xPos += 20
  curBlock[2].yPos += 20
  curBlock[3].xPos += 40
  curBlock[3].yPos += 40
}

function checkIRotationClockwise(){
  if (curBlock[0].xPos < curBlock[3].xPos) {
    rotateIC1();
  } else if (curBlock[0].yPos > curBlock[3].yPos) {
    rotateIC2();
  } else if (curBlock[0].yPos < curBlock[3].yPos) {
    rotateIC3();
  } else if (curBlock[0].xPos > curBlock[3].xPos) {
    rotateIC4();
  }
}

function checkIRotationCounterClockwise(){
  if (curBlock[0].xPos < curBlock[3].xPos) {
    rotateICC1();
  } else if (curBlock[0].yPos > curBlock[3].yPos) {
    rotateICC2();
  } else if (curBlock[0].yPos < curBlock[3].yPos) {
    rotateICC3();
  } else if (curBlock[0].xPos > curBlock[3].xPos) {
    rotateICC4();
  }
}

function checkIRotationDirection(bool){
  if (bool) {
    checkIRotationClockwise();
  }else {
    checkIRotationCounterClockwise();
  }
}

function rotateBlock(direction) {
  if (curBlock[0].type == "J") {
    checkJRotationDirection(direction);
  }else if (curBlock[0].type == "L") {
    checkLRotationDirection(direction);
  }else if (curBlock[0].type == "S") {
    checkSRotationDirection(direction);
  }else if (curBlock[0].type == "Z") {
    checkZRotationDirection(direction);
  }else if (curBlock[0].type == "T") {
    checkTRotationDirection(direction);
  }else if (curBlock[0].type == "I") {
    checkIRotationDirection(direction);
  }
}