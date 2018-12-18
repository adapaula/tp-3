let elNombre = "";
let contador = 1;
let misProductos = [];
let total = 0;

const RECARGO_EFECTIVO = 1;
const RECARGO_DEBITO = 1.05;
const RECARGO_CHEQUE = 1.20;
const RECARGO_CREDITO = 1.10;

const RECARGO_1_CUOTA = 1;
const RECARGO_12_CUOTA = 1.20;
const RECARGO_24_CUOTA = 1.45;
const RECARGO_36_CUOTA = 1.70;

$(".medios-pago, .medios-cuotas, .precio-final, .btn-calcular, .espera-msj").hide();

$("#ingresar").on("click", function() {
var elNombre = $("#nombre-comprador").val();
console.log(111, elNombre)
if ( elNombre == "") {
    $("#error").text("*completar campo")
    $("#error").css("color", "#fb4f70"); 
} else if ( elNombre != ""){
    $(".botonera, agregar-productos").show();
    $("#error, .poner-nombre").hide();
 }
})

$("#comprar").on("click", function() {
    $(".espera-msj, .agregar-productos, .btn-calcular").show();
    console.log("Sera atendido en instantes")
})

$("#ayuda").on("click", function() {
console.log("Todos los operadores se encuentran ocupados")
})

$("#baja").on("click", function() {
console.log("Opcion invalida, ya vendiste tu alma al diablo")
})
  
$("#salir").on("click", function() {
console.log("Gracias por usar nuestro servicio")
})

$("#deuda").on("click", function() {
console.log("Su deuda es:")
})

function agregar(){
$("#add").on('click', function(){
$(".espera-msj").hide();
  let nombreProducto = $("#inputProducto").val();
  let precioProducto = $("#inputPrecio").val();
  if( nombreProducto.length === 0 || precioProducto.length === 0){
  return;
  }
  let = newId = contador++;
  misProductos.push({
      nombre: nombreProducto,
      precio: parseFloat(precioProducto),
      id: newId
  })
  let table = $("table.tabla-productos")
  $(".fila").remove();

  for(let i = 0; i < misProductos.length; i++){
  let nombre = `<td class="item">Art. ${misProductos[i].nombre}</td>`
  let precio = `<td class="item">$ ${misProductos[i].precio}</td>`
  let newId = `<td class="newid">${misProductos[i].id}</td>`

  let btnBorrar = `<button class="btn-borrar"><i class="far fa-trash-alt"></i></button>`
  let fila = $(`<tr data-index ="${misProductos[i].id}" class="fila"></tr>`)

  fila.append(nombre)
  fila.append(precio)
  fila.append(newId)
  fila.append(btnBorrar)
  table.append(fila)
        }
    });
}


$(document).on("click", ".btn-borrar", function(){
 let idABorrar =  $(this).parent().data("index");
 $(this).parent().remove();
 let index = misProductos.findIndex(p => p.id == idABorrar);
 misProductos.splice(index, 1);
}) 

function calcularSubtotal(){
   let subtotal = 0;
    for (let i = 0; i < misProductos.length; i++){
        let sumaDeProductos = misProductos[i].precio;
        subtotal = subtotal + sumaDeProductos
    } 
    $("#valorDelPago").html(`Subtotal $ ${subtotal}`);
    $(".txt-subtotal").show();
    return subtotal;
}

$("#calcular").on("click", function() {
    calcularSubtotal();
    $(".medios-pago, .precio-final").show();
    
  })

$(".medios-pago").change(function() {
    console.log($(this).val())
    let seleccionMP = $(this).val()
    if (seleccionMP === "Crédito"){
    $(".medios-cuotas").show();

    } else { $(".medios-cuotas").hide();
    }
})

$(".medios-cuotas").change(function() {
    console.log($(this).val())   
})

$("#precioFinal").on("click", function() {
    let subtotal = calcularSubtotal();
    console.log(123, subtotal)
    let mPagos = $(".medios-pago").val();
    let cuotas = $(".medios-cuotas").val();

    let recargoMP = 1;
    let recargoCuotas = 1;

    console.log(subtotal, mPagos, cuotas, "los 3 valores"); 

    if (mPagos === "Efectivo") recargoMP = RECARGO_EFECTIVO;
    if (mPagos === "Débito") recargoMP = RECARGO_DEBITO;
    if (mPagos === "Cheque") recargoMP = RECARGO_CHEQUE;
    if (mPagos === "Crédito") recargoMP = RECARGO_CREDITO;

    if (cuotas === "1 Cuota") recargoCuotas = RECARGO_1_CUOTA;
    if (cuotas === "12 Cuotas") recargoCuotas = RECARGO_12_CUOTA;
    if (cuotas === "24 Cuotas") recargoCuotas = RECARGO_24_CUOTA;
    if (cuotas === "36 Cuotas") recargoCuotas = RECARGO_36_CUOTA;
             
    total = subtotal * recargoMP * recargoCuotas;
                
    $("#precioFinal").html(`Total $ ${total.toFixed(2)}`);
    $(".txt-total").show();
});

agregar();
