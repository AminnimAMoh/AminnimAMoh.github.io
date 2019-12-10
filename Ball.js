function Ball(x_, y_) {
  this.pos = createVector(x_, y_);
  this.lpos = createVector(x_, y_);
  this.val = createVector();
  this.acc = createVector();

  this.display = function() {
    var c = logoImg.get(this.pos.x, this.pos.y)
    var r = map(c[0], 0, 255, 0, 156);
    var g = map(c[1], 0, 255, 0, 72);
    var b = map(c[2], 0, 255, 0, 48);
    LogoCan.stroke(r, g, b, c[3]);
    LogoCan.strokeWeight(1);
    LogoCan.line(this.pos.x, this.pos.y, this.lpos.x, this.lpos.y);
  }
  this.posUpdate = function() {
    this.lpos.x = this.pos.x;
    this.lpos.y = this.pos.y;
  }

  this.drag = function(f) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = f[index];
    var dr = this.val.copy();
    var d = dr.magSq();
    var fh = force.heading() * .5;
    var fd = force.magSq();
    dr.setMag(-0.5 * 9.4 * d * 0.1 * fd * fh);
    applyForce(dr);
  }

  this.physic = function() {
    this.pos.add(this.val);
    this.val.add(this.acc);
    this.val.limit(3);
    this.acc.mult(0);
  }

  this.calForce = function(f) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = f[index];
    this.applyForce(force);
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.wall = function() {
    // if (this.pos.x >= LogoCan.width - scl || this.pos.x <= scl) {
    //   this.pos.x = random(LogoCan.width - scl);
    //   this.pos.y = random(LogoCan.height - scl);
    // } else if (this.pos.y >= LogoCan.height - scl || this.pos.y <= scl) {
    //   this.pos.x = random(LogoCan.width - scl);
    //   this.pos.y = random(LogoCan.height - scl);
    // }
    if (this.pos.x > logoImg.width - scl) {
      this.pos.x = scl;
    } else if (this.pos.x < scl) {
      this.pos.x = logoImg.width - scl;
    }
    if (this.pos.y > logoImg.height - scl) {
      this.pos.y = scl;
    } else if (this.pos.y < scl) {
      this.pos.y = logoImg.height - scl;
    }
  }
}