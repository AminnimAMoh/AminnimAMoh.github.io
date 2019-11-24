var t = 6;
var t1 = 0;
var Can;

function centerCan() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  Can.position(x, y);
}

function setup() {
  Can = createCanvas(600, 600);
  Can.id("pCan");
  centerCan();
  angleMode(DEGREES);
  background(0);
  noFill();
  strokeWeight(0.1);
}

function windowResized() {
  centerCan();
}

function draw() {
  translate(width / 2, height / 2);

  var tInc = float(redC.value);
  beginShape();
  stroke(132, 26, 81, 220);
  for (var a = 0; a < 361; a++) {
    var c =
      300 * noise(
        cos(0.4 * t),
        sin(a * 0.4)
      );
    var x = c * cos(a);
    var y = c * sin(a);
    curveVertex(x, y);
  }
  t += 1;
  endShape();

  if (frameCount % 1000 == 0) {
    noLoop();
  }
}