var b = [];
var scl = 15;
var rows, cols;
var s = 1;
var aInc = 0.03;
var myFont;
var sInc = 2;
var Can;
var speed;
var con;

function centerCan() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  Can.position(x, y);
  Can.id("pCan");
}

function setup() {
  Can = createCanvas(1000, 1000);
  centerCan();

  rows = (height / 2) / scl;
  cols = (width / 2) / scl;

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var x = (i * 6) * cos((i * 2) % 360);
      var y = (i * 6) * sin((i * 2) % 360);
      b.push(new Ball((i * scl), (j * scl), x, y, i, i, random(1)));
    }
  }
  background(0);
}

function windowResized() {
  centerCan();
}

function draw() {
  background(0);
  translate(width / 4, height / 4);
  stroke(255);
  noStroke();
  fill(255);
  speed = int(maxSpeedSlide.value);
  aSpeed = float(maxDisSlide.value);
  con = resive.value;
  if (con == "eleTwo") {
    s = 2;
  } else if (con == "eleOne") {
    s = 1;
  }

  var n = parseFloat(Math.round(aInc * 100) / 100).toFixed(2);
  var sh = map(s, 0, 2, 1, 3);

  for (var ball of b) {
    ball.run();
  }
}

function Ball(x, y, mx, my, r_, a_, mass) {

  var maxSpeed = 6;
  var maxDis = 1;
  var centerMap = 0;

  this.pos = createVector(x, y);
  this.target = createVector(x, y);
  this.pPos = createVector(x, y);
  this.vel = createVector();
  this.acc = createVector();

  this.mpos = createVector(mx, my);
  this.mass = mass;

  var tail = [];
  var a = 0;
  this.a = a_;
  this.r = r_;

  this.run = function() {
    maxSpeed = speed;
    maxDis = aSpeed;
    this.spiralMove();
    this.behaviour();
    this.physic();
    this.display();
    if (s == 1) {
      this.newPos();
    }
  }

  this.behaviour = function() {
    var d = this.drag();
    this.calForce(d);

    var steered = this.steer();
    this.calForce(steered);

    var attracted = this.attract();
    this.calForce(attracted);
  }

  this.drag = function() {
    var dr = this.vel.copy();
    var s = dr.magSq();
    dr.setMag(-0.5 * 9.4 * s * 0.04);
    return (dr);
  }

  this.spiralMove = function() {
    this.a += 1;
    this.mpos.x = width / 4 + (this.r * 10) * cos((this.a * 6) % 360);
    this.mpos.y = height / 4 + (this.r * 10) * sin((this.a * 6) % 360);
    if (a > 360) {
      a = 0;
    }
  }

  this.steer = function() {
    var dr = p5.Vector.sub(this.target, this.pos);
    var d = dr.mag();
    var dMap = map(d, 0, maxDis, 0, maxSpeed);
    dr.setMag(dMap);
    var vDis = p5.Vector.sub(dr, this.vel);
    vDis.limit(maxSpeed);
    return vDis;
  }

  this.attract = function() {
    var dc = dist(this.pos.x, this.pos.y, width / 4, height / 4);
    centerMap = map(dc, 0, 200, 0, maxDis);
    var gForce = map(dc, 0, 200, 0.1, 10);
    for (var ball of b) {
      var dr = p5.Vector.sub(ball.mpos, this.pos);
      var d = dr.mag();
      if (d < centerMap) {
        d = constrain(d, 0.0001, 0.001);
        var g = 100 / (d * d);
        dr.setMag(g);
        return dr;
      }
    }
  }

  this.calForce = function(force) {
    this.acc.add(force);
  }

  this.physic = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(maxSpeed);
    this.acc.mult(0);
  }

  this.display = function() {
    var dr = p5.Vector.sub(this.target, this.pos);
    var d = dr.mag();
    var sMap = map(d, 0, maxDis, 0, 255);
    stroke(255, 255, 255);
    fill(sMap, 164, 232);

    switch (s) {
      case (0):
        strokeWeight(this.mass);
        point(this.pos.x, this.pos.y);
        break;
      case (1):
        strokeWeight(this.mass);
        line(this.pos.x, this.pos.y, this.pPos.x, this.pPos.y);
        break;
      case (2):
        noStroke();
        rect(this.pos.x, this.pos.y, 6, 6);
        break;
    }
  }

  this.newPos = function() {
    this.pPos.x = this.pos.x;
    this.pPos.y = this.pos.y;
  }
}

// function keyPressed() {
//   if (keyCode == 49) {
//     s = 0;
//   } else if (keyCode == 50) {
//     s = 1;
//   } else if (keyCode == 51) {
//     s = 2;
//   }
//   if (keyCode == 38) {
//     aInc += speed;
//   } else if (keyCode == 40) {
//     aInc -= 0.01;
//   }
// }