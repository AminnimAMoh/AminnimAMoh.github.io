var Can;

let b = [];
var r = 300;

var spec;
var partNum = 512;
var inc = 1;

let sound;

var pic;
var eAlpha = 0;
var sPlay = false;
var tAlphaR = 255;
var tAlphaL = 255;

var soundName = ["Please drag and drop an audio file"];
var t = 0;
var fram = 0;
var errorCount = 0;
var amplitude;
var vol = 0;

var chackFile = false;
var wave;

let s = [];

// function preload(){
//   font=loadFont('assets/Asap-Italic.ttf');
//   pic=loadImage('assets/backGround.jpeg');
// }

function windowResized() {

  resizeCanvas(windowWidth, windowHeight);

}

function setup() {
  Can = createCanvas(windowWidth, windowHeight);
  Can.position(0, 0);
  Can.background(0);
  Can.style('z-index', '-1');

  Can.drop(gotFile);

  rectMode(CENTER);

  pixelDensity(1);
  // image(pic,0,0,width,height);

  fft = new p5.FFT();
  amplitude = new p5.Amplitude();

  for (var i = 0; i < 1100; i++) {
    var x = random(-width, width);
    var y = random(-height, height);
    var z = random(width);
    s[i] = new Star(x, y, z);
  }

  background(0);
}

function gotFile(file) {
  chackFile = true;
  t = 0;
  if (errorCount == 0) {
    soundName[0] = file.name;
    sound = loadSound(file);
    errorCount++;
  } else if (errorCount > 0) {
    sound.pause();
    sound = loadSound(file);
    soundName[0] = file.name;
    sound = loadSound(file);
    errorCount = 0;
  }


}


function draw() {
  background(0);

  // image(pic,0,0,width,height);

  fill(255);
  textSize(20);
  // textFont(font);
  textAlign(CENTER);
  noStroke();
  if (chackFile) {
    text("Soung Name: " + soundName[0], width / 2, height - 50);
  } else {
    text(soundName[0], width / 2, height - 50);
  }

  translate(width / 2, height / 2);

  for (var star of s) {
    star.run();
  }

  /*-------------------------------------------
  Sound Loading Section
  -------------------------------------------*/
  if (chackFile && sound.isLoaded() == false) {
    for (var j = 0; j < 100; j++) {
      var a = TWO_PI * (j / 20);
      var lx = 60 * cos(a);
      var ly = 60 * sin(a);
      strokeWeight(random(6));
      stroke(255, 245, 214);
      point(lx, ly);
    }
  }

  /*-------------------------------------------
  Sound Analyze Section
  -------------------------------------------*/
  if (chackFile) {
    sound.amp(0.8);
    spec = fft.analyze(1024);
    wave = fft.waveform();
    var du = sound.duration();

    var level = amplitude.getLevel();
    vol = map(level, 0, 1, 0, 100);

    var energyBass = fft.getEnergy("bass");
    var energyMid = fft.getEnergy("mid");

    /*-------------------------------------------
    Time Section
    -------------------------------------------*/
    if (sound.isPlaying()) {
      t += 60 / (frameRate() * 60);
      var angle = TWO_PI * (t / du);
      noFill();
      stroke(255, 245, 214, 200);
      strokeWeight(6);
      arc(0, 0, (r * 2) + 12, (r * 2) + 12, 0, angle);
      if (t >= du) {
        sPlay = false;
        sound.pause();
        t = 0;
      }
    }


    /*-------------------------------------------
    Inner Circle Section-(Energy & Wave)
    -------------------------------------------*/
    beginShape(QUAD_STRIP);
    for (var i = 0; i < partNum; i += inc) {

      var largeAngle = TWO_PI * (i / (partNum));

      var x = (r) * cos(largeAngle);
      var y = (r) * sin(largeAngle);

      var xMap = map(x, -r, r, -1, 1);
      var yMap = map(y, -r, r, -1, 1);

      var eb = map(energyBass, 0, 255, 0, 80);
      var em = map(energyMid, 0, 255, 0, 80);

      var wMap = map(wave[i], -1, 1, -20, 20);

      // strokeWeight(0.6);
      noStroke();
      fill(255, 60);
      // if (largeAngle>0 && largeAngle<PI){
      vertex((x - (em * xMap)) + wMap, (y - (em * yMap)) + wMap);

      // }else if (largeAngle>PI && largeAngle<TWO_PI){
      //   vertex((x-(em*xMap))+wMap,(y-(em*yMap))+wMap);
      //
      // }
      vertex(x, y);
    }
    endShape(CLOSE);


    /*-------------------------------------------
    Outer Circle Section-(Spectrum)
    -------------------------------------------*/
    beginShape(QUAD_STRIP);
    for (var i = 0; i < partNum; i += inc) {

      var largeAngle = TWO_PI * (i / (partNum));

      var x = (r) * cos(largeAngle);
      var y = (r) * sin(largeAngle);

      var xMap = map(x, -r, r, -1, 1);
      var yMap = map(y, -r, r, -1, 1);

      if (chackFile) {
        var sMap = map(spec[i], 0, 255, 1, 50);

        var nx = x - ((sMap) * xMap);
        var ny = y - ((sMap) * yMap);

        noStroke();
        noFill();
        curveVertex(x, y);
        fill(255, 245, 214, 200);
        curveVertex(nx, ny);
      }
    }
    endShape(CLOSE);

    /*-------------------------------------------
    Play Button Section-(Play & Pause)
    -------------------------------------------*/
    var dm = dist(0, 0, mouseX - width / 2, mouseY - height / 2);
    if (dm < 50) {
      eAlpha = 130;
    } else {
      eAlpha = 0;
    }
    fill(255, 245, 214, eAlpha);
    stroke(0, eAlpha);
    strokeWeight(1);
    ellipse(0, 0, 100);
    if (!sPlay) {
      fill(0, eAlpha);
      triangle(-5, -5, 5, 0, -5, 5);
    } else if (sPlay) {
      fill(0, eAlpha);
      noStroke();
      rect(-5, 0, 5, 15);
      rect(5, 0, 5, 15);
    }
    var tm = dist((width / 2) - 40, (height / 2) - 30, mouseX - width / 2, mouseY - height / 2);
    if (tm < 200) {
      tAlphaR = 130;
    } else {
      tAlphaR = 255;
    }
  }
}
/*-------------------------------------------
StarFieldSection
-------------------------------------------*/
function Star(x_, y_, z_) {
  var x = x_;
  var y = y_;
  var z = z_;

  var px = x;
  var py = y;
  var pz = z_;

  this.run = function() {
    this.update();
    this.display();
  }
  this.update = function() {
    z -= vol;
    if (z < 1) {
      x = random(-width, width);
      y = random(-height, height);
      z = width;
      px = x;
      py = y;
      pz = z;
    }
  }
  this.display = function() {
    stroke(235, 183, 123);

    var xm = map(x / z, 0, 1, 0, width);
    var ym = map(y / z, 0, 1, 0, height);

    var zm = map(z, 0, width, 3, 0);

    var px = map(x / pz, 0, 1, 0, width);
    var py = map(y / pz, 0, 1, 0, height);
    pz = z;
    strokeWeight(zm);
    line(px, py, xm, ym);
  }
}

/*-------------------------------------------
togglePlay Section
-------------------------------------------*/
function togglePlay() {
  if (sound.isPlaying()) {
    sPlay = false;
    sound.pause();
  } else {
    if (sound.isLoaded()) {
      sPlay = true;
    }
    sound.loop();
  }
}

/*-------------------------------------------
Mouse Section
-------------------------------------------*/
function mousePressed() {
  var dm = dist(0, 0, mouseX - width / 2, mouseY - height / 2);
  if (dm < 50) {
    togglePlay();
  }
}