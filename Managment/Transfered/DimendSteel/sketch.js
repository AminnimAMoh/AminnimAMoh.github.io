var cols, rows;
var scl = 0;
var count = 0;
var turn = false;
var Can;
var rc = 10;
var gc = 10;
var bc = 10;

function centerCan() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  Can.position(x, y);
}

function setup() {
  Can = createCanvas(600, windowHeight - 168);
  centerCan();
  Can.id("pCan");

  strokeWeight(0.1);
  background(0);
}

function windowResized() {
  centerCan();
}

function draw() {
  background(0, 24);

  rc = int(redC.value);
  gc = int(greenC.value);
  bc = int(blueC.value);
  if (!turn) {
    scl += 0.5;
  } else {
    scl -= 0.5;
  }
  for (var i = 0; i < 4; i++) {
    var y = height / 2;
    if (i < 2) {
      for (var x = 0; x < width / 2; x += scl) {
        if (i == 0) {
          y -= scl;
        } else if (i == 1) {
          y += scl;
        }
        stroke(rc, gc, bc);
        line(x, height / 2, width / 2, y);
      }
    } else {
      for (var x = width; x > width / 2; x -= scl) {
        if (i == 2) {
          y -= scl;
        } else if (i == 3) {
          y += scl;
        }
        stroke(rc, gc, bc);
        line(x, height / 2, width / 2, y);
      }
    }
  }
  if (scl > 50) {
    turn = true;
  } else if (scl < 1) {
    turn = false;
  }
}