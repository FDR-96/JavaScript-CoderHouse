/* 
Autor: Federico Roldan.
Clase: 5.
Desafio: Incorporar objetos.
Informacion sobre el ejercicio: Calcula cuanto vas a gastar si realizas compras en el exterior o por internet desde Argentina.
- Calcular el importe para el impuesto Aduanero del 50%.
- Calcular el importe para el impuesto Dolar Turista del 30%.
- Realizar la conversión total USD -> ARS con los impuestos incluidos.
 */


function Producto(description, amount, weight){
    this.description = description;
    this.weight = weight;
    this.amount = amount;
    this.mostrar = function(){    
        let[ars, impuestoAduanero, impuestoDolarTurista, total] = CalcularImpuestosProductos(this.amount);
        console.log(this.description, this.amount + "U$D", this.weight + "Kg");
        console.log(ars, impuestoAduanero, impuestoDolarTurista,  total);
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

const producto = new Producto("Sensor de Temperatura", 12, 0.1);
const producto2 = new Producto("Computadora", 522, 1.9);
if(confirm("Hola Fede. ¿Desea consultar los productos?.")){
    producto.mostrar();
    producto2.mostrar();
}