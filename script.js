let colorlist = ['gold', 'yellow', 'turquoise', 'red']
var gridwidth = 20
var curBlocks = [];
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
    [null, null, '#f43'],
    ['#f43', '#f20', '#f43'],
    [null, null, null]
  ],
  S: [
    [null, '#f43', '#f43'],
    ['#f43', '#f43', null],
    [null, null, null]
  ],
  Z: [
    ['#f43', '#f43', null],
    [null, '#f43', '#f43'],
    [null, null, null]
  ],
  T: [
    [null, '#f43', null],
    ['#f43', '#f43', '#f43'],
    [null, null, null]
  ],
  I: [
    [null, null, null, null],
    ['#f43', '#f43', '#f43', '#f43'],
    [null, null, null, null],
    [null, null, null, null],
  ]
}

function setup() {
  createCanvas(gridwidth * 10 + 1, gridwidth * 20 + 1);
  background(255);
  gridDraw();
}

function draw() {
  noStroke()
  fill(random(colorlist));
  gridDraw();
}

function gridDraw() {
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
}