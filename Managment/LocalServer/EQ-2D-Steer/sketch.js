var t = [];
var levelVects = [];
var specVects = [];
var soundName = ["Please drag and drop a audio file"];

var sound;
var testTrack = false;
var rad = 300;
var radInc = 15;
var xInc = 0.07;
var amplitude;
var partNum = 8;

var img;
var back;

var bMap;
var mMap;
var ti = 0;
var sPlay = false;
var canResized = false;

var h, w;

// function preload() {
//   img = loadImage('assets/background.jpeg');
//   back = loadImage('assets/Backfull.jpg');
// }

function windowResized() {

  resizeCanvas(windowWidth, windowHeight);
  canResized = true;

}

function setup() {
  var Can = createCanvas(windowWidth, windowHeight);
  Can.drop(getFile);
  Can.mouseClicked(togglePlay);
  colorMode(HSB);
  rectMode(CENTER);

  fft = new p5.FFT();
  amplitude = new p5.Amplitude();

  // back.loadPixels();

  w = width / 2;
  h = height / 2;
  for (var r = 0; r < rad; r += radInc) {
    for (var x = 0; x < TWO_PI; x += xInc) {

      var xp = (r * cos(x));
      var yp = (r * sin(x));

      // var px = floor((img.width - 1665) + (xp));
      // var py = floor((img.height - 760) + (yp));
      // var c = img.get(px, py);

      t.push(new Train(xp, yp));
    }
  }
  canResized = true;
}

function getFile(file) {
  testTrack = true;
  sound = loadSound(file);
  soundName[0] = file.name;
}

function draw() {
  /*-------------------------------------------
  Canvas Setup Section
  -------------------------------------------*/
  background(0);
  //image(back, 0, 0, width, height);

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

  /*-------------------------------------------
  Sound Analyzers Section
  -------------------------------------------*/
  var level = amplitude.getLevel();
  var spec = fft.analyze(2048);
  var levelMap = map(level, 0, .2, 0, 500);
  var energyBass = fft.getEnergy("bass");
  bMap = map(energyBass, 0, 255, 5, 0);
  var energyMid = fft.getEnergy("mid");
  mMap = map(energyMid, 0, 255, 50, 100);

  /*-------------------------------------------
  Time Section
  -------------------------------------------*/
  if (testTrack) {
    if (sound.isPlaying()) {
      var du = sound.duration();
      ti += 60 / (frameRate() * 60);
      var a = (TWO_PI * (ti / du)) + (3 * PI / 2);
      noFill();
      stroke(200, 15, 140);
      strokeWeight(4);
      arc((width / 2), (height / 2), (rad * 2) + 16, (rad * 2) + 16, -PI / 2, a);
      if (ti >= du) {
        sPlay = false;
        sound.pause();
        ti = 0;
      }
    }

    for (var i = 0; i < partNum; i++) {

      var largeAngle = TWO_PI * (i / partNum);

      var x = width / 2 + ((levelMap) * cos(largeAngle));
      var y = height / 2 + ((levelMap) * sin(largeAngle));

      levelVects[i] = createVector(x, y);
    }

    var r1 = 1;
    for (var i = spec.length; i > 0; i -= 64) {
      var r2 = map(spec[i], 0, 255, 1, 80);
      beginShape(QUAD_STRIP);
      for (var a = 0; a <= TWO_PI; a += PI / 30) {
        var x = width / 2 + (r1 * cos(a));
        var y = height / 2 + (r1 * sin(a));
        var xp = width / 2 + ((r1 + r2) * cos(a));
        var yp = height / 2 + ((r1 + r2) * sin(a));
        var rMap = map(r2, 1, 100, 0, 255);
        fill(160, 15, rMap);
        noStroke();
        // stroke(160, 15, rMap);
        vertex(xp, yp);
      }
      r1 += 20;
      endShape();
    }

    noFill();
    stroke(200, 38, 140);
    strokeWeight(1);
    ellipse(width / 2, height / 2, (rad * 2) + 16);

    var tm = dist((width / 2) - 40, (height / 2) - 30, mouseX - width / 2, mouseY - height / 2);
    if (tm < 200) {
      tAlphaR = 130;
    } else {
      tAlphaR = 255;
    }

    var j = 0;
    for (var i = 0; i < t.length; i++) {
      if (i > 776) {
        j++;
      } else {
        j = 0;
      }
      var angleMap = map(spec[j], 0, 255, -TWO_PI, TWO_PI);
      var sizeMap = map(spec[j], 0, 255, 160, 255);
      if (canResized) {
        t[i].posSet();
      }
      t[i].beh();
      t[i].physic();
      t[i].display(angleMap, sizeMap);
    }
    canResized = false;
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