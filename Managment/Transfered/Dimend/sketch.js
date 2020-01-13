var p = [];
var xinc = 0;
var yinc = 0;
var speed = 1;
var back = 100;
var st = 255;
var Can;
var rc = 10;
var gc = 10;
var bc = 10;
var th = .1;

function centerCan() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  Can.position(x, y);
}

function setup() {
  Can = createCanvas(600, 300);
  Can.id("pCan");
  colorMode(HSB, 255);
  centerCan();
  var x = 0;
  var y = 0;
  for (var i = 0; i < 12; i++) {
    if (i < 4) {
      xinc = speed;
      yinc = speed;
    } else if (i < 8) {
      xinc = speed / 2;
      yinc = speed / 2;
    } else {
      xinc = speed * 2;
      yinc = speed * 2;
    }
    if (i == 0 || i == 4 || i == 8) {
      x = width;
      y = height;
    } else if (i == 1 || i == 5 || i == 9) {
      x = 0;
      y = 0;
    } else if (i == 2 || i == 6 || i == 10) {
      x = width;
      y = 0;
    } else if (i == 3 || i == 7 || i == 11) {
      x = 0;
      y = height;
    }
    p[i] = new Runner(x, y, xinc, yinc);
  }
  background(0);
}

function windowResized() {
  centerCan();
}

function draw() {
  background(0, int(op.value));
  // console.log(op.value);

  // rc = int(redC.value);
  // gc = int(greenC.value);
  // bc = int(blueC.value);
  // th = float(thick.value);
  for (var h of p) {
    h.run();
  }
}

function Runner(x, y, xi, yi) {
  this.x = x;
  this.y = y;
  this.xTaskP = false;
  this.yTaskP = false;
  this.incy = xi;
  this.incx = yi;

  this.run = function() {
    this.con();
    this.update();
    this.display();
  }

  this.display = function() {
    strokeWeight(th);
    stroke(map(mouseY, 0, height, 0, 255), 255, 255);
    line(this.x, height / 2, width / 2, this.y);
  }

  this.update = function() {
    this.x += this.incx * map(mouseX, 0, width, -2, 2);
    this.y += this.incy * map(mouseX, 0, width, -2, 2);
  }

  this.con = function() {
    if (this.y < 0) {
      this.incy *= -1;
    }
    if (this.x > width) {
      this.incx *= -1;
    }
    if (this.y > height) {
      this.incy *= -1;
    }
    if (this.x < 0) {
      this.incx *= -1;
    }
    if (this.x < 0 && this.y < 50) {
      this.xTaskP = true;
    }
  }
}