var cols, rows;
var scl = 10;
var pnum;
var a = 3;
var s = false;


function windowResized() {
  var container = document.getElementById("pCover");
  var x = container.offsetWidth;
  var y = container.offsetHeight;
  Can = createCanvas(x, y);
  Can.parent("#pCover");
  reset();
}

function reset() {
  cols = floor(width / scl);
  rows = floor(height / scl);
  pnum = scl * 2;
  a = 0;
}

function setup() {
  var container = document.getElementById("pCover");
  var x = container.offsetWidth;
  var y = container.offsetHeight;
  Can = createCanvas(x, y);
  Can.parent("#pCover");

  rectMode(CENTER);
  cols = floor(width / scl);
  rows = floor(height / scl);
  pnum = scl * 4;
}

function draw() {
  background(233);
  for (var y = 0; y < rows; y += scl) {
    for (var x = 0; x < cols; x += scl) {
      push();
      translate(x * scl, y * scl);
      for (var i = 0; i < pnum; i++) {
        var rSize = map(i, 0, pnum, 0, rows * scl / 2);
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