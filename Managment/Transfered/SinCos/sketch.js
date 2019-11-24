var a = 0;
var x;
var y;
var x2;
var y2;
var t = 0.01;
var v1 = 0.3;
var inc = 1;
var Can;
var el;

function centerCan() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  Can.position(x, y);
}

function setup() {
  Can = createCanvas(800, 800);
  Can.id("pCan");
  centerCan();

  colorMode(HSB, 255);
  v1 += random(0.4) + 0.2;
  smooth();
  background(0);
  var breaker = createElement('br', " ");
  breaker.parent("ToolBox")
  el = createElement('h5', nf(v1, 1, 3));
  el.parent("ToolBox");

}

function windowResized() {
  centerCan();
}

function draw() {
  background(0, 24);
  v1 = float(redC.value);

  translate(width / 2, height / 2);
  a += 0.01;
  //rotate(sin(a));


  for (var i = 0; i < 180; i++) {
    beginShape();
    x = (sin(
        (t + i) / 10) * 100) +
      (cos((t + i) / v1) * 100);
    y = (cos(
        (t + i) / 10) * 100) +
      (sin(
        (t + i) / v1) * 100);
    x2 = (sin(
        (t + i) / 10) * 10) +
      (cos((t + i) / v1) * 100);
    y2 = (cos(
        (t + i) / 10) * 10) +
      (sin(
        (t + i) / v1) * 100);

    var HueMap = map(x, -width / 2, width / 2, 0, 255);
    var SatMap = map(y, -height / 2, height / 2, 255, 0);


    stroke(HueMap, SatMap, 255);
    strokeWeight(0.2);
    noFill();

    bezier(0, 0,
      x * inc, y * inc,
      x2 * inc, y2 * inc,
      x / inc, y / inc,
    );

    endShape(CLOSE);
  }

  t += 0.01;
}

function mouseDragged() {
  el.remove();
  el = createElement('h5', nf(v1, 1, 3));
  el.parent("ToolBox");
}

function mousePressed() {
  el.remove();
  el = createElement('h5', nf(v1, 1, 3));
  el.parent("ToolBox");
}