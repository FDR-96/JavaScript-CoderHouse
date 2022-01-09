/* 
Autor: Federico Roldan.
Clase: 4.
Desafio: Funciones relacionadas.
Informacion sobre el ejercicio: Utilizare la conguencia de Zeller para calcular el dia en el que nacio una persona. La conguencia de Zeller nos permite calcular
el dia de la semana a partir de el año, mes y dia.
Voy a usar la fórmula listada en la wikipedia, en donde se recibe el año, mes y día. A partir de ellos se calcula a, y, m y d.
Link de la wikipedia: https://es.wikipedia.org/wiki/Congruencia_de_Zeller
 */

var IngresarFecha = () => {
    let año = parseInt(prompt("Ingrese el Año en el que nacio"));
    let mes = parseInt(prompt("Ingrese el mes"));
    let dia = parseInt(prompt("Ingrese el Dia"));
    return [dia, mes, año]
}

var DiaDeLaSemana = (dia, mes, año) =>{
    let a = parseInt((14 - mes)/12);
    let y = año - a;
    let m = parseInt(mes+(12*a)-2);
    let diaDeLaSemana = (dia + y +parseInt(y/4)-parseInt(y/100)+parseInt(y/400)+((31*m)/12))%7
    return parseInt(diaDeLaSemana)
}

var NombreDelDia = (numDia) => {return ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"][numDia]}

var mostrarDia = (diaSemana, dia, mes, año) => {
    console.log("Si tu Fecha de Nacimiento es: " + dia + "/" + mes + "/" + año)
    console.log("Naciste un " + NombreDelDia(diaSemana) + ".");
}

let[dia, mes, año] = IngresarFecha();
let diaSemana = DiaDeLaSemana(dia, mes, año);
mostrarDia(diaSemana, dia, mes, año);