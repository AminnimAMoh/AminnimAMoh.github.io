var t1 = 0;
var t2 = 0;
var t3 = 0;

var inc = 1;
var a = 0;
var p = [];

let bk;

function centerCan() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  Can.position(x, y);
}

function setup() {
  Can = createCanvas(600, 600, WEBGL);
  Can.id("pCan");
  centerCan();

  bk = createGraphics(width, height, WEBGL);
  bk.background(0, 10);
  bk.style('z-index', '-11');
}

function windowResized() {
  centerCan();
}

function draw() {
  image(bk, 0, 0);
  a += 0.01;

  rotateY(cos(a));
  rotateX(PI / 2);

  beginShape();

  for (var i = 0; i < 100; i += inc) {

    var x = 100 * cos(i * t2);
    var y = 20 * sin(i * t1);
    var z = 100 * sin(i * t2);
    p[i] = createVector(x, y, z);

    noFill();
    stroke(255);
    strokeWeight(0.5);
    vertex(p[i].x, p[i].y, p[i].z);

    if (p.length > 99) {
      p.splice(i, 1);
      background(120);
    }

  }

  t1 += 0.03;
  t2 += 0.0001;

  endShape();

}