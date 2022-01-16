/* 
Autor: Federico Roldan.
Clase: 6.
Desafio: Incorporar Arrays.
Informacion sobre el ejercicio: Calcula cuanto vas a gastar si realizas compras en el exterior o por internet desde Argentina.
- Calcular el importe para el impuesto Aduanero del 50%.
- Calcular el importe para el impuesto Dolar Turista del 30%.
- Realizar la conversión total USD -> ARS con los impuestos incluidos.
 */


class Producto {
    constructor(description, amount, weight) {
        this.description = description;
        this.weight = weight;
        this.amount = amount
    }
    calcular () {
        let [ars, impuestoAduanero, impuestoDolarTurista, total] = CalcularImpuestosProductos(this.amount);
        return [ars, impuestoAduanero, impuestoDolarTurista, total]
    }
} 


const CalcularImpuestosProductos = (usd) =>{
    let ars = DolarAPesos(usd);
    let impuestoAduanero = parseFloat(ars * 0.5);
    let impuestoDolarTurista = parseFloat(ars * 0.3);
    let total = impuestoAduanero + impuestoDolarTurista + ars;
    return [ars, impuestoAduanero, impuestoDolarTurista, total]
}

const DolarAPesos = (usd) =>{
    return parseFloat(usd * 102)
}



let arrayProducto = []; 

/* 
Utilice un cliclo "do" ya que con un "while" y un "for" no encontre la forma de utilizar el confirm sin que quedara fuera del ciclo y este
me sirviera de "bandera" para añadir productos y romper el ciclo. 
Siempre que el confirm retorne un true, se añadira un nuevo ojeto y preguntara si se desea añadir uno nuevo.
*/
do{
    var result = confirm("Fede ¿Deseas añadir nuevos productos?");
    if(result){
        let description = prompt("Descripcion del Producto");
        let amount = prompt("Monto en dolares");
        let weight = prompt("Peso en Kg del producto");
        arrayProducto.push(new Producto(description, amount, weight));
    }
}
while(result);

/* 
Recorremos el array y mostramos todos los datos de los productos
*/

for (let producto of arrayProducto){

    console.log(producto.description + " Monto:" + producto.amount + "U$D Peso:", producto.weight + "Kg");
    
    let [ars, impuestoAduanero, impuestoDolarTurista, total] = Producto.mostrar();
    console.log( "Valor en Pesos" + ars + "AR$");
    console.log( "Impuesto Aduanero" + impuestoAduanero + "AR$"); 
    console.log( "Impuesto Dolar Turista" + impuestoDolarTurista + "AR$");
    console.log( "Total" + total + "AR$")
    /* 
    document.write("<br>");
    document.write("<H2>Descripcion: " + producto.description + "</H2>");
    document.write("<H3>Monto: " + producto.amount + "U$D</H3>");
    document.write("<H3>Peso: " + producto.weight + "KG</H3>");

    let [ars, impuestoAduanero, impuestoDolarTurista, total] = producto.mostrar();
    document.write("<H3>Monto en pesos: " + ars + "AR$</H3>");
    document.write("<H3>Impuesto Aduanero: " + impuestoAduanero + "AR$</H3>");
    document.write("<H3>Impuesto Dolar Turista: " + impuestoDolarTurista + "AR$</H3>");
    document.write("<H3>Total a pagar: " + total + "AR$</H3>"); 
    */
    
}