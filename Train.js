function Train(x, y) {
  this.pos = createVector(x, y);
  this.vel = createVector();
  this.acc = createVector();

  this.run = function() {
    if (forceOn) {
      this.calForce();
    }
    this.physic();
    this.display();
    // this.wall();
  }
  this.calForce = function() {
    if (mouseIsPressed) {
      var dr = p5.Vector.sub(myMouse, this.pos);
      var d = dr.mag();
      d = constrain(d, 0.1, 1)
      var g = 1 / (d * d);
      dr.setMag(-g);
      this.acc.add(dr);
    }
  }
  this.physic = function() {
    this.vel.add(this.acc);
    this.vel.limit(20);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  this.display = function() {
    IntCan.noStroke();
    IntCan.fill(185, 134, 113);
    IntCan.rect(this.pos.x, this.pos.y, intscl, intscl);
  }
  this.wall = function() {
    var x = floor(this.pos.x / intscl);
    var y = floor(this.pos.y / intscl);
    var index = floor(x + y * intcols);
    if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
      intp.splice(index, 1);
    }
  }
}