let colors = [];
let a = [];
let specrtom = [
  "red",
  "green",
  "blue",
  "white"
];
var specCount = 0;
var index = 0;
let countArray = [0, 0, 0, 0, 0, 0, 0];
let colorArray = [];
let tagArray = [];
let img;
let imgPV;
var minIndex, maxIndex = 0;
var scl = 15;
var cols, rows;
var answerCount = 0;
var count = 0;
var tresureHold = 60;
var bright = 170;
var detail = false;
var error = 30;
var err = 0;
var acceptedVal = 60;
var allowedDist = 100;
var imageSourceIndex = 8;
let ColorCan;
let ImageCont;
let imageLoaded = false;
let hasNotSetup = true;
let dragedFile;
let finished = false;
let firstLoad = true;
let textIsNotPrinted = true;
//What left to do?
//-Add a way to convert RGB to Hex
//-Add a slider for brightness
//-Add a way to limit numbers of answers


function gotFile(file) {
  dragedFile = file;
  img = loadImage(file.data);
  imgPV = loadImage(file.data);
  imageLoaded = true;
  frameCount = 0;
}

function windowResized() {
  var ColorCanElement = document.getElementById("canvas-drop");
  var colorElement = document.getElementById("colors-info");
  resizeCanvas(ColorCanElement.offsetWidth, ColorCanElement.offsetHeight);
  ImageCont.resizeCanvas(ColorCanElement.offsetWidth, 100);
  ColorCan.background(0, 120);
  ImageCont.background(0, 120);
}

function setup() {
  if (firstLoad) {
    var ColorCanElement = document.getElementById("canvas-drop");
    var colorElement = document.getElementById("colors-info");
    ColorCan = createCanvas(ColorCanElement.offsetWidth, ColorCanElement.offsetHeight);
    ColorCan.parent(ColorCanElement);
    ColorCan.position(0, 0);
    ColorCan.id("main-ColorCan");
    ColorCan.background(0, 120);
    ImageCont = createGraphics(width, 100);
    ImageCont.parent(colorElement);
    ImageCont.style("display", "block");
    ImageCont.id("info-ColorCan");
    ImageCont.background(0, 120);
    firstLoad = false;
  }
  ColorCan.drop(gotFile);
  noStroke();
  fill(255);
  if (textIsNotPrinted) {
    var textLength = textWidth("Please drag and drop your image here");
    text("Please drag and drop your image here", ColorCan.width / 2 - textLength / 2, ColorCan.height / 2);
    textFont("imported-Azo-Medium");
    textIsNotPrinted = false;
  }
  cols = floor(width / scl);
  rows = floor(height / scl);
  if (imageLoaded && frameCount > 100) {
    imgPV.resize(width, height);
    img.resize(cols, 0);
    image(img, 0, 0);
    var c = 0;
    for (var x = 0; x < cols; x++) {
      for (var y = 0; y < rows; y++) {
        let pointColor = get(x, y);
        colors.push(new ColorList(pointColor, x * scl, y * scl));
      }
    }
    var distSingle = 0;
    var addAll = 0;
    var conuter = 0;
    for (var c of colors) {
      for (var q of colors) {
        var rSum, gSum, bSum = 0;
        var colorVector = dist(
          c.thisColor[0], c.thisColor[1], c.thisColor[2],
          q.thisColor[0], q.thisColor[1], q.thisColor[2]
        );
        addAll += floor(colorVector);
        conuter++;
      }
    }
    addAll /= conuter;
    if (addAll > 120) {
      acceptedVal = 100;
    } else {
      acceptedVal = 60;
    }
    error = abs(((addAll - acceptedVal) / addAll) * 100);
    console.log(error, acceptedVal, addAll);
    hasNotSetup = false;
  }
}

function reset() {
  colors = [];
  a = [];
  specCount = 0;
  index = 0;
  countArray = [0, 0, 0, 0, 0, 0, 0];
  colorArray = [];
  tagArray = [];
  minIndex, maxIndex = 0;
  answerCount = 0;
  count = 0;
  err = 0;
  imageLoaded = false;
  frameCount = 0;
  finished = false;
  hasNotSetup = true;
  ColorCan.background(0, 120);
  ImageCont.background(0, 120);
  textIsNotPrinted = true;
  setup();
}

function draw() {
  if (!finished) {
    if (imageLoaded && !hasNotSetup) {
      for (var c of colors) {
        c.run();
      }
      for (var i = 0; i < colorArray.length; i++) {
        if (colorArray[i]) {
          a.push(new Answers(colorArray[i], tagArray[i], countArray[i]));
        }
      }
      for (var answer of a) {
        answer.show();
      }
      ImageCont.image(ImageCont, 0, 0);
      finished = true;
      console.log("draw done!!!!!", a.length);
    } else if (hasNotSetup) {
      setup();
    }
  }
}

function keyPressed() {
  if (keyCode == 32) {
    save(source[imageSourceIndex] + "-SC" + scl + "-TR" + tresureHold + ".jpg");
    println("Saved!!!");
  }
}

function ColorList(c_, x, y) {
  this.pos = createVector(x, y);
  this.thisColor = c_;
  this.thisCount = 0;
  this.tag = "";
  // }
  this.run = function() {
    this.show();
    this.countProbility();
    this.checkTheColor();
  }
  this.countProbility = function() {
    for (var c of colors) {
      if (
        c.thisColor[0] === this.thisColor[0] &&
        c.thisColor[1] === this.thisColor[1] &&
        c.thisColor[2] === this.thisColor[2]
      ) {
        this.thisCount++;
        var ave = (this.thisColor[1] + this.thisColor[0] + this.thisColor[2]) / 3;

        if ((this.thisColor[0] - error) > this.thisColor[1] && (this.thisColor[0] - error) > this.thisColor[2] && this.thisColor[0] > tresureHold && ave < bright) {
          this.tag = "red";
        } else if ((this.thisColor[2] - error) > this.thisColor[1] && (this.thisColor[2] - error) > this.thisColor[0] && this.thisColor[2] > tresureHold && ave < bright) {
          this.tag = "blue";
        } else if ((this.thisColor[1] - error) > this.thisColor[2] && (this.thisColor[0] - error) > this.thisColor[2] && this.thisColor[1] > tresureHold && this.thisColor[0] > tresureHold ||
          (this.thisColor[1] - error) > this.thisColor[0] && (this.thisColor[1] - error) > this.thisColor[2] && this.thisColor[1] > tresureHold && ave < bright) {
          this.tag = "green";
        } else if (ave > bright) {
          this.tag = "white";
        } else if (this.thisColor[0] < tresureHold || this.thisColor[1] < tresureHold || this.thisColor[2] < tresureHold) {
          this.tag = "black";
        }
      }
    }
  }
  this.checkTheColor = function() {
    if (this.tag == "red") {
      minIndex = 0;
      maxIndex = 1;
    } else if (this.tag == "green") {
      minIndex = 2;
      maxIndex = 3;
    } else if (this.tag == "blue") {
      minIndex = 4;
      maxIndex = 5;
    } else if (this.tag == "white") {
      minIndex = 6;
      maxIndex = 7;
    }
    var colorExist = false;
    for (var c of colors) {
      if (c.thisCount > countArray[minIndex] && c.tag === this.tag) {
        for (var i = 0; i < countArray.length; i++) {
          var indexColor = colorArray[i];
          if (indexColor) {
            var colorsDist = dist(
              c.thisColor[0], c.thisColor[1], c.thisColor[2],
              indexColor[0], indexColor[1], indexColor[2]
            );
          }
          if (c.thisColor == colorArray[i] || colorsDist <= allowedDist) {
            colorExist = true;
          } else {
            colorExist = false;
          }
        }
        if (!colorExist && c.tag != "black" && c.tag != "") {
          c.findLargest(c.thisColor, c.thisCount, c.tag, minIndex, maxIndex);
        }
      } else if (this.thisCount > countArray[minIndex]) {
        colorExist = false;
        for (var i = 0; i < countArray.length; i++) {
          var indexColor = colorArray[i];
          if (indexColor) {
            var colorsDist = dist(
              this.thisColor[0], this.thisColor[1], this.thisColor[2],
              indexColor[0], indexColor[1], indexColor[2]
            );
          }
          if (this.thisColor == colorArray[i] || colorsDist <= allowedDist) {
            colorExist = true;
          } else {
            colorExist = false;
          }
        }
        if (!colorExist && this.tag != "black" && this.tag != "") {
          this.findLargest(this.thisColor, this.thisCount, this.tag, minIndex, maxIndex);
        }
      }
    }
  }
  this.findLargest = function(passedColor, passedCount, t, minIndex, maxIndex) {
    for (var i = maxIndex; i > minIndex; i--) {
      tagArray[i] = tagArray[i - 1];
      countArray[i] = countArray[i - 1];
      colorArray[i] = colorArray[i - 1];
    }
    tagArray[minIndex] = t;
    countArray[minIndex] = passedCount;
    colorArray[minIndex] = passedColor;
  }
  this.show = function() {
    if (detail) {
      noStroke();
      fill(this.thisColor);
      rect(this.pos.x, this.pos.y, scl, scl);
    } else {
      image(imgPV, 0, 0);
    }
  }
}

function Answers(c_, tag_, count_) {
  this.c = c_;
  this.tag = tag_;
  this.co = count_;

  this.show = function() {
    var rectHeight = 0;
    var rectY = 0;
    if (detail) {
      rectHeight = 25;
      rectY = ImageCont.height - 95;
    } else {
      rectY = 0;
      rectHeight = ImageCont.height;
    }
    // ImageCont.stroke(255);
    ImageCont.noStroke();
    ImageCont.fill(this.c[0], this.c[1], this.c[2]);
    ImageCont.rect(answerCount * (ImageCont.width / a.length), rectY, (ImageCont.width / a.length), rectHeight);
    ImageCont.noStroke();
    ImageCont.fill(255);
    if (detail) {
      ImageCont.text(this.tag, answerCount * (ImageCont.width / a.length) + ((ImageCont.width / a.length) / 2) / 2, ImageCont.height - 78);
      ImageCont.text(answerCount, answerCount * (ImageCont.width / a.length) + ((ImageCont.width / a.length) / 2) / 2, ImageCont.height - 30);
      ImageCont.text("(" + this.c[0] + "," + this.c[1] + "," + this.c[2] + ")", answerCount * (ImageCont.width / a.length), ImageCont.height - 10);
      ImageCont.text("Count=" + this.co, answerCount * (ImageCont.width / a.length) + ((ImageCont.width / a.length) / 2) / 2, ImageCont.height - 45);
    } else {
      // ImageCont.text("#" + hex(this.c[0], this.c[1], this.c[2]), answerCount * (ImageCont.width / a.length) + ((ImageCont.width / a.length) / 2) / 2, ImageCont.height - 10);
    }
    answerCount++;
  }
}