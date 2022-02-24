/* 
# Autor: Federico Roldan.
# AJAX en tu Proyecto
# Informacion sobre el Proyecto: 
        En mi proyecto se cotiza una importacion con un servicio curier ficticio llamado "CONDOR", se podran ir
    sumando productos y se mostrara detalladamente los costos que se van a tener, dependiendo de las variables ingresadas. 

 */

 //Array dinamico donde se almacenan los productos que se van creando.

let dolarHoy = 0;
const transport = 22; //El precio en  dolares de lo que sale el transporte en relacion a 1 Kg. El precio del envio sera flete * weight. 
let pesosTotal = 0;
const URLGET = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';
$(document).ready(function() {

    $.get(URLGET, function(respuesta, estado) {
        if (estado === "success") {
            let datos = respuesta;
            //let casa = datos[6][0].venta;
            let casa = datos[0];
            dolarHoy = parseFloat(casa["casa"].venta);
            console.log(dolarHoy);
        }
    });
})
/* 
Creamos el objeto Producto con sus propiedades y funcionalidad. Tambien añadimos un constructor para crear nuevos productos cuando
el usuario lo requiera.
La funcion calcular transformara divisas, calculara impuestos, transpoerte y retoranara esos valores para luego ser visualizados. 
*/
class Producto {
    constructor(key, description, amount, weight, quantity) {
        this.key = key;
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
    let impuestoDolarTurista = parseFloat(ars * 0.65);
    return [impuestoAduanero, impuestoDolarTurista]
}

const CalcularEnvio = (weight) =>{
    let shipping = transport * weight; //transport en U$D por ende shipping en U$D
    return shipping
}

const DolarAPesos = (usd) =>{return parseFloat(usd * dolarHoy)} //En esta etapa del proyecto el valor que le asigne al dolar no se modifica, pero me gustaria tomarlo con una API.


/* 
Ordenamos de mayor a menos los montos. 
*/
const OrdenarProductos = (array) => {
    let ordenadosPorMonto = [];
    ordenadosPorMonto = array.map(elemento => elemento);
    ordenadosPorMonto = array;

    ordenadosPorMonto.sort(function(a, b){
        return b.amount - a.amount;
    }); 
    console.log(ordenadosPorMonto);
    MostrarProductos(ordenadosPorMonto);
}


let clavesDisponibles = [];
const ObtenerDatosAlmacenados = () =>{
    let indice = 1; 
    let arrayProducto = [];
    let productosAlmacenados = [];
    if(localStorage.length){ //Preguntamos si hay datos almacenados, si los hay iteramos el objeto Producto y obtenemos un array con las Keys disponibles.
        for(let k = 1; k <= 20; k++){
            productosAlmacenados  = JSON.parse(localStorage.getItem(k)); //Tomamos una cadena JSON y la transforma en un objeto.
            if(productosAlmacenados === null){ //Si obtenemos un null al obtener el item quiere decir que esa key esta disponible.
                clavesDisponibles[indice++] = k; //Almacenamos la key un un array para luego utilizarla a la hora de crear nuevos objetos.
            }else{ //Si es falso quiere decir que encontro una cadena y la convirtio. Añadimos los elementos obtenidos a un array.
                arrayProducto.push(new Producto(productosAlmacenados.key, productosAlmacenados.description, productosAlmacenados.amount, productosAlmacenados.weight, productosAlmacenados.quantity));
            }
        }
    }else{ //Si no existen productos almacenados en el localStorage, la clave disponible sera siempre 1
        clavesDisponibles[1] = 1;
    }
    //Ordenamos los productos existentes por precio con los nuevos productos añadidos
    OrdenarProductos(arrayProducto);
    
}

function AgregarALista() {
    //Obtenemos los valores que ingresamos al formulario.
    let description = document.getElementById("description").value;
    let amount = document.getElementById("amount").value;
    let weight = document.getElementById("weight").value;
    let quantity = document.getElementById("quantity").value; 
    //Añadimo los elementos a un array.
    //arrayProducto.push(new Producto(clavesDisponibles[1], description, amount, weight, quantity));
    //Almacenamos en el localStorage.
    localStorage.setItem(clavesDisponibles[1], JSON.stringify({key: clavesDisponibles[1],description: description,amount: amount,weight: weight, quantity: quantity}));
    //Refrescamos la pagina.
  
    ObtenerDatosAlmacenados();
}

function EliminarProducto(event){
    //Obtenemos el atributo value del boton eliminar y lo almacenamos en Key ya que al crearlo le dimos la key del producto.
    const key = event.target.getAttribute('value');
    //Eliminamos del localStorage el Item almacenado.
    localStorage.removeItem(key);
    //Hacemos referencia al objeto que lanzo el evento y buscamos en el DOM el objeto mas cercano con el parametro .contenedor y lo removemos.
    event.target.closest( '.contenedor' ).remove();;
}


const MostrarProductos = (arrayOrdenado) => {
    $(".contenedor").remove();
    // Recorremos el array y mostramos todos los datos de los productos en nuestra pagina.
    for (let producto of arrayOrdenado){
            //Mostramos los datos almacenados en el array
            let [ars, impuestoAduanero, impuestoDolarTurista, shipping, total] = producto.calcular();
            $("#mostrar").append(`
            <div class="contenedor">
            <h3> ${producto.description}</h3>
            <p> Monto: ${producto.amount} U$D </p>
            <p> Peso: ${producto.weight} Kg</p>
            <p> Cantidad: ${producto.quantity} u</p>
            <p> Pesos: ${ars} AR$</p>
            <p> Impuesto Aduanero: ${impuestoAduanero} AR$</p>
            <p> Impuesto Dolar Turista: ${impuestoDolarTurista} AR$</p>
            <p> Envio: ${shipping} AR$</p>
            <div id="total-a-Pagar">
            <p>  ${total} AR$</p>
            </div>
            <button id="btn-eliminar" value = "${producto.key}">
            Eliminar
            </button>
            </div>
            `).animate({ opacity: '0.4'}, "slow");
            $("#mostrar").animate({ opacity: '1'}, "slow");
            $( ".contenedor #btn-eliminar" ).click(EliminarProducto);

        
    }
}

var animacionFormulario = $(".formulario");
var animacionContenidoFormulario = $("form");
var animacionLogo = $(".container");

animacionContenidoFormulario.animate({opacity: '0.0'}, "1");
animacionFormulario.animate({height: '200px', opacity: '0.4'}, "1");
animacionFormulario.animate({width: '200px', opacity: '0.8'}, "1");
animacionFormulario.animate({height: '400px', opacity: '0.4'}, "slow");
animacionFormulario.animate({width: '80%', opacity: '0.8'}, "slow");
animacionLogo.delay(1800).animate({left: '100px', opacity: '1'}, "slow");
animacionContenidoFormulario.delay(2000).animate({opacity: '1'}, "3000");
$("#mostrar").delay(2200).animate({opacity: '1'}, "3000");


setTimeout(ObtenerDatosAlmacenados, 1000); //Le doy un tiempo antes de que se ejecute la funcion para que obtenga sin 
                                           //ningun problema el valor del dolar con la api
//eventos botones
$( "#btn-agregar" ).click(AgregarALista);