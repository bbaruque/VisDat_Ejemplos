/*
  Se puede emplear el mismo esquema de trabajo que se está empleando con la función data.
  En este caso se emplea directamente el acceso a una URL para recuperar el fichero que
  se aloja en la misma.

  En este ejemplo, simplemente escribiremos los datos, para simplificar el ejemplo.

  Se puede extrapolar el ejemplo al caso en el que en lugar de añadir elementos de texto,
  se incluyan elementos gráficos de SVG, como se ha mostrado en anteriores ejemplos.

 */

// Se almacena temporalmente el espacio del DOM de la página sobre el que se va a trabajar. 
var parrafos = d3.select("body").selectAll("p");

// Empleando D3, se accede a un servidor de datos (Se trata del INE español)
d3.json('http://servicios.ine.es/wstempus/js/es/DATOS_TABLA/t13/p411/2011/02001.px?tip=AM')
  .then(

    // Por cada elemento de datos leido en el fichero
    function (data){

      parrafos
        .data(data)
      .enter() // Sobre los elementos nuevos, se añade un párrafo
        .append("p")
          .text(function(d){return parseJSON(d)}); // Como texto, se incluye el contenido de los datos
    }
);

// Función auxiliar para desempaquetar la información obtenida del servidor
// El formato en el que se facilitan obliga a acceder a diferentes campos
function parseJSON(element){
  console.log(element);
  return(element.Nombre+": "+element.Data[0].Valor);
}