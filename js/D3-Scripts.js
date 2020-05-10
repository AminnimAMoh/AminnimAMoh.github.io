var scrollable = d3.select("#page");

d3.select("#mainButtn").on('click', function() {

  var scrollheight = scrollable.property("scrollHeight");

  d3.select("#mainButtn").transition().duration(3000)
    .tween("uniquetweenname", scrollTopTween(scrollheight));
});

d3.select("#up").on('click', function() {
  d3.select("#mainButtn").transition().duration(1000)
    .tween("uniquetweenname", scrollTopTween(0));
});

// function scrollTopTween(scrollTop) {
//   return function() {
//     var i = d3.interpolateNumber(this.scrollTop, scrollTop);
//     return function(t) {
//       this.scrollTop = i(t);
//     };
//   };
}