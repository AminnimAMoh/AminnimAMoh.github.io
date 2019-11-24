var p = [];
var soundName = ["Please drag and drop a audio file"];
var testTrack = false;

var x = 0;
var y = 0;

var inc = 0;
var c = 0;
var Linc = 0;
var partNumb = 18;
var test = 0;

var xAcc = [];
var yAcc = [];
var Acc = 0;
var spectrum = [];

function windowResized() {

  resizeCanvas(windowWidth, windowHeight);
  canResized = true;

}

function setup() {
  var Can = createCanvas(windowWidth, windowHeight);
  Can.drop(getFile);
  Can.mouseClicked(togglePlay);
  colorMode(HSB, 100);


  amplitude = new p5.Amplitude();
  fft = new p5.FFT();

  // colorMode(RGB, 100);
  for (var i = 0; i < partNumb; i++) {
    p[i] = new Ball(random(width / 5), random(height / 5));
  }
  background(0);
}

function getFile(file) {
  testTrack = true;
  sound = loadSound(file);
  soundName[0] = file.name;
}

function draw() {

  background(0, 18);

  fill(255, 60);
  textSize(20);
  // textFont(font);
  textAlign(CENTER);
  noStroke();
  if (testTrack) {
    text("Soung Name: " + soundName[0], width / 2, height - 50);
  } else {
    text(soundName[0], width / 2, height - 50);
  }

  translate(width / 2, height / 2);

  spectrum = fft.analyze();

  for (var b of p) {
    for (var i = 0; i < spectrum.length; i++) {
      var low = fft.getEnergy(300, 1200);
      yAcc[i] = map(low, 0, 255, -1.5, 1.5);
      var high = fft.getEnergy(1200, 3000);
      xAcc[i] = map(low, 0, 255, -13, 13);
    }
    b.run();
  }
  //print(low);
}

function Ball(xp, yp) {
  var xPos = xp;
  var yPos = yp;
  var Ainc = 6;
  var size = 30;

  this.pos = createVector(xPos, yPos);
  this.Lpos = createVector(this.pos.x, this.pos.y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);

  this.run = function() {

    this.physic();
    this.display();
    this.con();
  }


  this.physic = function() {
    for (var b = 0; b < p.length; b++) {
      this.vel.add(this.acc);
      this.vel.limit(3);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.acc.add(xAcc[b], yAcc[b]);
      this.calForce();
    }
  }

  this.calForce = function() {
    this.acc.add(random(-Ainc, Ainc));
  }

  this.display = function() {
    //for (var i = 0; i < partNumb; i++) {
    var Ad = dist(this.pos.x, this.pos.y, 0, 0);
    var Hmap = map(Ad, 0, width, 100, inc);
    var Smap = 255;
    var Bmap = 255;
    var Ad = dist(this.pos.x, this.pos.y, 0, 0);
    var Amap = map(Ad, 0, width / 2, 0, 255);
    for (var i = 0; i < partNumb; i++) {
      push();
      rotate(TWO_PI * i / partNumb);
      stroke(Hmap, Smap, Bmap, Amap);
      strokeWeight(1);
      line(this.Lpos.x, this.Lpos.y, this.pos.x, this.pos.y);
      pop();
    }
    this.Lpos.x = this.pos.x;
    this.Lpos.y = this.pos.y;
  }

  this.con = function() {

    test = this.pos.x;
    if (this.pos.x > (width / 3) - size) {
      this.pos.x = size;
      this.pos.y = size;
    }
    if (this.pos.x < size * 1.5) {

      this.pos.x = size;
      this.pos.y = size;
    }
    if (this.pos.y > (height / 3) - size) {
      this.pos.x = size;
      this.pos.y = size;
    }
    if (this.pos.y < size * 1.5) {
      this.pos.x = size;
      this.pos.y = size;
    }
  }
}

function togglePlay() {
  if (testTrack) {
    if (sound.isPlaying()) {
      sound.pause();
    } else {
      sPlay = true;
      sound.loop();
    }
  }
}