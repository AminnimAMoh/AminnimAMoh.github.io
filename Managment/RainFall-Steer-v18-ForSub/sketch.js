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
let Can;
let YearCircleCan;
let PopCanOne;
let PopCanTwo;
let PopCanThree;
let CanLocation;
let setCanDone = true;
let mapString = "https://api.mapbox.com/styles/v1/mohammadaminm30/cjw1ycdic0rnp1cmvgem7wirf/static/90.3811,23.5349,6.24,0,0/640x720?access_token=pk.eyJ1IjoibW9oYW1tYWRhbWlubTMwIiwiYSI6ImNqc3ppd2hvMTBvNTM0M3A1czBzbDI5cHYifQ.ZbwGr9yrBtr0vKwySAp1tQ";

function preload() {
  img = loadImage(mapString);

  cities = loadStrings("data/Rain1990.csv");
  font = loadFont("data/Amiri-Regular.ttf")
  population = loadStrings("data/PThreeYears.csv")
}

function windowResized() {
  mapSize();
}

function setup() {

  Can = createCanvas(640, 720);
  Can.id('myCan');
  Can.parent("canTest");
  setAllCanvas();

  textFont(font)

  /*----------------------DataSelect----------------------*/

  /*----------------------yearSelect----------------------*/
  yearSelect = createSelect();
  yearSelect.parent("canSelector");
  yearSelect.id("slectorCSS");
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
  dataSelected = cities;
  mapSize();
}


function mapSize() {
  var ele = document.getElementById("canTest");
  var x = ele.offsetWidth;
  var y = ele.offsetHeight;
  zoom = map(x, 0, 720, 4, 6.2);
  if (dataSelect == "Cities") {
    Cities();
  }
  mapString = "https://api.mapbox.com/styles/v1/mohammadaminm30/cjw1ycdic0rnp1cmvgem7wirf/static/90.3563,23.6850," + zoom + ",0,0/" + x + "x" + y + "?access_token=pk.eyJ1IjoibW9oYW1tYWRhbWlubTMwIiwiYSI6ImNqc3ppd2hvMTBvNTM0M3A1czBzbDI5cHYifQ.ZbwGr9yrBtr0vKwySAp1tQ";
  img = loadImage(mapString);
  console.log(mapString)
  Can = createCanvas(x, y);
  myEvent();
  setAllCanvas();
}

function setAllCanvas() {
  if (setCanDone) {
    var yearCan = document.getElementById("YearCircle");
    var x = yearCan.offsetWidth;
    var y = yearCan.offsetHeight;
    YearCircleCan = createGraphics(x, y);
    YearCircleCan.parent("#YearCircle");
    YearCircleCan.style("display", "block");
    YearCircleCan.smooth();

    var popCan = document.getElementById("Population1991");
    var xp = popCan.offsetWidth;
    var yp = popCan.offsetHeight;
    PopCanOne = createGraphics(xp, yp);
    PopCanOne.parent("#Population1991");
    PopCanOne.background(0);
    PopCanOne.style("display", "block");
    PopCanOne.smooth();

    var popCanTwo = document.getElementById("Population2001");
    var xpp = popCanTwo.offsetWidth;
    var ypp = popCanTwo.offsetHeight;
    PopCanTwo = createGraphics(xpp, ypp);
    PopCanTwo.parent("#Population2001");
    PopCanTwo.background(0);
    PopCanTwo.style("display", "block");
    PopCanTwo.smooth();

    var popCanThree = document.getElementById("Population2011");
    var xppp = popCanThree.offsetWidth;
    var yppp = popCanThree.offsetHeight;
    PopCanThree = createGraphics(xppp, yppp);
    PopCanThree.parent("#Population2011");
    PopCanThree.background(0);
    PopCanThree.style("display", "block");
    PopCanThree.smooth();
  }
  setCanDone = false;
}

function draw() {
  YearCircleCan.background(233);
  PopCanOne.background(233);
  PopCanTwo.background(233);
  PopCanThree.background(233);
  var mapEle = document.getElementById("canTest");
  var xMap = mapEle.offsetWidth;
  var yMap = mapEle.offsetHeight;
  image(img, 0, 0, xMap, yMap);
  translate(width / 2, height / 2);
  switch (dataSelect) {
    case ("Cities"):
      dataSelected = cities;
      graphAllow = true;

      YearCircleCan.push()
      YearCircleCan.translate(YearCircleCan.width / 2, YearCircleCan.height / 2)
      YearCircleCan.noStroke();
      YearCircleCan.fill(0);
      YearCircleCan.text("2000mm", 0, -43)
      YearCircleCan.text("1000mm", 0, -15)
      YearCircleCan.text("0mm", 0, 30)
      YearCircleCan.noFill();
      YearCircleCan.stroke(0);
      YearCircleCan.strokeWeight(2)
      YearCircleCan.ellipse(0, 35, 140);
      YearCircleCan.strokeWeight(1)
      YearCircleCan.ellipse(0, 35, 100);
      YearCircleCan.ellipse(0, 35, 32);
      YearCircleCan.ellipse(0, 35, 5);
      for (var i = 0; i < mounth.length; i++) {
        YearCircleCan.textAlign(CENTER)
        YearCircleCan.noStroke();
        YearCircleCan.fill(0)
        var an = map(i, 0, mounth.length, 0, TWO_PI)
        var x = 100 * cos(an)
        var y = 40 + 100 * sin(an)

        YearCircleCan.text(mounth[i], x, y)

      }

      YearCircleCan.noStroke();
      YearCircleCan.fill(0);
      YearCircleCan.textSize(22)
      YearCircleCan.text(yarOut, 100, -90)
      YearCircleCan.textSize(18)
      YearCircleCan.text("Monthly Rainfall: ", 0, -90)
      YearCircleCan.pop();

      let SlumYearOne;
      let SlumYearTwo;
      let SlumPopOne;
      let SlumPopTwo;
      let TotalPop;
      let SlumYear;

      for (var j = 0; j < 3; j++) {

        if (j == 0) {
          CanLocation = PopCanOne;
          SlumYearOne = "1990";
          SlumYearTwo = "1995";
          SlumPopOne = "92,680,100";
          SlumPopTwo = "102,370,207";
          TotalPop = "108.7";
          SlumYear = "1991";
        } else if (j == 1) {
          CanLocation = PopCanTwo;
          SlumYearOne = "2000";
          SlumYearTwo = "2005";
          SlumPopOne = "92,680,100";
          SlumPopTwo = "102,370,207";
          TotalPop = "108.7";
          SlumYear = "2001";
        } else if (j == 2) {
          CanLocation = PopCanThree;
          SlumYearOne = "2007";
          SlumYearTwo = "2009";
          SlumPopOne = "92,680,100";
          SlumPopTwo = "102,370,207";
          TotalPop = "108.7";
          SlumYear = "2011";
        }

        CanLocation.push();
        CanLocation.translate(PopCanOne.width / 2, PopCanOne.height / 2);
        CanLocation.textSize(16)
        CanLocation.noStroke();
        CanLocation.fill(0)
        CanLocation.text(SlumYear, -20, 20)
        CanLocation.textSize(12)
        CanLocation.text("Total Population: " + TotalPop + " million", -80, 40)
        CanLocation.noFill();
        CanLocation.stroke(0);
        CanLocation.ellipse(0, -55, 100);

        CanLocation.textSize(12)
        CanLocation.fill(0)
        CanLocation.text("Slum " + SlumYearOne, -75, 69)
        CanLocation.fill(0)
        CanLocation.text("Slum " + SlumYearTwo, 25, 69)
        CanLocation.textSize(12)
        CanLocation.text("(" + SlumPopOne + " , " + SlumPopTwo + ") Person", -95, 100)
        CanLocation.pop();
      }
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