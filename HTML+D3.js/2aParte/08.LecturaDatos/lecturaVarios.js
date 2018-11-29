var csvfiles = ["cities.csv"]; // podría haber varios ficheros, siempre que sean del mismo tipo
var tsvfiles = ["animals.tsv"];
var promises = [];

csvfiles.forEach(function(url) {
    promises.push(d3.csv(url))
});

tsvfiles.forEach(function(url) {
    promises.push(d3.tsv(url))
});

Promise.all(promises).then(function(values) {
    console.log(values)
});
