/* 
Autor: Federico Roldan.
Clase: 3.
Desafio: Crear un algoritmo utilizando un ciclo.
Informacion sobre el ejercicio: La idea de este Script, esta inspirada en la piramide que hicimos en la clase, pero nuestro objetivo es generar la forma de un diamante
utilizando espacios y simbolos.
 */
confirm("Este Script generaremos con codigo el dibujo de un diamante.");
let n = parseInt(prompt("Ingrese el numero de filas de su diamante"));

for(i = 1; i<=n;i++) {
    //Dibujamos los espacios, no me tomaba el " ". Por lo que recurri a utilizar segun la documentacion HTML, &nbsp, que es un espacio sin ruptura.
    for(j = i; j <=n; j++) {document.write("&nbsp ")} 
    for(k= 1; k<=2*i-1; k++) {document.write("*")}
    document.write("<br>");
}
for(i = n-1; i>=1;i--) {
    for(j = n; j >=i; j--) {document.write("&nbsp ")}
    for(k= 1; k<=2*i-1; k++) {document.write("*")}
    document.write("<br>");
}
