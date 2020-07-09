var sketchContainer = document.getElementById("d3-container");
var menuSwitch = false;
var overlayOffset = "70vw";

var rad = 120;
var menuData = [{
  name: "D3",
  img: "Assets/Buttons-Icon/D3.png",
  toolKit: "Bangladesh Disaster Case",
  width: 200
}, {
  name: "Info",
  img: "Assets/Buttons-Icon/info.png",
  toolKit: "How am I",
  width: 90
}, {
  name: "CV",
  img: "Assets/Buttons-Icon/CV.png",
  toolKit: "Resume",
  width: 90
}, {
  name: "UX",
  img: "Assets/Buttons-Icon/UX.png",
  toolKit: "UX Design Case Study",
  width: 150
}];
var Can = d3.select("#d3-container").append("svg").attr("id", "control-canvas");
var menuButtonsGroupContainer = Can.append("g").attr("id", "menuButtons-Group");
var menuButtons = menuButtonsGroupContainer.append("g").attr("id", "menuButtons");
var menuButtonsBack = Can.append("g");
var iconContainer = menuButtons.append("g").attr("id", "menu-Icons");
var toolKitGroupText = menuButtons.append("g").attr("id", "tool-Kit-Group-text");


/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
///////////////////////////Circles Drop Shadow///////////////////////////
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/

var defs = Can.append("defs");

var filter = defs.append("filter")
  .attr("id", "drop-shadow")
  .attr("height", "330%")
  .attr("width", "330%");

filter.append("feGaussianBlur")
  .attr("in", "SourceAlpha")
  .attr("stdDeviation", 12)

filter.append("feOffset")
  .attr("dx", 8)
  .attr("dy", 8)
  .attr("result", "offsetBlur");

var feTransfer = filter.append("feComponentTransfer");

feTransfer.append("feFuncA")
  .attr("type", "linear")
  .attr("slope", .3)

var feMerge = filter.append("feMerge");

feMerge.append("feMergeNode")
feMerge.append("feMergeNode")
  .attr("in", "SourceGraphic");

/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
///////////////////////////Circles Drop Shadow///////////////////////////
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/


var blurFilter = Can.append("defs").append("filter")
  .attr("id", "blurFilter")
  .append("feGaussianBlur")
  .attr("stdDeviation", 20);

var gradient = Can.append("defs").append("linearGradient")
  .attr("id", "Gradient")
  .attr("gradientTransform", "rotate(180)");

gradient.append("stop")
  .attr("class", "stop-left")
  .attr("offset", "0");

gradient.append("stop")
  .attr("class", "stop-right")
  .attr("offset", "1");

iconContainer.attr("transform", "translate(-30,-30)");


function redraw() {
  var w = sketchContainer.clientWidth;
  var h = sketchContainer.clientHeight;

  Can.attr("width", w)
    .attr("height", h);


  var toolKitTexy = toolKitGroupText.selectAll("text")
    .data(menuData)
    .enter().append("text")
    .attr("transform", function(d, i) {
      return "translate(" +
        (rad * Math.cos(((2 * Math.PI) / menuData.length * i))) +
        "," +
        (rad * Math.sin(((2 * Math.PI) / menuData.length * i))) +
        ")";
    })
    .text(function(d) {
      return d.toolKit;
    })
    .attr("class", "toolKit-text")
    .attr("id", function(d, i) {
      return d.name + "-tool-text";
    })
    .style("opacity", "0");

  var menuTransition = d3.transition()
    .ease(d3.easeQuad)
    .duration(100);

  menuButtonsBack.selectAll("circle").remove();

  var buttonEmmision = menuButtonsBack.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 150)
    .attr("class", "buttonEmmision")
    .attr("filter", "url(#blurFilter)");

  var menuIcon = iconContainer.selectAll("image")
    .data(menuData)
    .enter().append("image")
    .attr("xlink:href", function(d) {
      return d.img;
    })
    .attr("transform", function(d, i) {
      var r = rad;
      return "translate(" + (r - r / 2) * Math.cos(((2 * Math.PI) / menuData.length * i)) + "," +
        (r - r / 2) * Math.sin(((2 * Math.PI) / menuData.length * i)) + ")";
    })
    .attr("height", (rad / 2))
    .attr("width", (rad / 2));


  var menu = menuButtons.selectAll("circle")
    .data(menuData)
    .enter().append("circle")
    .attr("cx", function(d, i) {
      return rad * Math.cos(((2 * Math.PI) / menuData.length * i));
    })
    .attr("cy", function(d, i) {
      return rad * Math.sin(((2 * Math.PI) / menuData.length * i));
    })
    .attr("r", 50)
    .attr("class", "button-circle")
    .attr("id", function(d) {
      return d.name;
    })
    .on("mouseenter", function(d, i) {
      var data = d;
      var thisBoxName = "#" + this.id + "-tool-box";
      var thisTextName = "#" + this.id + "-tool-text";

      toolKitGroupText.select(thisTextName).style("opacity", "1");

    })
    .on("mouseout", function(d, i) {
      var data = d;
      var thisTextName = "#" + this.id + "-tool-text";
      toolKitGroupText.selectAll(thisTextName).style("opacity", "0");
    })
    .on("click", function(d, i) {

      menuButtons.selectAll("circle").classed("selected", false);
      var index = i;
      var name = d.name;

      var contentLayer = document.getElementsByClassName("content-page");
      for (var i = 0; i < contentLayer.length; i++) {
        contentLayer[i].classList.remove("open");
      }
      document.getElementById("d3-container").style.marginLeft = "550px";
      var containerSelected = document.getElementById(name);
      containerSelected.classList.add("open");

      menuButtons.transition(menuTransition).duration(1000)
        .attr("transform", function() {
          if (index == 0) {
            index = 2;
          } else if (index == 2) {
            index = 0;
          }
          return "translate(0,0) rotate(" + (index * 90) + ")";
        });

      iconContainer.selectAll("image")
        .transition(menuTransition).duration(1000)
        .attr("transform", function(d, i) {
          var imgIndex = i;
          var inc = 1;

          if (index == 0 || index == 2) {
            inc = 1;
          } else {
            inc = -1;
          }
          return "translate(" + (rad * 2) * Math.cos(((2 * Math.PI) / menuData.length * imgIndex)) + "," +
            (rad * 2) * Math.sin(((2 * Math.PI) / menuData.length * imgIndex)) + ")rotate(" + (index * 90 * inc) + ")";
        });

      toolKitGroupText.selectAll("text")
        .transition(menuTransition).duration(1000)
        .attr("transform", function(d, i) {
          var imgIndex = i;
          var inc = 1;

          if (index == 0 || index == 2) {
            inc = 1;
          } else {
            inc = -1;
          }
          return "translate(" + (rad * 2) * Math.cos(((2 * Math.PI) / menuData.length * imgIndex)) + "," +
            (rad * 2) * Math.sin(((2 * Math.PI) / menuData.length * imgIndex)) + ")rotate(" + (index * 90 * inc) + ")";
        });

      iconContainer.transition(menuTransition).duration(1000).attr("transform", function() {
        if (index == 0) {
          return "translate(-30,-30)";
        } else if (index == 1) {
          return "translate(-30,30)";
        } else if (index == 2) {
          return "translate(30,30)";
        } else if (index == 3) {
          return "translate(30,-30)";
        }
      });

      d3.select(this).classed("selected", true);

    });

  menuButtonsGroupContainer.attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

  menuButtonsBack.attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

  iconContainer.raise();
  toolKitGroupText.raise();
}


function myTransit() {
  document.getElementById("d3-container").style.marginLeft = 0;
  var contentLayer = document.getElementsByClassName("content-page");
  for (var i = 0; i < contentLayer.length; i++) {
    contentLayer[i].classList.remove("open");
  }

  var menuOptionsTransition = d3.transition()
    .ease(d3.easeQuad)
    .duration(500);

  menuSwitch = !menuSwitch;


  var newRad = rad * 2;

  var menu = menuButtons.selectAll("circle")
    .data(menuData)
  menu.exit().remove();

  var imageLables = iconContainer.selectAll("image")
    .data(menuData)
  imageLables.exit().remove();


  var toolKitText = toolKitGroupText.selectAll("text")
    .data(menuData)
  toolKitText.exit().remove();

  menu.select("circle")
    .data(menuData)
    .enter().selectAll("circle").transition(menuOptionsTransition)
    .attr("cx", function(d, i) {
      if (menuSwitch) {
        return newRad * Math.cos(((2 * Math.PI) / menuData.length * i));
      } else {
        return rad * Math.cos(((2 * Math.PI) / menuData.length * i));
      }
    })
    .attr("cy", function(d, i) {
      if (menuSwitch) {
        return newRad * Math.sin(((2 * Math.PI) / menuData.length * i));
      } else {
        return rad * Math.sin(((2 * Math.PI) / menuData.length * i));
      }
    })
    .attr("r", function() {
      if (menuSwitch) {
        return 60;
      } else {
        return 50;
      }
    })
    .attr("class", "button-circle");

  imageLables = iconContainer.select("image")
    .data(menuData)
    .enter().selectAll("image").transition(menuOptionsTransition)
    .attr("transform", function(d, i) {
      var r = rad;
      if (menuSwitch) {
        r = newRad * 2;
      } else {
        r = rad * 2;
      }
      return "translate(" + (r / 2) * Math.cos(((2 * Math.PI) / menuData.length * i)) + "," +
        (r / 2) * Math.sin(((2 * Math.PI) / menuData.length * i)) + ")";
    });


  toolKitText.select("text")
    .data(menuData)
    .enter().selectAll("text")
    .transition(menuOptionsTransition)
    .attr("transform", function(d, i) {
      var r = rad;
      if (menuSwitch) {
        r = newRad * 2;
      } else {
        r = rad * 2;
      }
      return "translate(" + (r / 2) * Math.cos(((2 * Math.PI) / menuData.length * i)) + "," +
        (r / 2) * Math.sin(((2 * Math.PI) / menuData.length * i)) + ")";
    });

  Can.selectAll("#Gradient").transition()
    .duration(1000)
    .attr("gradientTransform", function() {
      if (menuSwitch) {
        return "rotate(45)";
      } else {
        return "rotate(180)";
      }
    });

  if (!menuSwitch) {
    menuButtons.attr("transform", "rotate(0)");
    iconContainer.attr("transform", "translate(-30,-30)");
    redraw();
  }
}
redraw();


window.addEventListener("resize", function() {
  redraw();
});

/*---------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------
                                            Java Controle
-----------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

var blumLights = document.getElementsByClassName("line-indicator");
var values = [95, 80, 85, 95, 95, 98, 70, 75, 60, 80, 80, 60, 80, 70, 80, 60];

for (var i = 0; i < blumLights.length; i++) {
  console.log(blumLights[i].innerText);
  blumLights[i].style.width = values[i] + "%";
  blumLights[i].innerText = "\n" + "%" + values[i];
}