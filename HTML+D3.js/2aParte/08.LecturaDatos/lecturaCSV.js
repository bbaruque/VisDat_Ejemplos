/* Lectura Simple */
d3.csv ("./cities.csv").then( function (data) {
  console.log (data[0]);
}); // Ver resultado en la consola javascript del navegador (en Herramientas del Programador)

/* Lectura con conversion de datos */
d3.csv ("./cities.csv").then( function (data) {
  data.forEach ( function (d) {
    d.poblacion = +d.poblacion;
    d["superficie terreno"] = +d["superficie terreno"];
  });
  console.log (data[0]);
});

/* Lectura de datos con conversión COMPLETA*/
d3.csv("./cities.csv", function(d) { // Al leer los datos, se puede incluir una función de parseo o conversión
    return { // La funcion simplemente devuleve los mismos datos, despues de hacer una conversión de tipos
      ciudad : d.ciudad,
      estado : d.estado,
      poblacion : +d.poblacion,
      superficie_terreno : +d["superficie terreno"]
    };
  }).then(  function(data) { // Una vez realizada la conversión, se aplica el "then" y se procesan los datos
    console.log(data);
  });