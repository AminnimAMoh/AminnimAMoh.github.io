var tx = 0;
var ty = 0;

var inc = 3;

var kyeOne = true;
var kyeTwo = true;
var Can;
var th = 0.1;

function centerCan() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  Can.position(x, y);
}

function setup() {
  Can = createCanvas(600, 600);
  Can.id("pCan");
  centerCan();

  // strokeWeight(1);
  background(0);
  stroke(255);
}

function windowResized() {
  centerCan();
}

function draw() {
  background(0, float(op.value));

  th = float(thick.value);
  inc = float(redC.value);
  strokeWeight(th);
  Linner();
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

}