//var r=200;
var zoff = 0;
var inc = 0.1;
var zinc = 0.00009;
var off = 0;
var p = [];
var rad = 1;
var on = true;
var lineNumber = 6;
var a = 0;
var mConX = 0;
var mConY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(0);

  for (var i = 0; i < lineNumber; i++) {
    off = random(500);
    rad += 50;
    if (i > lineNumber / 2) {
      on = false;
    }
    p[i] = new Belt(off, rad, on);
  }
}

function draw() {

  background(0);

  var mx = map(mouseX, 0, width, -width, width);
  var my = map(mouseY, 0, height, -height, height);
  camera(mConX, mConY, 1000, 500, 500, 500, 0, 0, 1);
  for (var l of p) {
    l.display();
  }

  // stroke(2550,0,100);
  // noFill();
  // ellipse(0, 0, 10);
  if (mouseIsPressed) {
    mConX = mx;
    mConY = my;
  }
}

function Belt(o_, rad_, on) {
  this.yoff = o_;
  this.rad = rad_;
  var record = [];

  var round = 1.5;
  this.display = function() {
    var xoff = 0;
    beginShape(POINTS);
    if (on) {
      for (var i = 0; i <= round * TWO_PI; i += 0.05) {

        this.n = map(noise(cos(xoff), sin(this.yoff), zoff), -1, 1, -TWO_PI, TWO_PI);
        var r = map(noise(sin(xoff), cos(this.yoff), zoff), -1, 1, 0, 50);

        var x = width / 2 - (i * r) * cos(i + sin(this.n));
        var y = height / 2 - (i * r) * sin(i + sin(this.n));
        var z = width / 2 - (i * r) * sin(i - cos(this.n));
        var s = map(noise(xoff, this.yoff, zoff), 0, 1, 1, 5);

        stroke(255, 100, 0);
        noFill();
        strokeWeight(s);
        curveVertex(x, y, z);

        this.yoff += inc;
        xoff += inc / 10;

      }
      endShape();
      beginShape();
    } else {
      for (var i = 0; i < round * TWO_PI; i += 0.05) {

        this.n = map(noise(cos(xoff), sin(this.yoff), zoff), -1, 1, -TWO_PI, TWO_PI);
        var r = map(noise(cos(xoff), sin(this.yoff), zoff), -1, 1, 0, 50);
        var s = map(noise(xoff, this.yoff, zoff), 0, 1, 1, 5);

        var x = width / 2 + (i * r) * cos(i + sin(this.n));
        var y = height / 2 + (i * r) * sin(i + sin(this.n));
        var z = width / 2 + (i * r) * sin(i - cos(this.n));

        stroke(0, 100, 255);
        noFill();
        strokeWeight(s);
        curveVertex(x, y, z);

        this.yoff += inc;
        xoff += inc / 10;

      }
    }
    endShape();
    zoff += zinc;
  }

}
