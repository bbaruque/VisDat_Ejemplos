var w = 550;
var h = 300;

var padding = 20;

var dataset = [
      [ 5,     20 ],
      [ 480,   90 ],
      [ 250,   50 ],
      [ 100,   33 ],
      [ 330,   95 ],
      [ 410,   12 ],
      [ 475,   44 ],
      [ 25,    67 ],
      [ 85,    21 ],
      [ 220,   88 ]
];

// Definición de las escalas //
var xScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, function(d){return d[0];})])
    .range([padding, w-(padding*2)]);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, function(d) { return d[1]; })])
    .range([h-padding,padding]);

// Se puede plantear incluir una escala para el TAMAÑO del punto (más grande cuanto más valor)
var rScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, function(d) { return d[1]; })])
    .range([2, 5]);

// Se añade el lienzo SVG
var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

// Se añaden los puntos de datos
svg.selectAll("circle")
    .data(dataset)
    .enter()
        .append("circle")
        .attr("cx", function(d) {
            return xScale(d[0]);
        })
        .attr("cy", function(d) {
            return yScale(d[1]);
        })
        .attr("r", 5);
    
// Se añade una etiqueta para cada punto
svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text( function(d) {
        return d[0] + "," + d[1];
    })
    .attr("x",function(d) {
        return xScale(d[0])+5;
    })
    .attr("y",function(d) {
        return yScale(d[1]);
    })
    .attr("class","etiqueta");
   
    // INCLUIR EJES