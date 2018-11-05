// Datos de prueba a representar
var data = [4, 8, 15, 16, 23, 42];

// Alto y ancho del gráfico
var width = 420,
    barHeight = 20;

// Escala a emplear 
//permite adaptar el diseño del gráfico al tamaño en pixeles real
var max = d3.max(data);
var x = d3.scaleLinear()
    .domain([0, max])
    .range([0, width]);

// Adds the svg canvas
var svg = d3.select("body")
    .append("svg")
        .attr("width", width)
        .attr("height", barHeight * data.length)
    .append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"});

//
svg.selectAll("rect")
    .data(data)
    .enter()
        .append("rect")
        .attr("width", function(d) { return x(d); }) 
        .attr("height", barHeight - 1 )
        .attr("y", function(d,i) { return i * barHeight; });

//    
svg.selectAll("text")
    .data(data)
    .enter()
    .append("text")
        .attr("x", function(d) { return x(d) + 10; })
        .attr("y", function(d,i) { return (i * barHeight) + barHeight*2/3; })
        .text(function(d) { return d; });
