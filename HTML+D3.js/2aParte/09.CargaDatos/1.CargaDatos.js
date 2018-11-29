/**
 * Ejemplo que incluye todos los conceptos anteriores en el mismo.
 */

var w = 300;
var h = 200;
var barPadding = 1;  

    // Se incluye el lienzo SVG, incluyendo su altura y anchura
var svg = d3.select("body")
    .append("svg")
        .attr("width", w)
        .attr("height",h);

// La funcion CSV obtiene los datos de un fichero de texto
/* Esto permite obtener los datos de una fuente externa y actualizar los gráficos
cuando sea necesario. La ruta que se incluye en este ejemplo es local, pero puede 
ser una URL para consumir datos desde un servidor (también es común emplear el 
formato JSON) */

// Se obtiene el contenido completo y en la función incluida en el parámetro,
// se indica cómo se procesará el contenido.
d3.csv("./data.csv").then( function(data) {
 
    console.log(data); // Para ver el contenido completo

    // Se incluye una barra por cada dato
    svg.selectAll("rect")
    .data(data)
    .enter()
        .append("rect") 
        .attr("x", function(d,i){ 
            return (i * w/data.length); // Separados de forma equidistante
        })  
        .attr("y", function(d) { // Con una altura dependiente del dato
            return h - (type(d).dato*5);
        })
        .attr("width", w / data.length - barPadding)
        .attr("height", function(d){
            console.log(type(d));
            return type(d).dato*5; 
        })  
});

function type(d) {
     d.dato = +d.dato; // Obligamos a convertir el dato a número (si no, se lee como una cadena)
    return d;
}