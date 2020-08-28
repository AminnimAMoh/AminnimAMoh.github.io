var containerElement = document.getElementById("Script-Container");
var containerX = containerElement.offsetWidth;
var containerY = containerElement.offsetHeight;
var stationName = [];
var rain1990 = [];
var rain1995 = [];
var rain2000 = [];
var rain2005 = [];
var rain2010 = [];
var rain2013 = [];
var stationCord = [];
var slumes = [];

var w = containerX;
var h = containerY;
var yearSelected = "0";
var ellipsesLength = [{
  size: 70,
  f: "#E4E5E7",
  s: "none"
}, {
  size: 70,
  f: "#E4E5E7",
  s: "none"
}, {
  size: 70,
  f: "#E4E5E7",
  s: "none"
}, {
  size: 82,
  f: "#E4E5E7",
  s: "none"
}, {
  size: 60,
  f: "none",
  s: "black"
}, {
  size: 60,
  f: "none",
  s: "black"
}, {
  size: 60,
  f: "none",
  s: "black"
}, {
  size: 80,
  f: "none",
  s: "none"
}];
var populationOne = [];
var populationTwo = [];
var populationThree = [];
var popCityName = [];
var graphRad = 120;
var popMinOne, popMinTwo, popMinThree;
var popMaxOne, popMaxTwo, popMaxThree;
var rectsLength = [{
    x: 183,
    y: 0,
    text: "Cities Population 1991"
  }, {
    x: 63,
    y: 120,
    text: "Cities Population 2001"
  },
  {
    x: -57,
    y: 0,
    text: "Cities Population 2011"
  }
];

var rainStationName = [];
var rainMonthTotal1990 = [];
var rainMonthTotal1995 = [];
var rainMonthTotal2000 = [];
var rainMonthTotal2005 = [];
var rainMonthTotal2010 = [];
var rainMonthTotal2013 = [];
var rainMonthsName = [{
  name: "Jan"
}, {
  name: "Feb"
}, {
  name: "Mar"
}, {
  name: "Apr"
}, {
  name: "May"
}, {
  name: "Jun"
}, {
  name: "Ju"
}, {
  name: "Aug"
}, {
  name: "Sep"
}, {
  name: "Oct"
}, {
  name: "Nov"
}, {
  name: "Dec"
}];
var yearSelector = [{
  name: 1990
}, {
  name: 1995
}, {
  name: 2000
}, {
  name: 2005
}, {
  name: 2010
}, {
  name: 2013
}];


var container = d3.select("#Script-Container").append("svg").attr("id", "map-canvas");

var mapContainer = container.append("g").attr("id", "map-container-group");
var yearsContainer = container.append("g").attr("class", "year-container");
var yearsSluems = container.append("g").attr("class", "year-slumes");
var lableSluems = container.append("g").attr("class", "lable-slumes");
var cityCircles = container.append("g").attr("id", "city-indicators");
var legend = container.append("g").attr("id", "graph-legend");
var ellipseContainer = container.append("g").attr("id", "ellipse-group");
var cityLables = container.append("g").attr("id", "city-Lable");
var groupOne = container.append("g").attr("id", "population-groupOne");
var groupTwo = container.append("g").attr("id", "population-groupTwo");
var groupThree = container.append("g").attr("id", "population-groupThree");
var lables = container.append("g").attr("id", "graph-lables");
var rainGroup = container.append("g").attr("class", "rainG");



/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
///////////////////////////Circles Drop Shadow///////////////////////////
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/

var defs = container.append("defs");

// create filter with id #drop-shadow
// height=130% so that the shadow is not clipped
var filter = defs.append("filter")
  .attr("id", "drop-shadow")
  .attr("height", "330%")
  .attr("width", "330%");

// SourceAlpha refers to opacity of graphic that this filter will be applied to
// convolve that with a Gaussian with standard deviation 3 and store result
// in blur
filter.append("feGaussianBlur")
  .attr("in", "SourceAlpha")
  .attr("stdDeviation", 3)

// translate output of Gaussian blur to the right and downwards with 2px
// store result in offsetBlur
filter.append("feOffset")
  .attr("dx", 10)
  .attr("dy", 10)
  .attr("result", "offsetBlur");

// Control opacity of shadow filter
var feTransfer = filter.append("feComponentTransfer");

feTransfer.append("feFuncA")
  .attr("type", "linear")
  .attr("slope", .3)

// overlay original SourceGraphic over translated blurred opacity by using
// feMerge filter. Order of specifying inputs is important!
var feMerge = filter.append("feMerge");

feMerge.append("feMergeNode")
feMerge.append("feMergeNode")
  .attr("in", "SourceGraphic");

/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
///////////////////////////Circles Drop Shadow///////////////////////////
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/

/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
///////////////////////////Graph Drop Shadow///////////////////////////
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/

var defs = container.append("defs");

// create filter with id #drop-shadow
// height=130% so that the shadow is not clipped
var filter = defs.append("filter")
  .attr("id", "graph-drop-shadow")
  .attr("height", "130%");

// SourceAlpha refers to opacity of graphic that this filter will be applied to
// convolve that with a Gaussian with standard deviation 3 and store result
// in blur
filter.append("feGaussianBlur")
  .attr("in", "SourceAlpha")
  .attr("stdDeviation", 6)

// translate output of Gaussian blur to the right and downwards with 2px
// store result in offsetBlur
filter.append("feOffset")
  .attr("dx", 0)
  .attr("dy", 0)
  .attr("result", "offsetBlur");

// Control opacity of shadow filter
var feTransfer = filter.append("feComponentTransfer");

feTransfer.append("feFuncA")
  .attr("type", "linear")
  .attr("slope", 1)

// overlay original SourceGraphic over translated blurred opacity by using
// feMerge filter. Order of specifying inputs is important!
var feMerge = filter.append("feMerge");

feMerge.append("feMergeNode")
feMerge.append("feMergeNode")
  .attr("in", "SourceGraphic");

/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
///////////////////////////Graph Drop Shadow///////////////////////////
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/

/*--------------------------------------------------------------*/
///////////////////////////Legend Drop Shadow///////////////////////////
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/

var defs = container.append("defs");

// create filter with id #drop-shadow
// height=130% so that the shadow is not clipped
var filter = defs.append("filter")
  .attr("id", "legend-drop-shadow")
  .attr("height", "330%")
  .attr("width", "330%");

// SourceAlpha refers to opacity of graphic that this filter will be applied to
// convolve that with a Gaussian with standard deviation 3 and store result
// in blur
filter.append("feGaussianBlur")
  .attr("in", "SourceAlpha")
  .attr("stdDeviation", 1)

// translate output of Gaussian blur to the right and downwards with 2px
// store result in offsetBlur
filter.append("feOffset")
  .attr("dx", 10)
  .attr("dy", 5)
  .attr("result", "offsetBlur");

// Control opacity of shadow filter
var feTransfer = filter.append("feComponentTransfer");

feTransfer.append("feFuncA")
  .attr("type", "linear")
  .attr("slope", .2)

// overlay original SourceGraphic over translated blurred opacity by using
// feMerge filter. Order of specifying inputs is important!
var feMerge = filter.append("feMerge");

feMerge.append("feMergeNode")
feMerge.append("feMergeNode")
  .attr("in", "SourceGraphic");

// /*--------------------------------------------------------------*/
// ///////////////////////////Legend Drop Shadow///////////////////////////
// /*--------------------------------------------------------------*/
// /*--------------------------------------------------------------*/





// /*--------------------------------------------------------------*/
// ///////////////////////////Gradient///////////////////////////
// /*--------------------------------------------------------------*/
// /*--------------------------------------------------------------*/
var defs = container.append("defs");

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


var blurFilter = container.append("defs").append("filter")
  .attr("id", "blurFilter")
  .append("feGaussianBlur")
  .attr("stdDeviation", 20);

var gradient = container.append("defs").append("linearGradient")
  .attr("id", "Gradient")
  .attr("gradientTransform", "rotate(180)");

gradient.append("stop")
  .attr("class", "stop-left")
  .attr("offset", "0");

gradient.append("stop")
  .attr("class", "stop-right")
  .attr("offset", "1");

container.selectAll("#Gradient").transition()
  .duration(1000)
  .attr("gradientTransform", function() {
    return "rotate(45)";
  });


/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
///////////////////////////Legend Drop Shadow///////////////////////////
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/

var projection = d3.geoMercator()
  .scale(5200)
  .translate([-7720, 2650]);

var projectionTest = d3.geoEquirectangular()
  .scale(5100)
  .translate([-7565, 2530]);

var geoGenerator = d3.geoPath()
  .projection(projection);

var blueScale = d3.scaleLinear()
  .domain([1100, 4300])
  .range([0, 255]);

var redScale = d3.scaleLinear()
  .domain([1100, 4300])
  .range([255, 0]);

var angleScale = d3.scaleLinear()
  .domain([0, 4])
  .range([0, Math.PI * 2]);



d3.csv("data/Annual-Rain-All-Years.csv", function(data) {
  for (var i = 0; i < data.length; i++) {
    stationName[i] = data[i].Station;
    rain1990.push(parseInt(data[i].Sum1990));
    rain1995.push(parseInt(data[i].Sum1995));
    rain2000.push(parseInt(data[i].Sum2000));
    rain2005.push(parseInt(data[i].Sum2005));
    rain2010.push(parseInt(data[i].Sum2010));
    rain2013.push(parseInt(data[i].Sum2013));
    stationCord.push(projectionTest([+data[i].longitude, +data[i].latitude]));
  }
});

d3.csv("data/bangladesh_slums_total (1).csv", function(data) {
  for (var i = 0; i < data.length; i++) {
    slumes.push({
      year: data[i].year,
      pop: data[i].number,
    });
  }
})

d3.csv("data/PThreeYears.csv", function(data) {
  for (var i = 2; i < data.length; i++) {
    popCityName.push(data[i].City);
    populationOne.push(+data[i].Population1991);
    populationTwo.push(+data[i].Population2001);
    populationThree.push(+data[i].Population2011);
    popMinOne = +data[0].Min1991;
    popMaxOne = +data[0].Max1991;
    popMinTwo = +data[0].Min2001;
    popMaxTwo = +data[0].Max2001;
    popMinThree = +data[0].Min2011;
    popMaxThree = +data[0].Max2011;
  }
})

var count = 0;
d3.csv("data/Month-FiveYears.csv", function(data) {
  for (var i = 0; i < data.length; i++) {
    rainMonthTotal1990.push({
      month: rainMonthsName[count].name,
      name: data[i].Station,
      total: +data[i].MonthlyTotal1990
    });
    rainMonthTotal1995.push({
      month: rainMonthsName[count].name,
      name: data[i].Station,
      total: +data[i].MonthlyTotal1995
    });
    rainMonthTotal2000.push({
      month: rainMonthsName[count].name,
      name: data[i].Station,
      total: +data[i].MonthlyTotal2000
    });
    rainMonthTotal2005.push({
      month: rainMonthsName[count].name,
      name: data[i].Station,
      total: +data[i].MonthlyTotal2005
    });
    rainMonthTotal2010.push({
      month: rainMonthsName[count].name,
      name: data[i].Station,
      total: +data[i].MonthlyTotal2010
    });
    rainMonthTotal2013.push({
      month: rainMonthsName[count].name,
      name: data[i].Station,
      total: +data[i].MonthlyTotal2013
    });
    count++;
    if (count >= 12) {
      count = 0;
    }
  }
})

var url = "data/GeoJson/bangladesh.geojson";
d3.json(url, function(error, countries) {
  if (error) console.log(error);
  var names = [];
  for (var i = 0; i < countries.features.length; i++) {
    names.push(countries.features[i].properties.NAME_4);
  }
  mapContainer.selectAll("path")
    .data(countries.features)
    .enter().append("path")
    .attr("d", geoGenerator)


  var datatransfer = rain2013;
  var firstMin = d3.min(datatransfer);
  var firstMax = d3.max(datatransfer);
  // console.log(firstMin);
  var radScale = d3.scaleLinear()
    .domain([firstMin, firstMax])
    .range([4, 24]);

  // function reDrawCan() {
  containerElement = document.getElementById("Script-Container");
  w = containerElement.offsetWidth;
  h = containerElement.offsetHeight;
  container
    .attr("width", w)
    .attr("height", h);


  var allGroups = container.selectAll("g")
    .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

  mapContainer.attr("transform", "translate(0,0)");
  legend.attr("transform", "translate(265 ," + (h - 230) + ")");



  ellipseContainer.selectAll("ellipse")
    .data(ellipsesLength)
    .enter().append("ellipse")
    .attr("cx", function(d) {
      return d.x;
    })
    .attr("cy", function(d) {
      return d.y;
    })
    .attr("rx", 0)
    .attr("ry", 0);

  for (var i = 0; i < 3; i++) {
    var groups;
    var dataSet;
    if (i == 0) {
      dataSet = populationOne;
      groups = groupOne;
    } else if (i == 1) {
      dataSet = populationTwo;
      groups = groupTwo;
    } else if (i == 2) {
      dataSet = populationThree;
      groups = groupThree;
    }

    groups.style("opacity", 1);

    var arcG = d3.arc()
      .innerRadius(0)
      .outerRadius(0);

    var popScale = d3.pie()(dataSet);

    var gr = groups.selectAll("path")
      .data(popScale)
      .enter().append("path")
      .attr("d", arcG)
  }


  cityCircles.attr("transform", "translate(0,0)");
  cityLables.attr("transform", "translate(0,0)");
  ellipseContainer.attr("transform", "translate(0,0)");

  var managedArray = [];
  var sortedData = rain2013.sort(d3.descending);
  managedArray.push(sortedData[0]);
  managedArray.push(sortedData[sortedData.length / 2]);
  managedArray.push(sortedData[sortedData.length - 1]);

  legend.selectAll("circle")
    .data(managedArray)
    .enter().append("circle")
    .attr("class", "cities-circles")
    .attr("transform", function(d, i) {
      return "translate(0," + (-radScale(d)) + ")";
    })
    .attr("r", function(d) {
      return radScale(d);
    });

  legend.selectAll("line")
    .data(managedArray)
    .enter().append("line")
    .attr("transform", function(d, i) {
      return "translate(0," + (-radScale(d) * 2) + ")";
    })
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x1", function(d, i) {
      return (i * 50) + 50;
    })
    .attr("y1", 1)
    .style("stroke", "white");

  legend.selectAll("text")
    .data(managedArray)
    .enter().append("text")
    .attr("transform", function(d, i) {
      return "translate(" + ((i * 50) + 12) + "," + (-radScale(d) * 2 - 3) + ")";
    })
    .text(function(d) {
      return d + "mm";
    })
    .style("font-size", "6pt")
    .style("fill", "white");

  for (var i = 0; i < stationCord.length; i++) {
    var cord = stationCord[i];
    var circleStations = cityCircles.append("circle")
      .attr("id", function() {
        return stationName[i];
      })
      .attr("class", "cities-circles")
      .attr("cx", function() {
        return cord[0];
      })
      .attr("cy", function() {
        return cord[1];
      })
      .attr("r", function() {
        return radScale(rain2013[i]);
      })
      .on("mouseover", function(d) {
        d3.select(this)
          .classed("active", true);
      })
      .on("mouseout", function(d) {
        d3.select(this)
          .classed("active", false);
      })

      .on("click", function() {
        var coords = d3.mouse(this);
        var group = container.append("g");
        var nameOfCity = this.id;
        var popOne, popTwo, popThree;

        cityLables.selectAll("text").remove();


        d3.selectAll("circle").classed("clicked", false)
        d3.select(this)
          .classed("clicked", true);

        var circleTransition = d3.transition()
          .ease(d3.easePoly)
          .duration(1000);

        var cgraphTransition = d3.transition()
          .ease(d3.easePoly)
          .duration(1000);

        var ellipses = ellipseContainer.selectAll("ellipse")
          .data(ellipsesLength)
        ellipses.exit().remove();

        ellipses.select("ellipse")
          .data(ellipsesLength)
          .enter()
          .append("ellipse")
          .attr("class", "ellipseCan")
          .attr("cx", function(d, i) {
            return coords[0] + graphRad * Math.cos(angleScale(i));
          })
          .attr("cy", function(d, i) {
            return coords[1] + graphRad * Math.sin(angleScale(i));
          })
          .transition(circleTransition)
          .attr("rx", function(d) {
            return d.size;
          })
          .attr("ry", function(d) {
            return d.size;
          })
          .attr("fill", "#061621")
          .style("stroke", function(d) {

            if (d.f == "none") {
              return d.s;
            } else {
              return "url(#Gradient)";
            }
          })
          .style("stroke-width", "1.5px")
          .style("filter", "url(#graph-drop-shadow)");

        var myLable = cityLables.selectAll("text")
          .data(ellipsesLength)
          .enter().append("text")
          .attr("x", function(d, i) {
            return coords[0] + graphRad * Math.cos(angleScale(i));
          })
          .attr("y", function(d, i) {
            return coords[1] + graphRad * Math.sin(angleScale(i)) - 20;
          })
          .text(function(d, i) {
            if (i <= 2) {
              return nameOfCity;
            }
          })
          .attr("text-anchor", "middle")
          .style("fill", "#9c3c41")
          .style("font-size", "8pt");


        var outer = d3.scaleLinear()
          .domain([popMinThree, popMaxThree])
          .range([62, 70])

        var inner = d3.scaleLinear()
          .domain([0, 63])
          .range([70, 0])

        var arcGenerator = d3.arc()
          .innerRadius(60)
          .outerRadius(function(d) {
            return outer(d.data);
          });

        var pieColorScale = d3.scaleSequential().domain([popMinOne, popMaxOne])
          .interpolator(d3.interpolateBuPu);

        for (var i = 0; i < 3; i++) {
          var data;
          var groupContainer;
          var lable;
          if (i == 0) {
            data = populationOne;
            groupContainer = groupOne;
          } else if (i == 1) {
            data = populationTwo;
            groupContainer = groupTwo;
          } else if (i == 2) {
            data = populationThree;
            groupContainer = groupThree;
          }

          var popScale = d3.pie()(data);

          var cOne = groupContainer.selectAll("path")
            .data(populationOne);
          cOne.exit().remove();

          var arc = cOne.select("path")
            .data(popScale)
            .enter().append("path")
            .attr("d", arcGenerator)
            .style("fill", function(d, i) {
              if (nameOfCity == popCityName[i]) {
                popOne = populationOne[i];
                popTwo = populationTwo[i];
                popThree = populationThree[i];
                return "#9C3C41";
              } else {
                return pieColorScale(data[i]);
              }
            })
            .style("stroke-width", "none")
            .transition()
            .ease(d3.easePoly)
            .duration(1000)
            .attrTween("d", arcTween);

          function arcTween(d) {
            var i = d3.interpolateNumber(70, 60);
            return function(t) {
              var r = i(t),
                arc = d3.arc()
                .outerRadius(function(d) {
                  return (outer(d.data));
                })
                .innerRadius(r)
              return arc(d);
            };
          }

          var groupTx = coords[0] + graphRad * Math.cos(angleScale(i));
          var groupTy = coords[1] + graphRad * Math.sin(angleScale(i));

          groupContainer.attr("transform", "translate(" + groupTx + "," + groupTy + ")");
        }

        var rainGroupTx = (coords[0] + graphRad * Math.cos(angleScale(3))) - 125;
        var rainGroupTy = (coords[1] + graphRad * Math.sin(angleScale(3))) - 125;

        rainGroup.attr("transform", "translate(" + rainGroupTx + "," + rainGroupTy + ")")
          .style("opacity", 1);

        var r = 58;
        var margin = {
            top: 50,
            right: 80,
            bottom: 50,
            left: 80
          },
          width = Math.min(700, window.innerWidth / 4) - margin.left - margin.right,
          height = Math.min(width, window.innerHeight - margin.top - margin.bottom);


        var data = [];
        var thisCityRain = [];
        thisCityRain.splice(0, thisCityRain.length);
        var rainMonthTotal;
        switch (yearSelected) {
          case "1990":
            rainMonthTotal = rainMonthTotal1990;
            break;
          case "1995":
            rainMonthTotal = rainMonthTotal1995;
            break;
          case "2000":
            rainMonthTotal = rainMonthTotal2000;
            break;
          case "2005":
            rainMonthTotal = rainMonthTotal2005;
            break;
          case "2010":
            rainMonthTotal = rainMonthTotal2010;
            break;
          case "2013":
            rainMonthTotal = rainMonthTotal2013;
            break;

          default:
            rainMonthTotal = rainMonthTotal2013;
        }
        for (var i = 0; i < rainMonthTotal.length; i++) {
          if (rainMonthTotal[i].name == nameOfCity) {
            data.push(rainMonthTotal[i]);
          }
        }
        thisCityRain.push({
          name: data[0].name,
          axes: [{
            axis: data[0].month,
            value: data[0].total
          }, {
            axis: data[1].month,
            value: data[1].total
          }, {
            axis: data[2].month,
            value: data[2].total
          }, {
            axis: data[3].month,
            value: data[3].total
          }, {
            axis: data[4].month,
            value: data[4].total
          }, {
            axis: data[5].month,
            value: data[5].total
          }, {
            axis: data[6].month,
            value: data[6].total
          }, {
            axis: data[7].month,
            value: data[7].total
          }, {
            axis: data[8].month,
            value: data[8].total
          }, {
            axis: data[9].month,
            value: data[9].total
          }, {
            axis: data[10].month,
            value: data[10].total
          }, {
            axis: data[11].month,
            value: data[11].total
          }, ],
          color: "#cd1d27"
        });

        var radarChartOptions = {
          w: 90,
          h: 150,
          margin: margin,
          levels: 2,
          roundStrokes: true,
          color: d3.scaleOrdinal().range(["#9C3C41", "#12393D", "#9C3C41"]),
          format: '.0f'
        };

        let svg_radar1 = RadarChart(".rainG", thisCityRain, radarChartOptions);

        var textContainer = lables.selectAll("text")
          .data(rectsLength);

        textContainer.exit().remove();

        textContainer.select("text")
          .data(rectsLength)
          .enter()
          .append("text")
          .attr("x", function(d) {
            return d.x;
          })
          .attr("y", function(d) {
            return d.y + 5;
          })
          .text(function(d) {
            return d.text;
          })
          .attr("width", 20)
          .attr("fill", "#B0B2B8")
          .attr("font-size", 11)
          .style("opacity", 1);


        lables.attr("transform", "translate(" + groupTx + "," + groupTy + ")");
        var formatComma = d3.format(",");

        textContainer.select("text")
          .data(rectsLength)
          .enter()
          .append("text")
          .attr("x", function(d) {
            if (formatComma(popOne) == "NaN" || formatComma(popTwo) == "NaN" || formatComma(popThree) == "NaN") {
              return d.x + 25;
            } else {
              return d.x + 35;
            }
          })
          .attr("y", function(d) {
            return d.y + 25;
          })
          .text(function(d, i) {
            switch (i) {
              case 0:
                if (formatComma(popOne) == "NaN") {
                  return "Data Missing";
                }
                return formatComma(popOne);
                break;
              case 1:
                if (formatComma(popTwo) == "NaN") {
                  return "Data Missing";
                }
                return formatComma(popTwo);
                break;
              case 2:
                if (formatComma(popThree) == "NaN") {
                  return "Data Missing";
                }
                return formatComma(popThree);
                break;
            }

          })
          .attr("width", 20)
          .style("fill", "#E4E5E7")
          .style("font-size", 11);

        lables.attr("transform", "translate(" + groupTx + "," + groupTy + ")");

      })
  }

  var rectScale = d3.scaleLinear()
    .domain([0, 20])
    .range([4, 24]);

  var legendCircleScale = d3.scaleLinear()
    .domain([0, 20])
    .range([4, 12]);

  var colorScale = d3.scaleLinear()
    .domain([0, 20])
    .range([255, 153]);


  var slumMin = 87832308;
  var slumMax = 102370207;
  var slumScale = d3.scaleLinear()
    .domain([slumMin, slumMax])
    .range([20, 100]);


  lableSluems.attr("transform", "translate(100,20)");
  yearsSluems.attr("transform", "translate(150,20)");
  yearsSluems.selectAll("rect")
    .data(slumes)
    .enter().append("rect")
    .attr("transform", function(d, i) {
      return "translate(" + ((i * 100)) + "," + (10) + ")";
    })
    .attr("width", 2)
    .attr("height", 0)
    .style("fill", "#7a9193");

  yearsSluems.selectAll("text")
    .data(slumes)
    .enter().append("text")
    .attr("transform", function(d, i) {
      return "translate(" + ((i * 100)) + "," + (60) + ")";
    })
    .text(function(d) {
      return d.pop;
    })
    .style("text-anchor", "middle")
    .style("opacity", 0)
    .style("fill", "#9C3C41")
    .style("font-size", "8pt");

  lableSluems.append("text")
    .attr("transform", "translate(-100,60)")
    .text("Slums Population")
    .style("fill", "#9C3C41")
    .style("font-size", "8pt");

  var check;
  yearsContainer.attr("transform", "translate(150,20)");
  yearsContainer.selectAll("text")
    .data(yearSelector)
    .enter().append("text")
    .attr("x", function(d, i) {
      return i * 100;
    })
    .attr("y", 0)
    .text(function(d) {
      return d.name;
    })
    .attr("id", function(d) {
      return d.name;
    })
    .attr("text-anchor", "middle")
    .attr("font-size", 12)

    .on("mouseover", function(d) {
      var year = this.id;
      d3.select(this)
        .classed("active", true);

      yearsSluems.selectAll("rect").transition().duration(500)
        .attr("height", function(d, i) {
          return slumScale(d.pop);
        })
      yearsSluems.selectAll("text").transition().delay(500).duration(100)
        .style("opacity", function(d) {
          if (d.year == year) {
            return 1;
          } else {
            return 0;
          }
        });
    })
    .on("mouseout", function(d) {
      d3.select(this)
        .classed("active", false);
      yearsSluems.selectAll("rect").transition().duration(500)
        .attr("height", 0);
      yearsSluems.selectAll("text").transition().delay(500).duration(100)
        .style("opacity", 0);
    })
    .on("click", function(d) {
      removeFunction();
      onClickTextFunction(this);
      drawAll(this);
    });

  function removeFunction() {
    cityLables.selectAll("text").remove();
    var ellipseG = ellipseContainer.selectAll("ellipse");
    ellipseG.transition().duration(500).attr("rx", 0).attr("ry", 0);

    var pathOne = groupOne.selectAll("path");
    pathOne.transition()
      .ease(d3.easePoly)
      .duration(1000)
      .attrTween("d", arcTweenClose)
      .style("opacity", 0);

    var pathOne = groupTwo.selectAll("path");
    pathOne.transition()
      .ease(d3.easePoly)
      .duration(1000)
      .attrTween("d", arcTweenClose)
      .style("opacity", 0);

    var pathOne = groupThree.selectAll("path");
    pathOne.transition()
      .ease(d3.easePoly)
      .duration(1000)
      .attrTween("d", arcTweenClose)
      .style("opacity", 0);

    var monthRain = container.select(".rainG")
      .transition().duration(500).style("opacity", 0);

    var labelsContainer = lables.selectAll("text")
      .transition().duration(500).style("opacity", 0);

    var cityCircleContainer = cityCircles.selectAll("circle")
      .classed("clicked", false);

    function arcTweenClose(d) {
      var i = d3.interpolateNumber(70, 0);
      return function(t) {
        var r = i(t),
          arc = d3.arc()
          .outerRadius(r - 2)
          .innerRadius(r)
        return arc(d);
      };
    }
    legend.selectAll("text").remove();
  }

  function removeEllipses() {
    cityLables.selectAll("text").remove();
    var ellipseG = ellipseContainer.selectAll("ellipse");
    ellipseG.transition().duration(500).attr("rx", 0).attr("ry", 0);

    var pathOne = groupOne.selectAll("path");
    pathOne.transition()
      .ease(d3.easePoly)
      .duration(1000)
      .attrTween("d", arcTweenClose)
      .style("opacity", 0);

    var pathOne = groupTwo.selectAll("path");
    pathOne.transition()
      .ease(d3.easePoly)
      .duration(1000)
      .attrTween("d", arcTweenClose)
      .style("opacity", 0);

    var pathOne = groupThree.selectAll("path");
    pathOne.transition()
      .ease(d3.easePoly)
      .duration(1000)
      .attrTween("d", arcTweenClose)
      .style("opacity", 0);

    var monthRain = container.select(".rainG")
      .transition().duration(500).style("opacity", 0);

    var labelsContainer = lables.selectAll("text")
      .transition().duration(500).style("opacity", 0);

    var cityCircleContainer = cityCircles.selectAll("circle")
      .classed("clicked", false);

    function arcTweenClose(d) {
      var i = d3.interpolateNumber(70, 0);
      return function(t) {
        var r = i(t),
          arc = d3.arc()
          .outerRadius(r - 2)
          .innerRadius(r)
        return arc(d);
      };
    }
  }

  function onClickTextFunction(d) {
    yearsContainer.selectAll("text")
      .attr("font-size", 12)
      .style("fill", "white")
      .style("font-family", "imported-Azo")

    d3.select(d)
      .attr("font-size", 24)
      .style("fill", "#9C3C41")
      .style("font-family", "imported-Azo-Bold");
  }

  function drawAll(data) {
    var dataSet;
    yearSelected = data.id;
    switch (data.id) {
      case "1990":
        dataSet = rain1990;
        break;
      case "1995":
        dataSet = rain1995;
        break;
      case "2000":
        dataSet = rain2000;
        break;
      case "2005":
        dataSet = rain2005;
        break;
      case "2010":
        dataSet = rain2010;
        break;
      case "2013":
        dataSet = rain2013;
        break;
    }

    var circleTransition = d3.transition()
      .ease(d3.easeExp)
      .duration(1000);

    firstMin = d3.min(dataSet);
    firstMax = d3.max(dataSet);
    // console.log(dataSet);
    radScale = d3.scaleLinear()
      .domain([firstMin, firstMax])
      .range([4, 24]);

    var selectContainerCircles = cityCircles.selectAll("circle")
      .data(dataSet);

    selectContainerCircles.exit().remove();

    selectContainerCircles.enter().append("circle")
      .attr("r", 0);

    selectContainerCircles.transition().duration(500)
      .attr("r", function(d) {
        return radScale(d);
      })
      .attr("cx", function(d, i) {
        return stationCord[i][0];
      })
      .attr("cy", function(d, i) {
        return stationCord[i][1];
      })

    let managedArray = [];
    var sortedData = dataSet.sort(d3.descending);
    managedArray.push(sortedData[0]);
    managedArray.push(sortedData[sortedData.length / 2]);
    managedArray.push(sortedData[sortedData.length - 1]);
    console.log(firstMin);

    legend.select("circle")
      .data(managedArray)
      .enter().selectAll("circle").transition().duration(500)
      .attr("transform", function(d, i) {
        return "translate(0," + (-radScale(d)) + ")";
      })
      .attr("r", function(d) {
        return radScale(d);
      });

    legend.select("line")
      .data(managedArray)
      .enter().selectAll("line").transition().duration(500)
      .attr("transform", function(d, i) {
        return "translate(0," + (-radScale(d) * 2) + ")";
      });

    legend.selectAll("text")
      .data(managedArray)
      .enter().append("text")
      .attr("transform", function(d, i) {
        return "translate(" + ((i * 50) + 12) + "," + ((-radScale(d) * 2) - 6) + ")";
      })
      .text(function(d) {
        return d + "mm";
      })
      .style("font-size", "6pt")
      .style("fill", "white");
  }
  d3.selectAll("g").raise();

  window.addEventListener("click", function(event) {
    if (
      event.srcElement.className == "content-page open" &&
      event.srcElement.id == "D3" ||
      event.srcElement.id == "control-canvas" ||
      event.srcElement.id == "map-canvas"
    ) {
      // yearsContainer.selectAll("text")
      //   .attr("font-size", 12)
      //   .style("fill", "white")
      //   .style("font-family", "imported-Azo");

      removeEllipses();
    }
  });
});