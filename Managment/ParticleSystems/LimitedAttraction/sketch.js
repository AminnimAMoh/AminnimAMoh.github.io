var b = [];
var attractor;
var tuched = 60;
var r;
var Can;

function centerCan() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  Can.position(x, y);
}

function setup() {
  Can = createCanvas(1000, 1000);
  Can.id("pCan");
  centerCan();
  angleMode(DEGREES);

  for (var i = 0; i < 400; i++) {
    var m1 = random(20);
    var g = 8;
    b[i] = new Planet(
      random(width),
      random(height), g, m1);
    b.push(new Planet(
      width / 2,
      height / 2, 27, m1));
  }
  r = width / 4;

}

function windowResized() {
  centerCan();
}

function draw() {

  background(0, 120);
  translate(width / 2, height / 2);

  noFill();
  stroke(255, 6);
  ellipse(0, 0, r * 2);

  var mouseDx = map(
    mouseX, width / 2 - r, width / 2 + r,
    -r, r
  );
  var mouseDy = map(
    mouseY, height / 2 - r, height / 2 + r,
    -r, r
  );
  attractor = createVector(
    mouseDx,
    mouseDy
  );

  for (var planet of b) {
    planet.run(attractor);
  }

}

function Planet(x, y, g, m1) {

  this.mass = m1;
  this.g = g;

  this.pos = createVector(x, y);
  this.lPos = createVector(x, y);

  this.vel = createVector();
  this.acc = createVector();

  this.run = function(attractor) {

    this.display();
    this.physic();
    this.calForce(attractor);
    this.CyrcleEdges();

  }

  this.display = function() {

    // stroke(250, 250, 210);
    strokeWeight(3);

    //point(this.pos.x, this.pos.y);

    line(this.pos.x, this.pos.y,
      this.lPos.x, this.lPos.y);

    this.lPos.x = this.pos.x;
    this.lPos.y = this.pos.y;

  }

  this.physic = function() {

    this.vel.add(this.acc);
    this.vel.limit(6);
    this.pos.add(this.vel);
    this.acc.mult(0);

  }

  this.calForce = function(attractor) {

    for (var planet of b) {

      if (mouseIsPressed) {

        var distance = p5.Vector.sub(
          this.pos,
          attractor
        );
      } else {
        var distance = p5.Vector.sub(
          this.pos,
          planet.pos
        );
      }

      var ds = distance.mag();
      ds = constrain(ds, 1, tuched);
      var gravity =
        ((this.g - planet.g) *
          (this.mass * planet.mass)) /
        (ds * ds);
      distance.setMag(gravity);
      this.acc.add(distance);
    }

  }

  this.CyrcleEdges = function() {

    var lilCal = dist(
      this.pos.x, this.pos.y,
      0, 0)

    if (lilCal > r) {
      this.pos.x = random(-r, r);
      this.pos.y = random(-r, r);
      this.updatePrev();
    }
  }

  this.updatePrev = function() {

    this.lPos.x = this.pos.x;
    this.lPos.y = this.pos.y;

  }

}