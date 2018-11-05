// Se configuran los datos a emplear
var dataset = [
    { label: 'Abulia', count: 10 },
    { label: 'Betelgeuse', count: 20 },
    { label: 'Cantaloupe', count: 30 },
    { label: 'Dijkstra', count: 40 }
  ];

// Dimensiones del gráfico  
var width = 360;
var height = 360;
var radius = Math.min(width, height) / 2; // El radio de la tarta: la mitad de la mayor de las dimensiones del gráfico

// Si hubiera muchos datos, se puede emplear una escala definida por el programador
var color = d3.scaleOrdinal(d3.schemeCategory20b);

// Se crea el lienzo (con altura y anchura). Se coloca en el centro del mismo.
var svg = d3.select('#chart')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');

// Se definen los parametros generales de la tarta (radio completo)
var arc = d3.arc()
  .innerRadius(0)
  .outerRadius(radius);

// Se generan las diferentes secciones de la tarta. 
// El angulo se adapta en cada una al valor que se está representando.
// Este calculo lo realiza la libreria D3.
var pie = d3.pie()
  .value(function(d) { return d.count; })
  .sort(null);

// Se genera la gráfica final
var path = svg.selectAll('path')
  .data(pie(dataset)) // Se facilitan los datos a la funcion que genera las partes
  .enter()
    .append('path') // Se añade el elemento SVG correspondiente (es un trazo o 'path')
    .attr('d', arc)
    .attr('fill', function(d, i) { // Se rellena del color correspondiente
      return color(d.data.label);
    });


//////////// LEYENDA ////////////

// Variables del tamaño
var legendRectSize = 18; // Tamaño cuadrados
var legendSpacing = 4; // Espaciado

// Se añade la leyenda
var legend = svg.selectAll('.legend')
    .data(color.domain()) // Los datos son los colores. Por cada uno, una entrada en la leyenda
  .enter() // Se van a incluir nuevos
  .append('g') // Se añade un grupo (luego se insertará el texto)
    .attr('class', 'legend')
    .attr('transform', function(d, i) { // Se van moviendo de posicion a medida que se recibe otro dato. La i marca el numero de datos introducidos hasta el momento.
      var height = legendRectSize + legendSpacing; // Posicion Y: altura de la leyenda + espacio
      var offset =  height * color.domain().length / 2; // Para la leyenda completa
      var horz = -2 * legendRectSize; // Cada entrada: para dejar hueco al texto, se mueve el cuadro a la izq.
      var vert = i * height - offset; // Cada entrada: en vertical se va incrementando con cada entrada nueva
      return 'translate(' + horz + ',' + vert + ')';
    });

// Se añaden los cuadros
legend.append('rect')
  .attr('width', legendRectSize)
  .attr('height', legendRectSize)
  .style('fill', color)
  .style('stroke', color);

// Se añaden los textos de la leyenda
legend.append('text')
  .attr('x', legendRectSize + legendSpacing)
  .attr('y', legendRectSize - legendSpacing)
  .text(function(d) { return d.toUpperCase(); }); // Simplemente el numero
