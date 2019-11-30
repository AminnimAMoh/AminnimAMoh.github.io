var cols, rows;
var scl = 20;
var pnum;
var a = 0;
var s = false;


function centerCan() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  Can.position(x, y);
}

function setup() {
  Can = createCanvas(windowWidth, windowHeight);
  Can.id("pCan");

  rectMode(CENTER);
  cols = floor(width / scl);
  rows = floor(height / scl);
  pnum = scl * 4;
}

function windowResized() {
  centerCan();
}

function draw() {
  background(200);
  for (var y = 0; y < rows; y += scl) {
    for (var x = 0; x < cols; x += scl) {
      push();
      translate(x * scl, y * scl);
      for (var i = 0; i < pnum; i++) {
        var rSize = map(i, 0, pnum, 0, rows * scl / 4);
        var inc = map(i, 0, pnum, 1, 0);
        var al = map(cos(a * inc), -1, 1, 255, 0);
        push();
        translate(0, 0);
        rotate(cos(a * inc));
        stroke(22, 45, 67, al);
        strokeWeight(0.5);
        noFill();
        rect(0, 0, rSize, rSize);
        pop();
      }
      pop();
    }
  }
  //a=3;
  if (s) {
    a += 0.01;
  } else {
    a -= 0.01;
  }
  if (a >= PI) {
    s = false;
  } else if (a <= -PI) {
    s = true;
  }
}