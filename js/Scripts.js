// beforecreate: function(node, targetNode, type, to) {
//   jQuery.ajax({
//     url: 'http://example.com/catalog/create/' + targetNode.id + '?name=' + encode(to.inp[0].value),
//     success: function(result) {
//       if (result.isOk == false) alert(result.message);
//     },
//     async: false
//   });
// }

function MyToggle() {
  var eOne = document.getElementById("mySide");
  var eTwo = document.getElementById("nav-icon1");
  if (eOne.classList.contains('open')) {
    eOne.classList.remove('open');
    eTwo.classList.remove('open');
  } else {
    eOne.classList.add('open');
    eTwo.classList.add('open');
  }
}

function aboutFunction() {
  var element = document.getElementById('foot');
  if (element.classList.contains('open')) {
    element.classList.remove('open');
  } else {
    element.classList.add('open');
  }
}

// function hoverToggle(e){
//   var e=document.getElementById(e);
//   if (e.classList.contains("open")){
//     e.classList.remove("open");
//   }else{
//     e.classList.add("open")
//   }
// }
// $(document).ready(function() {
//   $("#About-P5,#BackB").hover(function() {
//     $(this).toggleClass("open");
//   });
// });

function shapeShoft(ele) {
  var c = document.getElementById("eleOne");
  var r = document.getElementById("eleTwo");
  if (ele == "eleOne") {
    resive.value = "eleOne";
    c.classList.add('open');
    r.classList.remove('open');
  } else if (ele == "eleTwo") {
    resive.value = "eleTwo";
    c.classList.remove('open');
    r.classList.add('open');
  }
}


var modal = document.getElementById("Large");

function imgSelect(e) {
  var ele = document.getElementsByClassName(e);
  var img = ele[1];
  var modalImg = document.getElementById("img-1");
  var modalP = document.getElementById("lp-1");
  // var captionText = document.getElementById("caption");

  modal.style.display = "block";
  modalImg.src = img.src;
  if (ele.length > 2) {
    modalP.style.display = "block";
    var p = ele[2];
    modalP.innerHTML = p.innerHTML;
  } else {
    modalP.style.display = "none";
  }
  // captionText.innerHTML = this.alt;
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

function showInfo(e) {
  var eOne = document.getElementById(e.id);
  if (eOne.classList.contains('open')) {
    eOne.classList.remove("open");
  } else {
    eOne.classList.add('open');
  }
}

window.onscroll = function() {
  scrollFunction()
};

function scrollFunction() {
  if (document.body.scrollTop > 720 || document.documentElement.scrollTop > 720) {
    document.getElementById("topB").classList.add('open');
  } else {
    document.getElementById("topB").classList.remove('open');
  }
}

function feuse(e, c) {
  var ele = document.getElementById(e);
  var array = document.getElementsByClassName(c);
  if (c == "slider-button") {
    var arrayTwo = document.getElementsByClassName("Info-slider-button");
    for (var i = 0; i < arrayTwo.length; i++) {
      arrayTwo[i].classList.remove('active');
    }
  } else {
    arrayTwo = document.getElementsByClassName("slider-button");
    for (var i = 0; i < arrayTwo.length; i++) {
      arrayTwo[i].classList.remove('active');
    }
  }
  for (var i = 0; i < array.length; i++) {
    array[i].classList.remove('active');
  }
  ele.classList.add('active');
}
// The function actually applying the offset
function offsetAnchor() {
  if (location.hash.length !== 0) {
    window.scrollTo(window.scrollX, window.scrollY - 455);
  }
}

// // Captures click events of all <a> elements with href starting with #
// $(document).on('click', 'a[href^="#Info"]', function(event) {
//   // Click events are captured before hashchanges. Timeout
//   // causes offsetAnchor to be called after the page jump.
//   window.setTimeout(function() {
//     offsetAnchor();
//   }, 0);
// });
//
// // Set the offset when entering page with hash present in the url
// window.setTimeout(offsetAnchor, 0);