/* 
Autor: Federico Roldan.
Clase: 4.
Desafio: Simulador interactivo.
Informacion sobre el ejercicio: Calcula cuanto vas a gastar si realizas compras en el exterior o por internet desde Argentina.
- Calcular el importe para el impuesto Aduanero del 50%.
- Calcular el importe para el impuesto Dolar Turista del 30%.
- Realizar la conversión total USD -> ARS con los impuestos incluidos.
 */

var IngresarMonto = () => {
    let monto = parseInt(prompt("Ingrese el monto de su compra en dolares"));
    let usdHoy = parseInt(prompt("Ingrese el valor del dolar oficial"));
    return [monto, usdHoy]
}

var CalcularImpuestos = (usd, usdHoy) =>{
  let ars = parseFloat(usd * usdHoy);
  let impuestoAduanero = parseFloat(ars * 0.5);
  let impuestoDolarTurista = parseFloat(ars * 0.3);
  let aPagar = impuestoAduanero + impuestoDolarTurista + ars;
  return [ars, impuestoAduanero, impuestoDolarTurista, aPagar]
}

var MostrarResultados = (usd, usdHoy, ars, impuestoAduanero, impuestoDolarTurista, aPagar) => {
    document.write("<h1>Calculadora de compras en el exterior</h1>");
    document.write("Monto de la compra: " + usd + "U$D");
    document.write("<br>");
    document.write("<br>"); 
    document.write("1AR$ = "+ usdHoy + "U$D");
    document.write("<br>");
    document.write("AR$.................." + ars);
    document.write("<br>");
    document.write("AFIP 35%............." + impuestoDolarTurista);
    document.write("<br>");
    document.write("Aduana 50%..........." + impuestoAduanero);
    document.write("<br>");
    document.write("<h5>TOTAL</h5>" + aPagar);

}
let [monto, usdHoy] = IngresarMonto();
alert("Los datos ingresados son " + monto + "U$D y " + usdHoy +"U$D");
let [ars, impuestoAduanero, impuestoDolarTurista, aPagar] = CalcularImpuestos(monto, usdHoy);
MostrarResultados(monto, usdHoy, ars, impuestoAduanero, impuestoDolarTurista, aPagar)
