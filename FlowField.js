var tx = 0;
var ty = 0;

var inc = 6;

var kyeOne = true;
var kyeTwo = true;
var Can;

let firstTime = true;
let count = 0;

var PCan;
let pSketchRun = true;
let img;
let s = 6;
let pElement;


let SoundCan;
let soundElement;
var cols, rows;
var scl = 10;
let soundSketchRun = true;

let InfoCan;
let infoElement;
let infoImg;
let infoSketchRun = true;
let infoScl = 20;
var infozoff = 0;
var infoInc = 0.5;
var infozinc = 0.000005;

let LogoCan;
let logoElement;
let logoSketchRun = true;
var logoinc = 0.05;
var logozoff = 0;
var logozinc = 0.006;
var logofollow = [];
var mX = 0;
var logop = [];
var pNumber = 100;
var logoimg;
var logosSize = 4;
var logonTemp = 0;
var logostart = true;
var logocount = 0;
let logofirstTime = true;

var th = 0.1;
let off = false;

function windowResized() {
  pElement = document.getElementById("pSketch");
  PCan.resizeCanvas(pElement.offsetWidth, pElement.offsetHeight);

  soundElement = document.getElementById("soundSketch");
  SoundCan.resizeCanvas(soundElement.offsetWidth, soundElement.offsetHeight);
  cols = SoundCan.width / scl;
  rows = SoundCan.height / scl;

  infoElement = document.getElementById("InfoSketch");
  InfoCanInfoCan.resizeCanvas(infoElement.offsetWidth, infoElement.offsetHeight);
  cols = InfoCanInfoCan.width / scl;
  rows = InfoCanInfoCan.height / scl;

  logoElement = document.getElementById("LogoSketch");
  LogoCan.resizeCanvas(logoElement.offsetWidth, logoElement.offsetHeight);
  cols = LogoCan.width / scl;
  rows = LogoCan.height / scl;
  LogoCan.background(191, 150, 115)

  firstTime = true;
  logofirstTime = true;
  pSketchRun = true;
  soundSketchRun = true;
  infoSketchRun = true;
  logoSketchRun = true;
  logocount = 0;
  count = 0;

  resizeCanvas(windowWidth - 20, windowHeight - 20);
  off = false;
  ty = 0;
  tx = 0;
  kyeOne = true;
  kyeTwo = true;
  inc = 12;
  Can.background(255);


}

function preload() {
  img = loadImage("Assets/logo.png");
  infoImg = loadImage("Assets/D3.png");
  logoImg = loadImage("Assets/P5-11 (Black).png");
}

function setup() {


  Can = createCanvas(windowWidth - 20, windowHeight - 20);
  Can.position(0, 0);
  Can.background(255);
  Can.style('z-index', '-1');


  pElement = document.getElementById("pSketch");
  PCan = createGraphics(pElement.offsetWidth, pElement.offsetHeight);
  PCan.parent("#pSketch");
  PCan.style("display", "block")
  var pTextOne = createElement('h1', 'P5.js');
  var pTextTwo = createElement('h1', 'Interactive');
  pTextTwo.style("margin-left", "55px");
  pTextOne.style("color", "white");
  pTextTwo.style("color", "white");
  pTextOne.parent("#pSketch");
  pTextTwo.parent("#pSketch");

  soundElement = document.getElementById("soundSketch");
  SoundCan = createGraphics(soundElement.offsetWidth, soundElement.offsetHeight);
  SoundCan.parent("#soundSketch");
  SoundCan.style("display", "block")
  cols = SoundCan.width / scl;
  rows = SoundCan.height / scl;
  var soundTextOne = createElement('h1', 'Sound ');
  var soundTextTwo = createElement('h1', ' Visualization');
  soundTextTwo.style("margin-left", "55px");
  soundTextTwo.style("color", "white");
  soundTextOne.style("color", "white");
  soundTextOne.parent("#soundSketch");
  soundTextTwo.parent("#soundSketch");

  infoElement = document.getElementById("InfoSketch");
  InfoCanInfoCan = createGraphics(infoElement.offsetWidth, infoElement.offsetHeight);
  InfoCanInfoCan.parent("#InfoSketch");
  InfoCanInfoCan.style("display", "block")
  cols = InfoCanInfoCan.width / scl;
  rows = InfoCanInfoCan.height / scl;
  var infoTextOne = createElement('h1', 'Interactive ');
  var infoTextTwo = createElement('h1', ' Data Visualization');
  infoTextTwo.style("margin-left", "45px");
  infoTextTwo.style("color", "white");
  infoTextOne.style("color", "white");
  infoTextOne.parent("#InfoSketch");
  infoTextTwo.parent("#InfoSketch");
  infoImg.resize(0, 400)

  logoElement = document.getElementById("LogoSketch");
  LogoCan = createGraphics(logoElement.offsetWidth, logoElement.offsetHeight);
  LogoCan.parent("#LogoSketch");
  LogoCan.style("display", "block")
  LogoCan.background(191, 150, 115)
  cols = LogoCan.width / scl;
  rows = LogoCan.height / scl;
  var logoTextOne = createElement('h1', 'Logo ');
  var logoTextTwo = createElement('h1', ' Redesign');
  logoTextTwo.style("margin-left", "45px");
  logoTextTwo.style("color", "white");
  logoTextOne.style("color", "white");
  logoTextOne.parent("#LogoSketch");
  logoTextTwo.parent("#LogoSketch");
  logoImg.resize(0, 400);
  for (var x = 0; x < logoImg.width; x += scl) {
    for (var y = 0; y < logoImg.height; y += scl) {
      logop.push(new Ball(random(LogoCan.width), random(LogoCan.height)));
    }
  }

  strokeWeight(1);
  background(255);
  stroke(1, 17, 64);
}

function draw() {
  strokeWeight(0.1);
  if (!off) {
    Linner();
  }
  Con();

  /*----------------------P5Sketch--------------------*/
  pElement.addEventListener("mouseenter", function() {
    pSketchRun = true;
    firstTime = false;
    count = 0;
  });
  pElement.addEventListener("mouseout", function() {
    pSketchRun = false;
    firstTime = false;
    count = 0;
  });
  if (pSketchRun) {
    PCan.background(81, 63, 41);
    for (var y = 0; y < img.height; y += s) {
      for (var x = 0; x < img.width; x += s) {
        c = img.get(x, y);

        var nm = map(x, 0, img.width, 0, s * 10)
        var n = map(noise(frameCount * 0.01, x, y), 0, 1, -nm, nm);
        PCan.fill(c);
        PCan.noStroke();
        PCan.ellipse(x, y + n, s, s)
      }
    }
    if (firstTime) {
      count++;
    }
  }
  if (count > 10) {
    pSketchRun = false;
    firstTime = false;
  }
  if (off) {
    /*----------------------SoundSketch--------------------*/
    soundElement.addEventListener("mouseenter", function() {
      soundSketchRun = true;
      firstTime = false;
      count = 0;
    });
    soundElement.addEventListener("mouseout", function() {
      soundSketchRun = false;
      firstTime = false;
      count = 0;
    });
    if (soundSketchRun) {
      SoundCan.background(42, 40, 25);
      for (var y = 0; y < rows; y++) {
        SoundCan.beginShape();
        for (var x = 0; x < cols + 2; x++) {

          var dmap = map(x, 0, cols, 0, scl * 10);
          var n = map(noise(frameCount * 0.01, x * 0.1, y * 0.1), 0, 1, -dmap, dmap);

          var a = map(n, -dmap, dmap, 0, 255);
          SoundCan.stroke(156, 72, 48, a);
          SoundCan.noFill();
          SoundCan.curveVertex(x * scl, y * scl + n);
        }
        SoundCan.endShape();
      }
      SoundCan.tint(255, 150);
      SoundCan.image(img, 20, 0);
      if (firstTime) {
        count++;
      }
    }
    if (count > 10) {
      soundSketchRun = false;
      firstTime = false;
    }

    /*----------------------InfoSketch--------------------*/
    infoElement.addEventListener("mouseenter", function() {
      infoSketchRun = true;
      firstTime = false;
      count = 0;
    });
    infoElement.addEventListener("mouseout", function() {
      infoSketchRun = false;
      firstTime = false;
      count = 0;
    });
    if (infoSketchRun) {
      InfoCanInfoCan.background(156, 72, 48);


      var infoyoff = 0;
      for (var x = 0; x < infoImg.width; x += infoScl) {
        var infoxoff = 0;
        for (var y = 0; y < infoImg.height; y += infoScl) {
          var c = infoImg.get(x, y);
          var n = map(noise(infoxoff, infoyoff, infozoff), 0, 1, 0, infoScl * 2);
          81, 63, 41
          if (c[0] > 0 || c[1] > 0 || c[2] > 0) {
            var r = map(c[0], 0, 255, 0, 81);
            var g = map(c[1], 0, 255, 0, 63);
            var b = map(c[2], 0, 255, 0, 41);
            InfoCanInfoCan.fill(r, g, b);
            InfoCanInfoCan.noStroke();
            InfoCanInfoCan.ellipse(x, y, n, n);
            infoxoff += infoInc;
          }
          infoyoff += infoInc;
          infozoff += infozinc;
        }
      }
      if (firstTime) {
        count++;
      }
    }
    if (count > 10) {
      infoSketchRun = false;
      firstTime = false;
    }

    /*----------------------LogoSketch--------------------*/
    logoElement.addEventListener("mouseenter", function() {
      logoSketchRun = true;
      logofirstTime = false;
      logocount = 0;
    });
    logoElement.addEventListener("mouseout", function() {
      logoSketchRun = false;
      logofirstTime = false;
      logocount = 0;
    });
    if (logoSketchRun) {
      var logoyoff = 0;
      for (var y = 0; y < logoImg.width; y += scl) {
        var logoxoff = 0;
        for (var x = 0; x < logoImg.height; x += scl) {
          var n = map(noise(logoxoff, logoyoff, logozoff), 0, 1, -TWO_PI, TWO_PI);
          var v = p5.Vector.fromAngle(n);
          var index = x + y * cols;
          v.setMag(1);
          logofollow.push(v);
          // LogoCan.push();
          // LogoCan.translate(x * scl, y * scl);
          // LogoCan.rotate(v.heading());
          // LogoCan.stroke(255);
          // LogoCan.line(0, 0, scl, scl);
          // LogoCan.pop();
          logoxoff += logoinc;
        }
        logoyoff += logoinc;
        logozoff += logozinc;
      }
      for (b of logop) {
        b.calForce(logofollow);
        //p[x][y].drag(follow);
        b.physic();
        b.display();
        b.wall();
        b.posUpdate();
      }
      if (logofirstTime) {
        logocount++;
      }
    }
    if (logocount > 400) {
      logoSketchRun = false;
      logofirstTime = false;
    }
  }
}

function Linner() {

  if (kyeOne && kyeTwo) {
    line(tx, 0, width, ty);
    tx += inc;
    ty += inc;
  } else if (kyeOne && !kyeTwo) {
    line(tx, height, 0, ty);
    tx -= inc;
    ty -= inc;
    off = true;
  } else if (!kyeOne && !kyeTwo) {
    line(0, ty, tx, 0);
    tx += inc;
    ty -= inc;
    if (tx > width - 1) {
      kyeOne = true;
      kyeTwo = true;
      tx = 0;
      ty = 0;
    }
  } else if (!kyeOne && kyeTwo) {
    line(width, ty, tx, height);
    tx -= inc;
    ty += inc;
  }
}

function Con() {

  if (ty > height && tx < 0) {
    kyeOne = true;
    kyeTwo = false;
    tx = width;
    ty = height;
  } else if (tx < 0) {
    kyeOne = false;
    kyeTwo = false;
    tx = 0;
    ty = height;
  } else if (tx >= width) {
    kyeOne = false;
    kyeTwo = true;
    tx = width;
    ty = 0;
  }
  if (ty > height / 2 && tx < 1) {
    off = true;
  }

}