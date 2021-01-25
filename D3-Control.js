var sketchContainer = document.getElementById("d3-container");
var menuSwitch = false;
var overlayOffset = "70vw";
var rad = 120;
var circlesRad = 40;
var menuData = [{
    name: "D3",
    img: "Assets/Buttons-Icon/Map.png",
    toolKit: "D3.js Project",
    width: 200
}, {
    name: "Info",
    img: "Assets/Buttons-Icon/info.png",
    toolKit: "Who am I",
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
}, {
    name: "UI",
    img: "Assets/Buttons-Icon/UI.png",
    toolKit: "React.js User Interaction",
    width: 90
}, {
    name: "CP",
    img: "Assets/Buttons-Icon/ColorPalette.png",
    toolKit: "P5.js Image to Color palette",
    width: 150
}];
var Can = d3.select("#d3-container").append("svg").attr("id", "control-canvas");
var menuButtonsGroupContainer = Can.append("g").attr("id", "menuButtons-Group");
var menuButtons = menuButtonsGroupContainer.append("g").attr("id", "menuButtons");
var menuButtonsBack = Can.append("g");
var iconContainer = menuButtons.append("g").attr("id", "menu-Icons");
var toolKitGroupText = menuButtons.append("g").attr("id", "tool-Kit-Group-text");
var imgDefs = Can.append("defs")


/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
///////////////////////////Image Background///////////////////////////
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
var img_id = function (d) { return ("img_" + d.name) }
var img_url = function (d) { return ("url(#img_" + d.name + ")") }
var imgPattern = imgDefs.selectAll("pattern")
    .data(menuData)
    .enter().append("pattern")
    .attr("id", img_id)
    .attr("width", 1)
    .attr("height", 1)
    .attr("patternUnits", "objectBoundingBox")
    .append("image")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", circlesRad * 2)
    .attr("height", circlesRad * 2)
    .attr("xlink:href", function (d) {
        return d.img;
    })

/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
///////////////////////////Image Background///////////////////////////
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/



/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
///////////////////////////Circles Drop Shadow////////////////////
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
///////////////////////////Circles Drop Shadow////////////////////
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/

/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
///////////////////////////Circles Drop Shadow White//////////////
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
var defs = Can.append("defs");


var filter = defs.append('filter')
    .attr('id', 'drop-shadow-White')
    .attr('y', '-100%')
    .attr('x', '-100%')
    .attr('height', '330%')
    .attr('width', '330%')

filter.append('feGaussianBlur')
    .attr('in', 'SourceAlpha')
    .attr('stdDeviation', 25)

filter.append('feOffset')
    .attr('dx', 8)
    .attr('dy', 8)
    .attr('result', 'offsetblur')

filter.append('feFlood')
    .attr('flood-color', "#E4E5E7")
    .attr('flood-opacity', '.1')

filter.append('feComposite')
    .attr('in2', 'offsetblur')
    .attr('operator', 'in')

var feMerge = filter.append('feMerge')

feMerge.append('feMergeNode')
    .attr('in', 'offsetBlur')
feMerge.append('feMergeNode')
    .attr('in', 'SourceGraphic')
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
///////////////////////////Circles Drop Shadow White//////////////
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

function redrawControl() {
    var w = sketchContainer.clientWidth;
    var h = sketchContainer.clientHeight;
    Can.attr("width", w)
        .attr("height", h);

    var toolKitPath = toolKitGroupText.selectAll("path")
        .data(menuData)
        .enter().append("path")
        .attr("id", function (d, i) {
            return "wavy" + d.name;
        }) //Unique id of the path
        .attr("d", "M " + (-circlesRad - 5) + ",-10 A 42.5,42.5 0 0,1 " + (circlesRad + 5) + ",-10")
        .attr("transform", function (d, i) {
            var angle = ((2 * Math.PI) / menuData.length * i);
            return "translate(" + ((rad) * Math.cos(angle)) + ", " + ((rad) * Math.sin(angle) - 5) + ")"
        })
        .style("fill", "none")
        .style("stroke", "none");

    var toolKitTexy = toolKitGroupText.selectAll("text")
        .data(menuData)
        .enter().append("text")
        .append("textPath")
        .attr("xlink:href", function (d, i) {
            return "#wavy" + d.name;
        })
        .attr("startOffset", "50%")
        // .attr("transform", function (d, i) {
        //     var r = rad;
        //     var angle = ((2 * Math.PI) / menuData.length * i);
        //     return "translate(" + (rad / 2) * Math.cos(angle) + "," +
        //         (rad / 2) * Math.sin(angle) + ")";
        // })
        .text(function (d) {
            return d.toolKit;
        })
        .attr("class", "toolKit-text")
        .attr("id", function (d, i) {
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
    // var menuIcon = iconContainer.selectAll("image")
    //     .data(menuData)
    //     .enter().append("image")
    //     .attr("xlink:href", function(d) {
    //         return d.img;
    //     })
    //     .attr("transform", function(d, i) {
    //         var r = rad;
    //         var angle = ((2 * Math.PI) / menuData.length * i);
    //         return "translate(" + (r / 2) * Math.cos(angle) + "," +
    //             (r / 2) * Math.sin(angle) + ")";
    //     })
    //     .attr("height", (rad / 2))
    //     .attr("width", (rad / 2));
    var menu = menuButtons.selectAll("circle")
        .data(menuData)
        .enter().append("circle")
        .attr("transform", function (d, i) {
            var angle = ((2 * Math.PI) / menuData.length * i);
            return "translate(" + ((rad) * Math.cos(angle)) + ", " + ((rad) * Math.sin(angle)) + ")"
        })
        .attr("r", circlesRad)
        .style("fill", function (d) {
        })
        .attr("class", "button-circle")
        .attr("id", function (d) {
            return d.name;
        })
        .on("mouseenter", function (d, i) {
            var data = d;
            var thisBoxName = "#" + this.id + "-tool-box";
            var thisTextName = "#" + this.id + "-tool-text";
            toolKitGroupText.select(thisTextName).style("opacity", "1");
        })
        .on("mouseout", function (d, i) {
            var data = d;
            var thisTextName = "#" + this.id + "-tool-text";
            toolKitGroupText.selectAll(thisTextName).style("opacity", "0");
        })
        .on("click", function (d, i) {
            if (menuSwitch) {
                menuButtons.selectAll("circle").classed("selected", false);
                var index = i;
                var name = d.name;
                var newIndex = i;
                var contentLayer = document.getElementsByClassName("content-page");
                for (var i = 0; i < contentLayer.length; i++) {
                    contentLayer[i].classList.remove("open");
                }
                document.getElementById("d3-container").style.marginLeft = "550px";
                var containerSelected = document.getElementById(name);
                containerSelected.classList.add("open");
                menuButtons.transition(menuTransition).duration(1000)
                    .attr("transform", function () {
                        let rotationAngle = 360 / menuData.length;
                        if (index == 0) {
                            index = menuData.length / 2;
                        } else if (index == menuData.length / 2) {
                            index = 0;
                        } else if (index == 2 || index == 4) {
                            rotationAngle /= 2;
                            if (index == 4) {
                                rotationAngle /= -2;
                            }
                        } else {
                            rotationAngle *= 2;
                        }
                        return "translate(0,0) rotate(" + (index * rotationAngle) + ")";
                    });

                menuButtons.selectAll("circle")
                    .transition(menuTransition)
                    .attr("transform", function (d, i) {
                        var angle = ((2 * Math.PI) / menuData.length * i);
                        let rotationAngle = newIndex * (360 / menuData.length);
                        return "translate(" + ((rad * 2) * Math.cos(angle)) + ", " + ((rad * 2) * Math.sin(angle)) + ") rotate(" + (180 + rotationAngle) + ")";
                    })

                    toolKitGroupText.selectAll("path")
                    .transition(menuTransition)
                    .attr("transform", function (d, i) {
                        var angle = ((2 * Math.PI) / menuData.length * i);
                        let rotationAngle = newIndex * (360 / menuData.length);
                        return "translate(" + ((rad * 2) * Math.cos(angle)) + ", " + ((rad * 2) * Math.sin(angle)) + ") rotate(" + (180 + rotationAngle) + ")";
                    })

                var toolKitText = toolKitGroupText.selectAll("text").selectAll("textPath")
                    .data(menuData)
                toolKitText.exit().remove();
                toolKitGroupText.select("text")
                    .data(menuData)
                    .enter().selectAll("text").selectAll("textPath")
                    .transition(menuOptionsTransition)
                    .attr("xlink:href", function (d, i) {
                        return "#wavy" + d.name;
                    });

                iconContainer.transition(menuTransition).duration(1000).attr("transform", function () {
                    if (newIndex == 0) {
                        return "translate(30,30)";
                    } else if (newIndex == 1) {
                        return "translate(-15,45)";
                    } else if (newIndex == 2) {
                        return "translate(-40,15)";
                    } else if (newIndex == 3) {
                        return "translate(-30,-30)";
                    } else if (newIndex == 4) {
                        return "translate(10,-45)";
                    } else if (newIndex == 5) {
                        return "translate(40,-15)";
                    }
                });
                d3.select(this).classed("selected", true);
            }
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
    var envelops = document.getElementsByClassName("inner-content");
    for (var i = 0; i < envelops.length; i++) {
        if (envelops[i].id != "inner-color" && envelops[i].id != "inner-d3") {
            envelops[i].classList.remove("open");
        }
    }
    var menuOptionsTransition = d3.transition()
        .ease(d3.easeQuad)
        .duration(500);
    menuSwitch = !menuSwitch;
    if (menuSwitch) {
        circlesRad = 60;
    } else {
        circlesRad = 40;
    }
    var newRad = rad * 2;

    let toolKitPath = toolKitGroupText.selectAll("path")
        .data(menuData)
        .exit().remove();

    toolKitPath.select("path")
        .data(menuData)
        .enter().selectAll("path")
        .transition(menuOptionsTransition)
        .attr("transform", function (d, i) {
            var angle = ((2 * Math.PI) / menuData.length * i);
            if (menuSwitch) {
                return "translate(" + ((newRad) * Math.cos(angle)) + ", " + ((newRad) * Math.sin(angle) - 5) + ")"
            } else {
                return "translate(" + ((rad) * Math.cos(angle)) + ", " + ((rad) * Math.sin(angle) - 5) + ")"
            }
        })
        .attr("d", "M " + (-circlesRad - 5) + ",-10 A 65.5,65.5 0 0,1 " + (circlesRad + 5) + ",-10");

    let iconDefs = imgDefs.selectAll("image")
        .data(menuData)
        .exit().remove();

    iconDefs.select("image")
        .data(menuData)
        .enter().selectAll("image")
        .transition(menuOptionsTransition)
        .attr("width", circlesRad * 2)
        .attr("height", circlesRad * 2);

    var menu = menuButtons.selectAll("circle")
        .data(menuData)
    menu.exit().remove();

    menu.select("circle")
        .data(menuData)
        .enter().selectAll("circle").transition(menuOptionsTransition)
        .attr("transform", function (d, i) {
            var angle = ((2 * Math.PI) / menuData.length * i);
            if (menuSwitch) {
                return "translate(" + ((newRad) * Math.cos(angle)) + ", " + ((newRad) * Math.sin(angle)) + ")"
            } else {
                return "translate(" + ((rad) * Math.cos(angle)) + ", " + ((rad) * Math.sin(angle)) + ")"
            }
        })
        .attr("r", function () {
            return circlesRad;
        })
        .attr("class", function () {
            if (menuSwitch) {
                return "button-circle clickable";
            } else {
                return "button-circle";
            }
        })
        .style("fill", img_url);


    var toolKitText = toolKitGroupText.selectAll("text").selectAll("textPath")
        .data(menuData)
    toolKitText.exit().remove();

    toolKitGroupText.selectAll("text")
        .data(menuData)
        .enter().append("text").append("textPath")
        .transition(menuOptionsTransition)
        .attr("xlink:href", function (d, i) {
            return "#wavy" + d.name;
        });
    // .attr("transform", function (d, i) {
    //     var r = rad;
    //     var angle = ((2 * Math.PI) / menuData.length * i);
    //     if (menuSwitch) {
    //         r = newRad * 2;
    //     } else {
    //         r = rad * 2;
    //     }
    //     return "translate(" + (r / 2) * Math.cos(angle) + "," +
    //         (r / 2) * Math.sin(angle) + ")";
    // });
    Can.selectAll("#Gradient").transition()
        .duration(1000)
        .attr("gradientTransform", function () {
            if (menuSwitch) {
                return "rotate(45)";
            } else {
                return "rotate(180)";
            }
        });
    if (!menuSwitch) {
        menuButtons.attr("transform", "rotate(0)");
        iconContainer.attr("transform", "translate(-30,-30)");
        redrawControl();
    }
}
redrawControl();
window.addEventListener("resize", function () {
    redrawControl();
});
/*---------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------
                                            Java Controle
-----------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/
var blumLights = document.getElementsByClassName("line-indicator");
var values = [85, 95, 95, 90, 95, 95, 98, 70, 75, 60, 80, 80, 60, 80, 70, 80, 60];
for (var i = 0; i < blumLights.length; i++) {
    blumLights[i].style.width = values[i] + "%";
    blumLights[i].innerText = "\n" + values[i] + "%";
}

function CVControl(element) {
    var child = document.getElementById(element);
    var trans = document.getElementById(child.parentElement.id);
    var e = trans.childNodes[5];
    e.classList.add("open");
}

function CVControlClose(element) {
    var child = document.getElementById(element);
    let recivedId = child.parentElement.id;
    let parent = document.getElementById(recivedId);
    let parentOfParent = document.getElementById(parent.parentElement.id);
    var e = parentOfParent.childNodes[5];
    e.classList.remove("open");
}