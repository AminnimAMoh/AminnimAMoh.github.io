var b = [];
var mousPos;
var scl = 10;
var s = false;
let Can;
var maxSpeed = 12;
var maxDis = 100;

function centerCan() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  Can.position(x, y);
  Can.style('margin-top', '30px');
}

function setup() {
  Can = createCanvas(900, 850);
  Can.id("pCan");
  centerCan();
  stroke(255);

  mousPos = createVector(width / 2, height / 2);

  var rows = height / scl;
  var cols = width / scl;
  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      b.push(new Ball(i * scl, j * scl));
    }
  }
  background(0);
}

function windowResized() {
  centerCan();
}

function mousePressed() {
  if (mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0) {
    mousPos.x = mouseX;
    mousPos.y = mouseY;
  }
}

function draw() {
  background(0, 80);

  maxDis = int(maxDisSlide.value);
  maxSpeed = int(maxSpeedSlide.value);
  var mode = document.getElementById("resive").value;
  console.log(mode);
  if (mode == "eleOne") {
    s = true;
  } else {
    s = false;
  }
  for (var ball of b) {
    ball.run();
  }
  // noLoop();
}

function Ball(x, y) {
  this.pos = createVector(x, y);
  this.target = createVector(x, y);
  this.vel = createVector();
  this.acc = createVector();
  this.m = createVector(0, height / 2);
  this.pm = createVector(0, height / 2);
  var r = 1;

  this.mVel = createVector();
  this.mAcc = createVector();

  this.run = function() {
    this.beh();
    this.physic();
    this.display();

    this.mForce();
    this.mGrow();
  }

  this.beh = function() {
    var steer = this.steer();
    this.applyForce(steer);

    var move = this.move();
    this.applyForce(move);
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.display = function() {
    var dr = p5.Vector.sub(this.target, this.pos);
    var d = dr.mag();
    var dm = map(d, 0, maxDis, 1, 30);
    var cm = map(d, 0, maxSpeed, 0, 255);
    if (s) {
      stroke(cm, 100, 100);
      strokeWeight(dm);
      point(this.pos.x, this.pos.y);
    } else if (!s) {
      noStroke();
      fill(cm, 100, 100);
      rect(this.pos.x, this.pos.y, dm, dm);
    }
  }
  this.move = function() {
    var dr = p5.Vector.sub(this.m, this.pos);
    var d = dr.mag();
    if (d < maxDis) {
      var dm = map(d, 0, maxDis, 6, 0);
      d = constrain(d, 0.1, 1);
      var g = dm / (d * d);
      dr.setMag(-g);
      return dr;
    }
  }

  this.physic = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(maxSpeed);
    this.acc.mult(0);
  }

  this.steer = function() {
    var dr = p5.Vector.sub(this.target, this.pos);
    var d = dr.mag();
    var dm = map(d, 0, 100, 0, maxSpeed);
    dr.setMag(dm);
    var vr = p5.Vector.sub(dr, this.vel);
    vr.limit(maxSpeed);
    return vr;
  }

  this.mGrow = function() {
    var dr = p5.Vector.sub(mousPos, this.m);
    var d = dr.mag();
    d = constrain(d, 0.01, 0.8);
    var g = 20 / (d * d);
    dr.setMag(g);
    this.mAcc.add(dr);
  }

  this.mForce = function() {

    this.m.add(this.mVel);
    this.mVel.add(this.mAcc);
    this.mVel.limit(20);
    this.mAcc.mult(0);
  }

  this.pMpos = function() {
    this.pm.x = this.m.x;
    this.pm.y = this.m.y;
  }
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    if (!s) {
      s = true;
    } else {
      s = false;
    }
  }

}