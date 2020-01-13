var p = [];
var x = 0;
var y = 0;

var inc = 60;
var c = 0;
var Linc = 12;
var partNumb = 12;
var test = 0;
let Can;
var r = [];

var VelLInc = 0;
var tail = [];

var r, g, b = 0;
var offS = false;

function centerCan() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  Can.position(x, y);
}

function setup() {
  Can = createCanvas(600, 600);
  Can.id("pCan");
  colorMode(HSB);
  centerCan();


  for (var i = 0; i < partNumb; i++) {
    p[i] = new Ball(random(50, width / 5), random(50, height / 5));
  }
  background(0);
  smooth(10);
}

function windowResized() {
  centerCan();
}

function reset() {
  background(0);
  offS = false;
}

function draw() {
  // background(0, 24)

  var resetB = document.getElementById("receive");
  var option = document.getElementById("eleOne");
  if (resetB.value == "eleOne" && option.classList.contains("open")) {
    option.classList.remove("open");
    reset();
  }
  r = int(map(mouseX, 0, width, 0, 255));
  g = int(255);
  b = int(255);
  translate(width / 2, height / 2);
  for (var b of p) {
    if (!offS) {
      b.run();
    }
  }
}

function Ball() {


  var Ssize = width / 2.91;

  this.pos = createVector(random(width), random(height));
  this.Lpos = createVector(this.pos.x, this.pos.y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);


  this.run = function() {

    this.con();
    this.physic();
    this.display();

  }

  this.con = function() {

    test = this.pos.x;
    if (this.pos.x > Ssize) {
      this.pos.x = Ssize;
      this.pos.y = Ssize;
    }
    if (this.pos.x < 10) {
      this.pos.x = Ssize;
      this.pos.y = Ssize;
    }
    if (this.pos.y > Ssize) {
      this.pos.x = Ssize;
      this.pos.y = Ssize;
    }
    if (this.pos.y < 10) {
      this.pos.x = Ssize;
      this.pos.y = Ssize;
    }
    if (this.pos.x == Ssize && this.pos.y == Ssize) {
      this.Lpos.x = this.pos.x;
      this.Lpos.y = this.pos.y;
    }
  }


  this.display = function() {
    //var Salpha=map(this.pos.y,0,width/2.91,100,0);

    var Salpha = 255;
    var Rmap = map(this.pos.x, 0, width, r, 255);
    var Gmap = map(this.pos.y, 0, height, g, 255);
    var Bmap = map(this.pos.x, width, 0, b, 255);
    for (var i = 0; i < partNumb; i++) {
      push();
      stroke(Rmap, Gmap, Bmap, Salpha);
      // stroke(255);
      rotate(TWO_PI * i / partNumb);
      strokeWeight(map(mouseY, 0, height, 0.1, 5));
      line(this.pos.x, this.pos.y, this.Lpos.x, this.Lpos.y);
      pop();
    }
    this.Lpos.x = this.pos.x;
    this.Lpos.y = this.pos.y;

  }

  this.physic = function() {
    this.acc.add(random(-1.2, 1.2), random(-0.6, 0.6));
    this.vel.add(this.acc);
    this.vel.limit(VelLInc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    VelLInc += 0.0008;
    if (VelLInc > 3) {
      VelLInc -= 0.0008;
    }
  }
}

function mousePressed() {
  if (mouseY > 0) {
    offS = true;
  }
}