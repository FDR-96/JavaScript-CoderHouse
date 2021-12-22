console.log("¡Hola Fede! Para saber que tipo de Jubilacion le corresponde, ingrese su edad y sus años de antiguedad.");
let edad = parseInt(prompt("Ingrese su Edad."));
let antiguedad = parseInt(prompt("Ingrese cuantos años de antiguedad tiene."));
confirm("El resultado se puede ver en consola!");
if(edad >= 60 && antiguedad < 25){
    console.log("Con una edad de " + edad + " y con una antiguedad de " + antiguedad + ", te corresponde una Jubilacion por edad."); 
}else if(edad < 60 && antiguedad >= 25){
    console.log("Con una edad de " + edad + " y con una antiguedad de " + antiguedad + ", te corresponde una Jubilacion anticipada."); 
}else if(edad >= 60 && antiguedad >= 25){
    console.log("Con una edad de " + edad + " y con una antiguedad de " + antiguedad + ", te corresponde una Jubilacion ordinaria.") 
}else{
    console.log("Con una edad de " + edad + " y con una antiguedad de " + antiguedad + ", aun no  te corresponde una jubilacion.") 
}