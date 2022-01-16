/* 
# Autor: Federico Roldan.
# Proyecto Final Primera Entrega: Servicio Curier Condor.
# Informacion sobre el Proyecto: 
        En mi proyecto se cotiza una importacion con un servicio curier ficticio llamado "CONDOR", se podran ir
    sumando productos y se mostrara detalladamente los costos que se van a tener, dependiendo de las variables ingresadas. 

    Se calcula cuanto vas a gastar si realizas compras en el exterior o por internet desde Argentina.   
    - Calcular el importe para el impuesto Aduanero del 50%.
    - Calcular el importe para el impuesto Dolar Turista del 30%.
    - Realizar la conversión total USD -> ARS con los impuestos incluidos.
    - Calcula el valor del envio según el peso del Producto.
 */

let arrayProducto = []; //Array dinamico donde se almacenan los productos que se van creando.
const transport = 22; //El precio en  dolares de lo que sale el transporte en relacion a 1 Kg. El precio del envio sera flete * weight. 

/* 
Creamos el objeto Producto con sus propiedades y funcionalidad. Tambien añadimos un constructor para crear nuevos productos cuando
el usuario lo requiera.
La funcion calcular transformara divisas, calculara impuestos, transpoerte y retoranara esos valores para luego ser visualizados. 
*/
class Producto {
    constructor(description, amount, weight, quantity) {
        this.description = description;
        this.weight = weight;
        this.amount = amount;
        this.quantity = quantity;
    }
    calcular(){
        let [ars, impuestoAduanero, impuestoDolarTurista, shipping, total] = CalcularValorFinal(this.amount, this.weight, this.quantity);
        console.log(this.description, this.amount + "U$D", this.weight + "Kg", this.quantity + " Unidades ");
        console.log(ars, impuestoAduanero, impuestoDolarTurista, shipping, total);
        return [ars, impuestoAduanero, impuestoDolarTurista, shipping, total];
    }
} 

//Se llama a las demas funciones y se calcula el total, esta funcion retornara todos los valores conversidos en pesos argentinos.
const CalcularValorFinal = (usd, weight, quantity) =>{
    let ars = DolarAPesos(usd);
    let shipping = DolarAPesos(CalcularEnvio(weight * quantity));  //CalcularEnvio devulve el valor en dolares por lo que es necesario transformar a pesos
    let [impuestoAduanero, impuestoDolarTurista] = CalcularImpuestosProductos(ars * quantity);
    let total = impuestoAduanero + impuestoDolarTurista + ars + shipping;
    return [ars, impuestoAduanero, impuestoDolarTurista, shipping, total]
}

const CalcularImpuestosProductos = (ars) =>{
    let impuestoAduanero = parseFloat(ars * 0.5);
    let impuestoDolarTurista = parseFloat(ars * 0.3);
    return [impuestoAduanero, impuestoDolarTurista]
}

const CalcularEnvio = (weight) =>{
    let shipping = transport * weight; //transport en U$D por ende shipping en U$D
    return shipping
}

const DolarAPesos = (usd) =>{
    return parseFloat(usd * 102) //En esta etapa del proyecto el valor que le asigne al dolar no se modifica, pero me gustaria tomarlo con una API.
}

/* 
Utilice un ciclo "do" ya que con un "while" y un "for" no encontre la forma de utilizar el confirm sin que quedara fuera del ciclo y este
me sirviera de "bandera" para añadir productos y romper el ciclo. 
Siempre que el confirm retorne un true, se añadira un nuevo ojeto y preguntara si se desea añadir uno nuevo.
*/
do{
    //Preguntamos si se quiere añadir un producto.
    var result = confirm("Fede ¿Deseas añadir nuevos productos?");
    if(result){
        //Pedimos los datos del producto.
        let description = prompt("Descripcion del Producto");
        let amount = prompt("Monto en dolares");
        let weight = prompt("Peso en Kg del producto");
        let quantity = prompt("Cantidad");
        //Añadimos con el metodo push y creamos un nuevo producto al cual le pasamos los parametros necesarios.
        arrayProducto.push(new Producto(description, amount, weight, quantity));
    }
}
while(result);


// Recorremos el array y mostramos todos los datos de los productos en nuestra pagina.
for (let producto of arrayProducto){
    //Mostramos los datos almacenados en el array
    document.write("<br>");
    document.write("<h2>Descripcion: " + producto.description + "</h2>");
    document.write("<h3>Monto: </span>" + producto.amount + "U$D</span></h3>");
    document.write("<h3>Peso: </span>" + producto.weight + "KG</span></h3>");
    document.write("<h3>Cantidad: </span>" + producto.quantity + "KG</span></h3>");
    //Llamamos a la funcion calcular() para que realice las operaciones necesarias y mostramos los datos obtenidos.
    let [ars, impuestoAduanero, impuestoDolarTurista, shipping, total] = producto.calcular();
    document.write("<h3>Monto en pesos: <span>" + ars + "AR$</span></h3>");
    document.write("<h3>Impuesto Aduanero: <span>" + impuestoAduanero + "AR$</span></h3>");
    document.write("<h3>Impuesto Dolar Turista: <span>" + impuestoDolarTurista + "AR$</span></h3>");
    document.write("<h3>Envio: <span>" + shipping + "AR$</h3>");
    document.write("<h3>Total a pagar:  " + total + "AR$</h3>");
}