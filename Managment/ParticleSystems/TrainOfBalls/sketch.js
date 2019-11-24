var cols, rows;
var scl = 10;
var ball = [];
var DIS = 80;
var DISTIRTION = 30;
var mode = false;
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

  stroke(255);
  fill(255);

  cols = (width) / scl;
  rows = (height) / scl;

  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var index = x + y * width;
      ball.push(new Balls(x * scl, y * scl));
    }
  }
}

function windowResized() {
  centerCan();
}

function draw() {
  background(0);

  var att = createVector(mouseX, mouseY);
  for (var b of ball) {
    b.update(att);
  }
}

function Balls(x, y) {
  this.pos = createVector(x, y);
  this.origin = this.pos.copy();
  this.vel = createVector();

  this.update = function(attract) {
    var tmp = this.origin.copy();
    tmp.sub(attract);
    var dr = tmp.mag();
    var drMap = map(dr, 0, DIS, 0, PI);
    tmp.normalize();
    if (mode) {
      tmp.mult(DISTIRTION * sin(drMap));
    }
    if (dr < DIS) {
      strokeWeight(1 + 10 * (abs(cos(drMap / 2))));
      if (!mode) {
        tmp.mult(DISTIRTION * sin(drMap));
      }
    } else {
      strokeWeight(map(min(dr, width), 0, width, 5, 0.1));
    }
    var target = createVector(
      this.origin.x + tmp.x,
      this.origin.y + tmp.y
    );
    tmp = this.pos.copy();
    tmp.sub(target);
    tmp.mult(-map(attract.dist(this.pos), 0, 2 * width, 0.1, 0.01));
    this.vel.add(tmp);
    this.vel.mult(0.87);
    this.pos.add(this.vel);

    point(this.pos.x, this.pos.y);
  }
}

function mousePressed() {
  mode = !mode;
}