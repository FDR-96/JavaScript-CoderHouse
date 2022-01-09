/*Existen tres tipos de jubilaciones: por edad, por antigüedad anticipada y por antigüedad y edad adulta:
1.- Las personas con jubilación por edad deben tener 60 años o más y una antigüedad en su empleo de menos de 25 años.
2.- Las personas adscritas a la jubilación por antigüedad anticipada deben tener menos de 60 años y una antigüedad en su empleo de 25 años o más.
3.- Las personas adscritas a la jubilación por antigüedad adulta deben tener 60 años o más y una antigüedad en su empleo de 25 años o más.
*/
 
console.log("¡Hola Fede! Para saber que tipo de Jubilacion le corresponde, ingrese su edad y sus años de antigüedad.");
let edad = parseInt(prompt("Ingrese su Edad."));
let antiguedad = parseInt(prompt("Ingrese cuantos años de antigüedad tiene."));
confirm("!El resultado se puede ver en consola!");
if(edad >= 60 && antiguedad < 25){
    console.log("Con una edad de " + edad + " años y con una antigüedad de " + antiguedad + " años, te corresponde una Jubilacion por edad."); 
}else if(edad < 60 && antiguedad >= 25){
    console.log("Con una edad de " + edad + " años y con una antigüedad de " + antiguedad + " años, te corresponde una Jubilacion por antigüedad anticipada."); 
}else if(edad >= 60 && antiguedad >= 25){
    console.log("Con una edad de " + edad + " años y con una antigüedad de " + antiguedad + " años, te corresponde una Jubilacion por antiguedad y edad adulta.") 
}else{
    console.log("Con una edad de " + edad + " años y con una antigüedad de " + antiguedad + " años, aun no  te corresponde una jubilacion.") 
}
 
