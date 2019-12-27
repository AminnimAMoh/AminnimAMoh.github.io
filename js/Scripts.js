window.addEventListener('mouseup', function(event) {
  if (window.width > 600) {
    var eOne = document.getElementById("mySide");
    var eTwo = document.getElementById("nav-icon1");
    if (event.target != eOne || event.target == eTwo || event.target.parentNode == eTwo) {
      if (eOne.classList.contains('open')) {
        eOne.classList.remove('open');
        eTwo.classList.remove('open');
      } else {
        menuToggle(event);
      }
    }
  } else {
    menuToggle(event);
  }
});

function menuToggle(e) {
  console.log(e.target)
  var eOne = document.getElementById("mySide");
  var eTwo = document.getElementById("nav-icon1");
  if (e.target == eTwo || event.target.parentNode == eTwo) {
    if (eOne.classList.contains('open')) {
      eOne.classList.remove('open');
      eTwo.classList.remove('open');
    } else {
      eOne.classList.add('open');
      eTwo.classList.add('open');
    }
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

function hoverOnClassToggle(e) {
  var ele = document.getElementById(e);
  ele.classList.add("open");
}

function hoverOffClassToggle(e) {
  var ele = document.getElementById(e);
  ele.classList.remove("open");
}

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

  modal.style.display = "block";
  modalImg.src = img.src;
  if (ele.length > 2) {
    modalP.style.display = "block";
    var p = ele[2];
    modalP.innerHTML = p.innerHTML;
  } else {
    modalP.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

function showInfo(container, button) {
  var eOneC = document.getElementById(container.id);
  var eOneB = document.getElementById(button);
  if (eOneC.classList.contains('open')) {
    eOneC.classList.remove("open");
    eOneB.classList.remove("open");
  } else {
    eOneC.classList.add('open');
    eOneB.classList.add('open');
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
  if (e == "Info-slider-1" || e == "Info-slider-2" || e == "Info-slider-3" || e == "Info-slider-4" || e == "Info-slider-5" || e == "Info-slider-6")
    window.setTimeout(function() {
      offsetAnchor();
    }, 0);
}

function offsetAnchor() {
  if (location.hash.length !== 0) {
    window.scrollTo(window.scrollX, window.scrollY - 440);
  }
}

window.setTimeout(offsetAnchor, 0);