var p = [];
var m;
var Can;
var r, g, b, alph = 0;

function centerCan() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  Can.position(x, y);
}

function setup() {
  Can = createCanvas(600, 600);
  Can.id("pCan");
  centerCan();
  background(0);
  var rTwo = 180;
  for (var c = 0; c < 4; c++) {
    for (var i = 0; i < TWO_PI; i += 0.01) {
      var r = 200;
      p.push(new Ball(i, r, rTwo));
      rTwo -= 20;
    }
  }
  background(0);
}

function windowResized() {
  centerCan();
}

function draw() {
  background(0, int(CanD.value));
  m = map(mouseX, 0, width, 0.1, 2);
  if (mouseIsPressed) {
    fill(255);
    noStroke();
    text(nf(m, 1, 3), mouseX + 10, mouseY);
  }
  for (var ball of p) {
    ball.update();
    ball.display();
  }
  r = int(redC.value);
  g = int(greenC.value);
  b = int(blueC.value);
  alph = int(pd.value);
  //noLoop();
}

function Ball(a, r) {

  this.r = r;
  this.a = a;
  this.x = width / 2 + this.r * cos(this.a);
  this.y = height / 2 + this.r * sin(this.a);
  this.xSub = width / 2 + this.r * cos(this.a);
  this.ySub = height / 2 + this.r * sin(this.a);

  var re = 1;
  this.display = function() {
    beginShape(POINTS);
    stroke(r, g, b, alph);
    noFill();
    strokeWeight(1);
    // curveVertex(this.xSub,this.ySub);
    curveVertex(this.x, this.y);
    endShape();
  }

  this.update = function() {
    this.r -= map(noise(frameCount), 0, 1, 0.01, 0.8) * re;
    var n = map(noise(cos(frameCount * 0.0001), sin(this.a), this.r * 0.01), -1, 1, -100, 100);
    this.x = width / 2 + this.r * cos(this.a) + n;
    this.y = height / 2 + this.r * sin(this.a) + n;
    if (this.r < 0) {
      re *= -1;
    } else if (this.r > 200) {
      re *= -1;
    }
  }
}