function Train(x_, y_, c) {
  this.pos = createVector(x_, y_);
  this.target = createVector(x_, y_);
  this.vel = createVector();
  this.acc = createVector();
  this.col = c;

  var maxSpeed = 20;
  var maxDis = 110;
  var sInc = 3;
  var dm = 0;

  this.posSet= function(){
    this.pos = createVector(width/2+x_, height/2+y_);
    this.target = createVector(width/2+x_, height/2+y_);
  }
  this.beh = function(sp) {
    var st = this.steer();
    this.applyForce(st);

    for (var i = 0; i < levelVects.length; i++) {
      var at = this.att(levelVects[i], sp);
      this.applyForce(at);
    }
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.steer = function() {
    var dr = p5.Vector.sub(this.target, this.pos);
    var d = dr.mag();
    var dm = map(d, 0, 100, 0, maxSpeed);
    dr.setMag(dm);
    var vr = p5.Vector.sub(dr, this.vel);
    vr.limit(maxSpeed);
    return vr;
  }

  this.att = function(l) {
    if (sound.isPlaying()){
      maxDis=110;
    }else{
      maxDis=-1;
    }
    if (testTrack && sound.isLoaded() == false) {
      var dr = p5.Vector.sub(this.pos, 0);
    } else {
      var dr = p5.Vector.sub(this.pos, l);
    }
    var d = dr.mag();
    var dg = map(d, 0, maxDis, 20, 0);
    if (d < maxDis) {
      d = constrain(d, 0.1, 1);
      var grav = dg / (d * d);
      dr.setMag(grav);
      return dr;
    }
  }

  this.physic = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(maxSpeed);
    this.acc.mult(0);
  }

  this.display = function(a,s) {
    var dr = p5.Vector.sub(this.target, this.pos);
    var d = dr.mag();
    if (testTrack && sound.isLoaded() == false) {
      dm = random(0,2);
    } else {
      dm = map(d, 0, maxDis, 4, 0);
    }
    var cm = map(d, 0, maxSpeed, 0, 255);
    fill(200,25,s);
    //ill(this.col[0], this.col[1], this.col[2]);
    noStroke();
    rect(this.pos.x , this.pos.y , dm+bMap, dm+bMap);
  }
}
