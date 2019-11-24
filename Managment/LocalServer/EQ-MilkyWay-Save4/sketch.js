var p = [];

var inc = 0;
var c = 0;
var Linc = 0;
var partNumb = 1024;
var test = 0;

var xAcc = [];
var yAcc = [];
var sMap = [];
var rand = [];
var soundName = ["Please drag and drop a audio file"];

var strokeSize = 1;
var Acc = 0;
var spectrum = [];
var aLevel = 30;
var rLevel = 50;
var tLevel = 7;
var testTrack = false;
var Ainc = 0;
let img;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  var Can = createCanvas(windowWidth, windowHeight);
  Can.drop(getFile);
  Can.mouseClicked(togglePlay);
  // colorMode(HSB, 100);
  colorMode(RGB);

  amplitude = new p5.Amplitude();
  fft = new p5.FFT();

  // img = loadImage("Asset/Capture.png");

  // colorMode(RGB, 100);
  for (var i = 0; i < partNumb; i++) {
    var a = map(i, 0, partNumb, 0, TWO_PI);
    var x = 30 * cos(a);
    var y = 30 * sin(a);
    p[i] = new Ball(x, y);
  }
  background(0);
}

function getFile(file) {
  testTrack = true;
  sound = loadSound(file);
  soundName[0] = file.name;
}

function draw() {

  background(0);

  fill(255);
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


  var level = amplitude.getLevel();
  aLevel = map(level, 0, 1, 30, 160);


  spectrum = fft.analyze([2048]);

  var midMax = TWO_PI;
  var lowMax = TWO_PI;

  for (var i = 0; i < p.length; i++) {
    if (testTrack && sound.isLoaded()) {
      var mid = fft.getEnergy("lowMid", "mid");
      yAcc[i] = map(mid, 0, 255, -midMax, midMax);
      var highMid = fft.getEnergy("highMid", "bass");
      xAcc[i] = map(highMid, 0, 255, -lowMax, lowMax);
      sMap[i] = map(spectrum[i], 0, 255, 1, 100);
      var low = fft.getEnergy("bass");
      tLevel = map(low, 0, 255, 7, 3);
      // imageMode(CENTER);
      // image(img, 0, 0, img.width / tLevel, img.height / tLevel);
      strokeSize = map(low, 0, 255, 0.01, 2);
    } else {
      xAcc[i] = random(-midMax, midMax);
      yAcc[i] = random(-lowMax, lowMax);
      sMap[i] = 3;
    }
    p[i].run(xAcc[i], yAcc[i], sMap[i]);
  }
}

function Ball(xp, yp) {
  var xPos = xp;
  var yPos = yp;

  this.pos = createVector(xp, yp);
  this.Lpos = this.pos.copy();
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);

  this.run = function(ax, ay, speed) {
    this.physic(speed);
    this.display();
    this.con();
    this.posUpdate();
    this.calForce(ax, ay, speed);
  }


  this.physic = function(s) {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(s);
    this.acc.mult(0);
  }

  this.calForce = function(accX, accY, s) {
    var r = 10;
    var xMap = map(this.pos.x, -width / 2, width / 2, -1, 1);
    var yMap = map(this.pos.y, -height / 2, height / 2, -1, 1);
    var x = xMap * (r * cos(accX));
    var y = yMap * (r * sin(accY));
    this.acc.add(x, y);
    // this.acc.add(100*accX*xMap, 100*yMap*accY);
  }

  this.display = function() {
    beginShape(LINES);
    var Ad = dist(this.pos.x, this.pos.y, 0, 0);
    // var Hmap = map(Ad, 0, width, 100, inc);
    // var Smap = 255;
    // var Bmap = 255;
    var rC = map(Ad, 0, width / 2, 0, 197);
    var gC = map(Ad, 0, width / 2, 0, 179);
    var bC = map(Ad, 0, width / 2, 255, 88);

    var Amap = map(Ad, aLevel, width / 2, 0, 255);

    // stroke(Hmap, Smap, Bmap, Amap);
    stroke(rC, gC, bC, Amap);
    strokeWeight(strokeSize);
    curveVertex(this.pos.x, this.pos.y);
    curveVertex(this.Lpos.x, this.Lpos.y);
    endShape();
  }

  this.con = function() {
    var xMap = map(this.pos.x, -width / 2, width / 2, -aLevel, aLevel);
    var yMap = map(this.pos.y, -height / 2, height / 2, -aLevel, aLevel);

    if (this.pos.x > (width / 2)) {
      this.pos.x = xPos + xMap;
      this.pos.y = yPos + yMap;
    }
    if (this.pos.x < -(width / 2)) {
      this.pos.x = xPos + xMap;
      this.pos.y = yPos + yMap;
    }
    if (this.pos.y > (height / 2)) {
      this.pos.x = xPos + xMap;
      this.pos.y = yPos + yMap;
    }
    if (this.pos.y < -(height / 2)) {
      this.pos.x = xPos + xMap;
      this.pos.y = yPos + yMap;
    }
  }

  this.posUpdate = function() {
    this.Lpos.x = this.pos.x;
    this.Lpos.y = this.pos.y;
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