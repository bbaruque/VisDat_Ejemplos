// Variables que establecen el tamaño del lienzo
var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

// Se necesita realizar la conversión de los datos leidos (texto) a tipo de datos de fecha
var parseDate = d3.timeParse("%d-%b-%y");

// Se establecen los dos rangos
var x = d3.scaleTime().range([0, width]); // Nótese que el eje de las X incluirá un rango TEMPORAL
var y = d3.scaleLinear().range([height, 0]);

// Se definen los ejes
var xAxis = d3.axisBottom().scale(x).ticks(5);
var yAxis = d3.axisLeft().scale(y).ticks(5);

// Se define la línea a dibujar
var valueline = d3.line()
    .x(function(d) { return x(d.date); }) // X corresponde a la fecha
    .y(function(d) { return y(d.close); }); // Y corresponde al valor de cierre
    
// Se incluye el lienzo de dibujo 
var svg = d3.select("body")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

// Se leen los datos desde el fichero
d3.csv("data.csv").then(function(data) {
    
    console.log(data);

    // Por cada linea leida, se adaptan los formatos de los datos: de texto a fecha o número
    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.close = +d.close;
    });

    // Se puede esperar a definir el dominio de las escalas hasta haber leido los datos.
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.close; })]);

    // Se incluye la línea
    svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

    // Se incluye el eje X
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Se incluye el eje Y
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

});
