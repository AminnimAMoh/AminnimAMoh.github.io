function Steer(x, y) {
  this.pos = createVector(x, y);
  this.target = createVector(x, y);
  this.vel = createVector();
  this.acc = createVector();

  var maxDis = 20;
  var maxSpeed = 3;
  var c = 2;
  var m = 0;
  var i = 0;
  var sum = 0;
  var a = 0;
  var mySwitch = true;
  var startPoint;
  var round = 0;
  var mousePos;

  this.run = function() {
    this.beh();
    this.physic();
  }
  this.beh = function() {
    for (var i = 0; i < att.length; i++) {
      var at = this.attract(att[i], avarage[i], cName[i], i);
    }
    var s = this.steer();
    this.addForce(s);
  }

  this.addForce = function(force) {
    this.acc.add(force);
  }

  this.physic = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(maxSpeed);
    this.acc.mult(0);
  }

  this.steer = function() {
    var dr = p5.Vector.sub(this.target, this.pos);
    var d = dr.mag();
    var dm = map(d, 0, maxDis, 0, maxSpeed);
    dr.setMag(dm);
    var vm = p5.Vector.sub(dr, this.vel);
    vm.limit(maxSpeed);
    return vm;
  }

  this.attract = function(attractPoint, av, name, index) {
    var scl = 90;
    var xMap = map(this.pos.x, 0, cols, attractPoint.x - 10, attractPoint.x + 10);
    var yMap = map(this.pos.y, 0, rows, attractPoint.y - 10, attractPoint.y + 10);
    var newPos = createVector(xMap, yMap);
    var dr = p5.Vector.sub(newPos, attractPoint);
    var d = dr.mag();
    if (d < maxDis && frameCount % 50 > 30 && frameCount % 50 < 60) {
      // console.log(d)
      var gForce = map(d, 0, maxDis, 10, 0)
      d = constrain(d, 1, 3);
      var g = gForce / (d * d);
      dr.setMag(g)
      this.acc.add(dr)
    }
    if (attractPoint && name && av) {
      var testPos = createVector(xMap, yMap);
      mousePos = createVector((mouseSet.x - width / 2) - attractPoint.x, (mouseSet.y - height / 2) - attractPoint.y);
      var mr = p5.Vector.sub(this.pos, mousePos);
      var md = mr.mag();

      push();
      translate(attractPoint.x, attractPoint.y)
      if (md < 10) {
        strokeWeight(6)
      } else {
        strokeWeight(1)
      }
      var cMap = map(av, 0, 20, 0, 255)
      stroke(cMap, 0, 0)
      point(0, 0)

      var v = this.vel.mag();
      var sMap = map(v, 0, maxSpeed, 0, 255)
      var rMap = map(av, 0, 20, 1, 6)
      var dMap = map(d, -maxDis, maxDis, 0, rMap)
      fill(10, 100, 255, sMap);
      noStroke();
      var newX = map(this.pos.x, 0, cols, -10, 10)
      var newY = map(this.pos.y, 0, rows, -10, 10)
      ellipse(newX, newY, dMap, dMap);
      pop();
      var start = 0;

      /*----------------------MouseSelect----------------------*/

      /*----------------------MouseSelect----------------------*/

      if (md < 10) {
        readCityAve = false;
        att.splice(0, index)
        att.splice(index + 1, att.length)
        avarage.splice(0, index)
        avarage.splice(index + 1, avarage.length)
        cName.splice(0, index)
        cName.splice(index + 1, cName.length)
        var newIndex = index * 12;
        cityAve.splice(0, newIndex)
        cityAve.splice(newIndex + 12, cityAve.length)

        push();
        translate(350, -125)
        textAlign(CENTER)
        beginShape();
        for (var q = 0; q < 12; q++) {
          var newAva = cityAve[q]
          if (newAva) {
            noStroke()
            fill(255)
            textSize(32)
            text(newAva[1], 0, -170)
            var r = 12.5;
            var angle = map(q, 0, 12, 0, TWO_PI);
            var x = (r + newAva[0]) * cos(angle)
            var y = (r + newAva[0]) * sin(angle)
            stroke(255)
            strokeWeight(0.5)
            fill(255, 0, 0, 100)
            vertex(x, y)
          }
        }
        endShape(CLOSE)

        for (var i = 0; i < threeYearsAva.length; i++) {
          if (threeYearsAva[i][0] == name) {
            noStroke();
            textSize(12)
            fill(255)
            var x = 210;
            if (threeYearsAva[i][1] == 1991) {
              var y = 110;
              text(threeYearsAva[i][3], x + 50, 75)
            } else if (threeYearsAva[i][1] == 2001) {
              var y = 0;
              text(threeYearsAva[i][3], x + 50, -35)
            } else if (threeYearsAva[i][1] == 2011) {
              var y = -110;
              text(threeYearsAva[i][3], x + 50, -145)
            }
            fill(255, 0, 0, 100)
            ellipse(x, y, threeYearsAva[i][2])
          }
        }
        pop()

        push()
        translate(350, 180)
        for (var j = 1; j < 4; j++) {
          beginShape();
          for (var i = 0; i < pPop.length; i++) {
            var popName = pPop[i][0]
            var populationList = pPop[i][j];
            var angle = map(i, 0, pPop.length, 0, TWO_PI);
            var arcAng = map(populationList, 200000, 12043980, 0, TWO_PI - 0.1);
            var x = map(j, 1, 4, -200, 380)
            var r = map(i, 0, pPop.length, 160, 20)
            if (popName == name) {
              noStroke();
              fill(255)
              text(nfc(pPop[i][3]), 200, -10)
              text(nfc(pPop[i][2]), 20, -10)
              text(nfc(pPop[i][1]), -180, -10)
              strokeWeight(3)
              stroke(255, 0, 0)
            } else if (popName == "slum") {
              var arcAng = map(populationList, 90000000, 102370207, 0, TWO_PI - 0.1);
              var x = map(j, 1, 4, -200, 380)
              var r = map(i, 0, pPop.length, 180, 20)
              strokeWeight(1)
              var newIndex = floor(map(j, 1, 3, 4, 6))
              noStroke()
              fill(0, 100, 255)
              text("%" + pPop[i][newIndex], x + r / 3, -r / 2)
              stroke(0, 100, 255)
            } else if (popName == "slum1") {
              var arcAng = map(populationList, 90000000, 102370207, 0, TWO_PI - 0.1);
              var x = map(j, 1, 4, -200, 380)
              var r = map(i, 0, pPop.length, 190, 20)
              strokeWeight(1)
              var newIndex = floor(map(j, 1, 3, 4, 6))
              noStroke()
              fill(0, 200, 255)
              text("%" + pPop[i][newIndex], x + r / 2.5, -r / 2.5)
              stroke(0, 200, 255)
            } else {
              strokeWeight(1)
              stroke(150)
            }
            noFill();
            arc(x, 0, r, r, 0, arcAng)
          }
        }
        pop()
      } else {
        readDataAgain = true;
        readCityAve = true;
      }
    }
  }
}