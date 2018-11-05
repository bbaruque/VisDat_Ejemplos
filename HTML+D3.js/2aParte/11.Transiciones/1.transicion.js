// d3.select("body")
//    .transition()
//    .style("background-color", "lightblue");

var t = d3.transition()
   .duration(2000);

d3.select("body")
   .transition(t)
   .style("background-color", "lightblue");