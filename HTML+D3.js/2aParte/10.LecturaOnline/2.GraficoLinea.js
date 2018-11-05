/**
 * En este ejemplo, se separa la carga de datos del dibujo de la gráfica.
 * Inicialmente se obtienen los datos, empleando la función fetch (incluida en javascript)
 * y se emplean los datos leídos para generar el gráfico con la librería D3.js.
 * 
 * Como se ve en el ejemplo 1, se puede realizar toda la operación empleando la librería D3.
 */

//API que permite acceder al histórico del Bitcoin Price Index
const api = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2017-12-31&end=2018-04-01';

/**
 * Se puede esperar a leer los datos a que se acabe de cargar la página inicialmente
 * Esto evita posibles problemas de sincronización en ejemplos más complejos
 */
document.addEventListener("DOMContentLoaded", function(event) {
fetch(api)
    .then(function(response) { return response.json(); })
    .then(function(data) {
        var parsedData = parseData(data);
        drawChart(parsedData);
    })
    .catch(function(err) { console.log(err); })
});

/**
 * Se formatean los datos en pares de fecha y valor
 * @param {object} Objeto de datos que contiene el array obtenido
 */
function parseData(data) {
    var arr = [];
    for (var i in data.bpi) {
        arr.push({
            date: new Date(i), //Dato de tipo fecha
            value: +data.bpi[i] //Se convierte de texto a numero
        });
    }
    return arr;
}

/**
 * Se genera el gráfico empleando la librería D3
 * @param {object} Objewto de datos que contiene el histórico de BPI
 */
function drawChart(data) {
var svgWidth = 600, svgHeight = 400;
var margin = { top: 20, right: 20, bottom: 30, left: 50 };
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Se genera el lienzo SVG
var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Se mueve para centrarlo en la pantalla
var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Se generan las escalas (una es de formato temporal y la otra lineal)
var x = d3.scaleTime()
    .rangeRound([0, width]);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);
    // Se definen los dominios de las escalas
    x.domain(d3.extent(data, function(d) { return d.date }));
    y.domain(d3.extent(data, function(d) { return d.value }));

// Se genera la función de línea que permite indicar el trazo que se emplea por dato
var line = d3.line()
    .x(function(d) { return x(d.date)})
    .y(function(d) { return y(d.value)})

// Se genera e incluye el eje de las X (eje inferior)
g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .select(".domain")
    .remove();

// Se genera e incluye el eje de las Y (eje izquierdo)
g.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Price ($)");

// Se añade la línea de la gráfica (empleando la función de línea que se ha mostrado antes)
g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);
}
