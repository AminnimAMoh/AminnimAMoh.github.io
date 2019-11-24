var y = [];
var inc = 360;
var s = 0;
var Can;
var incer = 1;
var th = 2;

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

}

function windowResized() {
  centerCan();
}

function draw() {

  background(0, float(op.value));

  var size = 32;

  incer = float(redC.value);
  th = float(thick.value);

  translate(width / 2, height / 2);

  beginShape();
  for (var i = 0; i < 500; i++) {
    var col = map(inc, 0, 360, 0, 255);
    y[i] = th * (sin(360 * i / inc));
    var firstP = y[i] * size;
    push();
    rotate(360 * i / 360);
    stroke(255, 24);
    strokeWeight(2);
    noFill();
    bezier(0, 0, firstP, firstP, secP, secP, 0, 0);
    //point(firstP,firstP);
    pop();
    var secP = firstP;

  }
  endShape(CLOSE);
  switch (s) {
    case (0):
      inc += incer;
      break;
    case (1):
      inc -= incer;
      break;
  }

  if (inc > 360) {
    s = 1;
  }
  if (inc < 60) {
    s = 0;
  }
}