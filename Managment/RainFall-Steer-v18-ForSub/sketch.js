let img;
var clat = 0;
var clon = 0;
var lon = 0;
var lat = 0;
var zoom = 6.2;
/*----------------------CitiesVar----------------------*/
var yearD;
var mounthOut = 0;
var yarOut = 0;
var yearCount = 1;
var avarage = [];
var cityAve = [];
var threeYearsAva = [];
var cName = [];
var mounth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/*----------------------DataArray----------------------*/
var cities;
var river;
var shape;
var population;
/*----------------------DataArray----------------------*/
var importedData = [];
var nextYear = 0;
var p = [];
var sh = [];
var count = 1;
/*----------------------InteractionVariabls----------------------*/
var changeAllow = false;
var mouse = true;
var dataSelector;
var dataSelected;
var yearSelect;
var dataSelect = "Cities";
/*----------------------OverseasVariabls----------------------*/
let boundary;
let city_limit;
let padding = 20;
/*----------------------SteerVariabls----------------------*/
let st = [];
var cols, rows;
var att = [];
var count = 1;
var graphAllow = false;
var mouseSet;
var pPop = [];
var pCityName = [];
var readDataAgain = false;
var readCityAve = true;
var readCityPop = true;

var font;
/*----------------------Canvases----------------------*/
let CanOne;
let mapString = "https://api.mapbox.com/styles/v1/mohammadaminm30/cjw1ycdic0rnp1cmvgem7wirf/static/92.3811,24.0349,6.24,0,0/1280x720?access_token=pk.eyJ1IjoibW9oYW1tYWRhbWlubTMwIiwiYSI6ImNqc3ppd2hvMTBvNTM0M3A1czBzbDI5cHYifQ.ZbwGr9yrBtr0vKwySAp1tQ";

function preload() {
  img = loadImage(mapString);

  cities = loadStrings("data/Rain1990.csv");
  font = loadFont("data/Amiri-Regular.ttf")
  population = loadStrings("data/PThreeYears.csv")
}



function setup() {

  Can = createCanvas(1280, 720);
  Can.id('myCan');
  Can.parent("canTest");

  textFont(font)

  /*----------------------DataSelect----------------------*/

  /*----------------------yearSelect----------------------*/
  yearSelect = createSelect();
  yearSelect.parent("canTest");
  yearSelect.id("canSelector")
  // yearSelect.position("reletive", width / 2 + 80, 12.5);
  yearSelect.option("Select Year");

  for (var i = 1; i < cities.length - 1; i += 12) {
    dataPast = cities[i - 1].split(/,/);
    data = cities[i].split(/,/);
    if (int(data[1]) != dataPast[1]) {
      yearSelect.option(data[1])
    }
  }

  mouseSet = createVector();

  /*----------------------SteerGrid----------------------*/
  cols = 10;
  rows = 10;
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      st.push(new Steer(x, y));
    }
  }
}


function draw() {
  image(img, 0, 0, width, height);
  translate(width / 2, height / 2);
  switch (dataSelect) {
    case ("Cities"):
      dataSelected = cities;
      graphAllow = true;
      stroke(100)
      fill(0, 220)
      rect(50, -height / 2, width, height)
      push()
      translate(350, -160)
      noFill();
      stroke(255);
      strokeWeight(2)
      ellipse(0, 35, 260);
      strokeWeight(0.5)
      text("2000mm", 0, -63)
      ellipse(0, 35, 190);
      text("1000mm", 0, -13)
      ellipse(0, 35, 92);
      text("0mm", 0, 20.5)
      ellipse(0, 35, 25);
      for (var i = 0; i < mounth.length; i++) {
        textAlign(CENTER)
        noStroke();
        fill(255)
        var an = map(i, 0, mounth.length, 0, TWO_PI)
        var x = 150 * cos(an)
        var y = 40 + 150 * sin(an)
        text(mounth[i], x, y)
      }
      text("1991 Total: ", 210, 110)
      text("2001 Total: ", 210, 0)
      text("2011 Total: ", 210, -110)
      noStroke();
      fill(255);
      textSize(42)
      text(yarOut, 100, -165)
      textSize(18)
      text("Monthly Rainfall: ", -30, -170)

      textSize(24)
      text("Population Change During Three Decade", 0, 225)
      pop()
      push()
      translate(350, 180)
      textSize(22)
      noStroke();
      fill(255)
      text("2011", 170, 120)
      text("2001", -25, 120)
      text("1991", -225, 120)
      textSize(12)
      text("Total Population: 153.9 million", 110, 135)
      text("Total Population: 134.1 million", -80, 135)
      text("Total Population: 108.7 million", -280, 135)
      noFill()
      stroke(255)
      ellipse(186, 0, 165)
      ellipse(-6, 0, 165)
      ellipse(-200, 0, 165)

      noStroke()
      textSize(12)
      fill(0, 100, 255)
      rect(120, 150, 10, 10)
      fill(255)
      text("Slum 2007", 135, 158)
      fill(0, 200, 255)
      rect(200, 150, 10, 10)
      fill(255)
      text("Slum 2009", 215, 158)
      textSize(10)
      text("(92,680,100, 102,370,207) Person", 120, 170)

      textSize(12)
      fill(0, 100, 255)
      rect(-75, 150, 10, 10)
      fill(255)
      text("Slum 2000", -60, 158)
      fill(0, 200, 255)
      rect(5, 150, 10, 10)
      fill(255)
      text("Slum 2005", 20, 158)
      textSize(10)
      text("(92,680,100, 102,370,207) Person", -75, 170)

      textSize(12)
      fill(0, 100, 255)
      rect(-275, 150, 10, 10)
      fill(255)
      text("Slum 1990", -260, 158)
      fill(0, 200, 255)
      rect(-195, 150, 10, 10)
      fill(255)
      text("Slum 1995", -180, 158)
      textSize(10)
      text("(92,680,100, 102,370,207) Person", -275, 170)
      pop()
      break;
  }

  var sum = 0;
  var con = 0;
  if (dataSelect == "Cities") {
    for (var b of st) {
      b.run();
    }
  }
  yearSelect.changed(myEvent)
}

function mousePressed() {
  var dr = mouseX - 150;
  if (mouse && dr > 0) {
    image(img, -width / 2, -height / 2, width, height);
    p.splice(0, p.length);
  }
  mouseSet = createVector(mouseX, mouseY)
  if (readDataAgain) {
    Cities();
  }
}

function myEvent() {
  yearD = yearSelect.value();
  p.splice(0, p.length);
  att.splice(0, att.length)
  avarage.splice(0, avarage.length)
  cName.splice(0, cName.length)
  cityAve.splice(0, cityAve.length)
  threeYearsAva.splice(0, cityAve.length)

  if (dataSelect == "Cities") {
    Cities();
  }
}

function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}