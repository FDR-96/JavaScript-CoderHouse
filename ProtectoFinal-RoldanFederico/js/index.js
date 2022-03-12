/* 
# Autor: Federico Roldan.
# Entrega del Proyecto Final
# Informacion sobre el Proyecto: 
        En mi proyecto se cotiza una importacion con un servicio curier ficticio llamado "CONDOR", se podran ir
    sumando productos y se mostrara detalladamente los costos que se van a tener, dependiendo de las variables ingresadas. 
 */

//Variables Globales
let dollarToday = 0;
let index = 0;
let keysAvailable = [];
//Selectores
var formAnimation = $(".formulario");
var formContentAnimation = $("form");
var logoAnimation = $(".container");
var dollarAnimation = $(".dolar-hoy");
//Eventos botones
$("#btn-agregar").click(AddToList);

/* 
    Creamos el objeto Producto con sus propiedades y funcionalidad. Tambien añadimos un constructor para crear nuevos productos cuando
    el usuario lo requiera.
    La funcion calcular transformara divisas, calculara impuestos, transpoerte y retoranara esos valores para luego ser visualizados. 
*/
class Product {
    constructor(key, description, amount, weight, quantity) {
        this.key = key;
        this.description = description;
        this.weight = weight;
        this.amount = amount;
        this.quantity = quantity;
    }
    Calculate() {
        let [ars, customsTax, taxDollarTourist, shipping, total] = CalculateFinalValue(this.amount, this.weight, this.quantity);
        return [ars, customsTax, taxDollarTourist, shipping, total];
    }
}

/* 
    Se llama a las demas funciones y se calcula el total, esta funcion retornara todos los valores en pesos argentinos.
*/

const CalculateFinalValue = (usd, weight, quantity) => {
        let ars = DollarToPesos(usd);
        let shipping = DollarToPesos(CalculateShipping(weight * quantity)); //CalcularEnvio devulve el valor en dolares por lo que es necesario transformar a pesos
        let [customsTax, taxDollarTourist] = CalculateProductTaxes(ars * quantity);
        let total = customsTax + taxDollarTourist + ars + shipping;
        return [ars.toFixed(2), customsTax.toFixed(2), taxDollarTourist.toFixed(2), shipping.toFixed(2), total.toFixed(2)]
    }
    /* 
        Calculamos los impuestos y los Retornamos.
    */
const CalculateProductTaxes = (ars) => {
        let customsTax = parseFloat(ars * 0.5);
        let taxDollarTourist = parseFloat(ars * 0.65);
        return [customsTax, taxDollarTourist]
    }
    /* 
        El precio en dolares de lo que sale el transporte en relacion a 1 Kg es de 22 dolares.
    El precio del envio sera flete(22U$D) * weight. 
    */
const CalculateShipping = (weight) => {
        let shipping = 22 * weight;
        return shipping
    }
    /* 
        Realizamos la conversion de dolares a pesos con el precio de dolar obtenido de la API.
    */
const DollarToPesos = (usd) => { return parseFloat(usd * dollarToday) }



/* 
    Obtenemos el valor del Dolar de la API dolarSi
*/
const ApiGet = () => {
    let URLGET = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';
    const api = new XMLHttpRequest();
    api.open('GET', URLGET, true);
    api.send();
    api.onreadystatechange = function() {
        if (this.status == 200 && this.readyState == 4) {
            let data = JSON.parse(this.responseText);
            dollarToday = parseFloat(data[0]["casa"].venta);
            $(".pesos-hoy-mostrar").text(dollarToday + "AR$");
            console.log(dollarToday);
        }
    }
}

/* 
    Añadimos nuevos productos y almacenamos en el Local Storage.
*/
function AddToList() {
    //Obtenemos los valores que ingresamos al formulario.
    let description = document.getElementById("description").value;
    let amount = document.getElementById("amount").value;
    let weight = document.getElementById("weight").value;
    let quantity = document.getElementById("quantity").value;
    //Añadimo los elementos a un array.
    //arrayProducto.push(new Producto(clavesDisponibles[1], description, amount, weight, quantity));
    //Almacenamos en el localStorage.
    localStorage.setItem(keysAvailable[1], JSON.stringify({ key: keysAvailable[1], description: description, amount: amount, weight: weight, quantity: quantity }));
    //Refrescamos la pagina.
    GetStoredData();
}

/* 
    Obtenemos los datos Almacenados en el Local Storage para luego ordenarlos y mostrarlos.
*/
const GetStoredData = () => {
        let i = 1;
        let arrayProduct = [];
        let storedProduct = [];
        if (localStorage.length) { //Preguntamos si hay datos almacenados, si los hay iteramos el objeto Producto y obtenemos un array con las Keys disponibles.
            for (let k = 1; k <= 20; k++) {
                storedProduct = JSON.parse(localStorage.getItem(k)); //Tomamos una cadena JSON y la transforma en un objeto.
                if (storedProduct === null) { //Si obtenemos un null al obtener el item quiere decir que esa key esta disponible.
                    keysAvailable[i++] = k; //Almacenamos la key un un array para luego utilizarla a la hora de crear nuevos objetos.
                } else { //Si es falso quiere decir que encontro una cadena y la convirtio. Añadimos los elementos obtenidos a un array.
                    arrayProduct.push(new Product(storedProduct.key, storedProduct.description, storedProduct.amount, storedProduct.weight, storedProduct.quantity));
                }
            }
        } else { //Si no existen productos almacenados en el localStorage, la clave disponible sera siempre 1
            keysAvailable[1] = 1;
        }
        $(".items").text((index + 1) + "/" + localStorage.length);
        //Ordenamos los productos existentes por precio con los nuevos productos añadidos
        OrderProduct(arrayProduct);

    }
    /* 
        Ordenamos el array por monto de mayor a menor para luego mostrarlos en ese orden. 
    */
const OrderProduct = (array) => {
        let tempArray = [];
        tempArray = array.map(elemento => elemento);
        tempArray = array;
        tempArray.sort(function(a, b) {
            return b.amount - a.amount;
        });
        ShowProducts(tempArray);
    }
    /* 
        Mostramos los prodcutos obtenidos del Local storage. 
    */
const ShowProducts = (orderedArray) => {
        $(".contenedor").remove();
        // Recorremos el array y mostramos todos los datos de los productos en nuestra pagina.
        let product = orderedArray[index];
        //Mostramos los datos almacenados en el array
        console.log(product);
        if (product != undefined) {
            //[ars, customsTax, taxDollarTourist, shipping, total]
            let [ars, customsTax, taxDollarTourist, shipping, total] = product.Calculate();
            $("#mostrar").append(`
            <div class="contenedor">
            <div class="bloque-superior">
            <i id="flecha-izquierda" class="fa-solid fa-caret-left fa-2xl"></i>
            <i id="flecha-derecha" class="fa-solid fa-caret-right fa-2xl"></i>
            </div>
            <h3> ${product.description}</h3>
            <p> Monto: ${product.amount} U$D </p>
            <p> Peso: ${product.weight} Kg</p>
            <p> Cantidad: ${product.quantity} u</p>
            <p> Pesos: ${ars} AR$</p>
            <p> Impuesto Aduanero: ${customsTax} AR$</p>
            <p> Impuesto Dolar Turista: ${taxDollarTourist} AR$</p>
            <p> Envio: ${shipping} AR$</p>
            <div id="total-a-Pagar">
            <p>  ${total} AR$</p>
            </div>
            <button id="btn-eliminar" value = "${product.key}">
            Eliminar
            </button>
            </div>
            `).animate({ opacity: '0.8' }, "slow");
            $("#mostrar").animate({ opacity: '1' }, "slow");
            $(".total-servicio").animate({ opacity: '1' }, "fast");

            $(".contenedor #btn-eliminar").click(RemoveProduct);
            $(".contenedor #flecha-izquierda").click(decrease);
            $(".contenedor #flecha-derecha").click(increase);
            let totalDolar = 0;
            for (let arrayTotal of orderedArray) {
                let total = arrayTotal.Calculate();
                totalDolar = parseInt(total[4]) + totalDolar;
                $(".total-mostrar").text(totalDolar + "AR$");
            }
        }
    }
    /* 
        Funcion que remueve el producto y lo elimina tambien del Local Storage.
    */
function RemoveProduct(event) {
    //Obtenemos el atributo value del boton eliminar y lo almacenamos en Key ya que al crearlo le dimos la key del producto.
    const key = event.target.getAttribute('value');
    //Eliminamos del localStorage el Item almacenado.
    localStorage.removeItem(key);
    //Hacemos referencia al objeto que lanzo el evento y buscamos en el DOM el objeto mas cercano con el parametro .contenedor y lo removemos.
    event.target.closest('.contenedor').remove();
    if (index != 0) {
        decrease();
    } else if (localStorage.length == 0) {
        $(".total-servicio").animate({ opacity: '0' }, "fast");
    } else {
        GetStoredData();
    }
}
/* 
    Funcion para cambiar el contenedor que muestra el producto decrementando el indice del array de donde se obtiene
    la informacion del producto.
*/
function decrease() {
    //Preguntamos para que el valor del indice no llegue nunca a un valor negativo.
    if (index > 0) {
        index--;
        GetStoredData();
    }
}
/* 
    Funcion para cambiar el contenedor que muestra el producto incrementa el indice del array de donde se obtiene
    la informacion del producto.
*/
function increase() {
    //Preguntamos para no exceder el valor maximo del array en el que almacenamos la informacion del Local Storage. 
    if (index < localStorage.length - 1) {
        index++;
        GetStoredData();
    }
}
/* 
    Funciones en la que se ejecutan las animaciones divididas para implementar Callbacks();
*/
function AnimacionesUno() {
    formContentAnimation.animate({ opacity: '0.0' }, "slow", function() { ApiGet() });
    formAnimation.animate({ height: '200px', opacity: '0.4' }, "slow");
    formAnimation.animate({ width: '200px', opacity: '0.8' }, "slow");
    formAnimation.animate({ height: '550px', opacity: '0.4' }, "slow");
    formAnimation.animate({ width: '30%', opacity: '0.8' }, "slow", function() { AnimacionesDos() });
}

function AnimacionesDos() {
    logoAnimation.animate({ left: '100px', opacity: '1' }, "slow");
    formContentAnimation.delay(500).animate({ opacity: '1' }, "3000");
    //  Implemento una funcion Callback para darle tiempo de que obtenga los datos de la API sin problemas
    //y puedan realizarce los calculos correspondientes.  
    $(".dolar-hoy").delay(500).animate({ opacity: '1' }, "3000", function() { GetStoredData() });
}

AnimacionesUno();