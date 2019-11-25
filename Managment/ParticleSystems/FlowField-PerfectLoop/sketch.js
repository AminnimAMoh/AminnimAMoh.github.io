var cols, rows;
var scl = 10;
var p;
var particles = [];
var a = 0;
var inc = 0.01;
var zinc = 0.0001;
var zoff = 0;
var count = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / scl);
  rows = floor(height / scl);
  p = new Array(cols * rows);

  for (var i = 0; i < 2000; i++) {
    particles[i] = new Particle();
  }
  background(0);
}

function draw() {
  var canDen = float(CanD.value);
  background(0, canDen);
  zinc = float(zInc.value);
  inc = float(xyInc.value);
  var mode = resive.value;
  console.log(mode);
  if (mode == "eleOne" && count < 1) {
    save('FlowField-AminPort.jpg');
    console.log("Image saved");
    count++;
  }

  var yoff = 0;
  for (var x = 0; x < cols; x++) {
    var xoff = 0;
    for (var y = 0; y < rows; y++) {
      var index = x + y * cols;
      a += radians(10);
      var angle = map(noise(xoff, yoff, zoff), 0, 1, 0, TWO_PI);
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      p[index] = v;
      xoff += inc;
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // stroke(255);
      // line(0, 0, scl, 0);
      // pop();
    }
    yoff += inc;
    zoff += zinc;
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(p);
    particles[i].update();
    particles[i].edges();
    // particles[i].edges2();
    // particles[i].edges3();
    particles[i].calColor();
    particles[i].show();
  }
}

function Particle() {
  var r = 0;
  var g = 0;
  var b = 0;

  this.pos = createVector(random(width), random(height));
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);

  this.prevPos = this.pos.copy();

  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.vel.limit(4);
    this.acc.mult(0);
  }
  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.calColor = function() {
    r = map(
      this.pos.x, 0, width, 0, 255
    );
    g = map(
      this.pos.y, 0, height, 0, 255
    );
    b = map(
      this.vel.mag(), 0, 4, 0, 255
    );
  }
  this.show = function() {

    beginShape();
    var al = float(ParticlesD.value);

    stroke(255, 255, 255, al);
    strokeWeight(0.3);

    curveVertex(this.pos.x, this.pos.y);
    curveVertex(this.prevPos.x, this.prevPos.y);
    endShape(CLOSE);
    this.updatePrev();
  }

  this.updatePrev = function() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  this.edges = function() {
    if (this.pos.x > width) {
      this.pos.x = random(width);
      this.pos.y = random(height);
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = random(width);
      this.pos.y = random(height);
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.x = random(width);
      this.pos.y = random(height);
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.x = random(width);
      this.pos.y = random(height);
      this.updatePrev();
    }
  }
  this.edges2 = function() {
    if (this.pos.x > width) {
      this.pos.x = random(width);
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = random(width);
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = random(height);
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = random(height);
      this.updatePrev();
    }
  }
  this.edges3 = function() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }
  this.follow = function(vectors) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  }

}