var aInc = 0.03;
var r = 0;
var yTwo = 0;
var sliderSpeed;
var Can;
var resetB = true;
var na = 0;
var y = 0;
var x = 0;

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}
function setup() {
  Can = createCanvas(windowWidth, windowHeight);
  Can.position(0, 0);
  Can.background(0);
  Can.style('z-index', '-1');
  background(0);
}

function reset() {
  aInc = 0.03;
  r = 0;
  yTwo = 0;
  resetB = true;
  na = 0;
  y = height;
  x = 0;
  redraw();
  background(0);
}

function draw() {
  // if (frameCount%500==0){
  //   background(0,24);
  // }
  var speed = speedS.value;
  var rc = rS.value;
  var gc = gS.value;
  var bc = bS.value;
  var w = wS.value;
  var stSize = sS.value;
  resetB = br.value;

  var wMap=map(w,1,100,10,width);
  beginShape();
  y = height;
  var yoff = 0;
  var count=0;

  for (var i = 0; i < height; i += 100) {
    var a = map(i, 0, height, -TWO_PI, TWO_PI);
    na = map(noise(cos(frameCount * speed), sin(yoff)), -1, 1, -TWO_PI, TWO_PI);
    r = map(na, -TWO_PI, TWO_PI, -wMap, wMap);
    x = width / 2 + r * cos(a * na);
    y =i;
    noFill();
    stroke(rc, gc, bc, 12);
    strokeWeight(stSize);
    curveVertex(x, y);
    yoff += 0.1;
  }
  endShape();
  if (resetB == "false") {
    document.getElementById("br").value = "true";
    reset();
  }
}
function keyPressed(){
  if (keyCode==32){
    noLoop();
  }
}
