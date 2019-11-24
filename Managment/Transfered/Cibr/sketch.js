var circle;
var ro = 1;
var rot = 0;
var Can;
var curveNum = 2;

function centerCan() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  Can.position(x, y);
}

function setup() {
  Can = createCanvas(1000, 1000);
  Can.id("pCan");
  centerCan();
  stroke(255);
  strokeWeight(0.5);
  //frameRate(16);
  noFill();
}

function windowResized() {
  centerCan();
}

function draw() {
  background(0, 24);
  translate(width / 2, height / 2);
  Circles(frameCount / 20 + PI);
  Circles(frameCount / 20);

  curveNum = int(redC.value);


  rot += 0.01;
  rot %= TWO_PI;
}

function Circles(r) {
  this.r = r;
  var end = 120;

  beginShape();
  for (var i = 0; i < end; i++) {
    var yoff = d * sin(this.r + map(i, 0, end, 0, curveNum * TWO_PI));
    var angle = i * TWO_PI / end;
    var d = (rot - angle);
    d %= TWO_PI;
    var r = end + yoff * 2;
    curveVertex(r * cos(angle), r * sin(angle));
    endShape(CLOSE);
  }
}