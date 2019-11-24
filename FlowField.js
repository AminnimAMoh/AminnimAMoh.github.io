var tx = 0;
var ty = 0;

var inc = 6;

var kyeOne = true;
var kyeTwo = true;
var Can;
var th = 0.1;
let off = false;

function windowResized() {

  resizeCanvas(windowWidth - 20, windowHeight - 20);
  off = false;
  ty = 0;
  tx = 0;
  kyeOne = true;
  kyeTwo = true;
  inc = 12;
  Can.background(255);

}

function setup() {


  Can = createCanvas(windowWidth - 20, windowHeight - 20);
  Can.position(0, 0);
  Can.background(255);
  Can.style('z-index', '-1');

  strokeWeight(1);
  background(255);
  stroke(1, 17, 64);
}

function draw() {
  // background(0, 60);

  strokeWeight(0.1);
  if (!off) {
    Linner();
  }
  Con();
}

function Linner() {

  if (kyeOne && kyeTwo) {
    line(tx, 0, width, ty);
    tx += inc;
    ty += inc;
  } else if (kyeOne && !kyeTwo) {
    line(tx, height, 0, ty);
    tx -= inc;
    ty -= inc;
    off = true;
  } else if (!kyeOne && !kyeTwo) {
    line(0, ty, tx, 0);
    tx += inc;
    ty -= inc;
    if (tx > width - 1) {
      kyeOne = true;
      kyeTwo = true;
      tx = 0;
      ty = 0;
    }
  } else if (!kyeOne && kyeTwo) {
    line(width, ty, tx, height);
    tx -= inc;
    ty += inc;
  }
}

function Con() {

  if (ty > height && tx < 0) {
    kyeOne = true;
    kyeTwo = false;
    tx = width;
    ty = height;
  } else if (tx < 0) {
    kyeOne = false;
    kyeTwo = false;
    tx = 0;
    ty = height;
  } else if (tx >= width) {
    kyeOne = false;
    kyeTwo = true;
    tx = width;
    ty = 0;
  }
  if (ty > height / 2 && tx < 1) {
    off = true;
  }

}