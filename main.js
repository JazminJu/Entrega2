const Libro = function(nombre, precio, stock) {
    this.nombre = nombre
    this.precio = precio
    this.stock = stock
}

let libro1 = new Libro("El Principito",42500,200)
let libro2 = new Libro("La Cabaña del Tio Tom",44500,150)
let libro3 = new Libro("Cuentos de Andersen",43250,250)
let libro4 = new Libro("La Isla del Tesoro",47500,50)
let libro5 = new Libro("De los Apeninos a los Andes",39000,30)
let libro6 = new Libro("Cuentos de la Selva",38000,60)
let libro7 = new Libro("Las Fabulas de Samaniego",44750,100)
let libro8 = new Libro("El Quijote de La Mancha",51450,120)

let menus = [libro1,libro2,libro3,libro4,libro5,libro6,libro7,libro8]

// Buscar en el localStorage
 if (localStorage.getItem("libros")) {
    menus = JSON.parse(localStorage.getItem("libros"))
 } else {
    menus=menus
 }

function filtrarLibro() { // Filtrar por nombre de libro.
    Swal.fire({
        title: 'Nombre del Libro',
        input: 'text',
        showCancelButton: true,
        ConfirmButtonText:'Buscar',
        showLoaderOnConfirm: true,

        preConfirm: (keyBusqueda) => {
            keyBusqueda = keyBusqueda.trim().toUpperCase()
            let resultado = menus.filter( (libro)=> libro.nombre.toUpperCase().includes(keyBusqueda))

            if (resultado.length > 0) {
                // encontrados ok
                Swal.fire({
                    title: `Resultados de ${keyBusqueda}:`,
                    html: '<table> <tr> <th>Nombre</th> <th>Precio</th> <th>Stock</th> </tr> <table/>' + 
                    resultado.map(  (libro)=> `<tr><td>${libro.nombre}</td><td>     Valor: $ ${libro.precio}     </td><td>Stock: ${libro.stock} libros</td>`) ,
                })
            } else {
                Swal.fire({
                    title:`No se encontraron coincidencias!`,
                    icon:'error',
                    confirmButtonText: `ok`,
                })
            }
        }
    })
}

function nuevoLibro() {  // Funcion para agregar un nuevo libro.
    Swal.fire({
        title:`Nuevo Libro`,
        html:`<label>Nombre:</label> <input id="nombre-input" class="swal2-input" type="text" autofocus>
        <label>Precio:</label><input id="precio-input" class="swal2-input" type="number" step="0.01">
        <label>Stock:</label><input id="stock-input" class="swal2-input" type="number" step="1">`,
        showCancelButton: true,
        confirmButtonText:"Guardar",
        cancelButtonText: "Cancelar",
    }).then((result)=> {

        if (result.isConfirmed) {
            let nombre = document.getElementById("nombre-input").value.trim();
            let precio = document.getElementById("precio-input").value.trim();
            let stock = document.getElementById("stock-input").value.trim();

            if (isNaN(precio) || isNaN(stock) || nombre==="") {
                Swal.fire(
                    {
                        icon: "error",
                        title:"Error",
                        text:"Ha ingresado datos inválidos!"
                    }
                ); return
            }

            let libro = new Libro(nombre,precio,stock)

            if (menus.some ((elemento)=> elemento.nombre === libro.nombre)) {
                Swal.fire({
                    icon:"warning",
                    title: "Atención",
                    text: `El Libro ${libro.nombre} ya está registrado!`
                }); return    
            }

            menus.push(libro)

            localStorage.setItem("libros", JSON.stringify(menus)) // guardar los libros en el local storage

            Swal.fire({
                icon:"succes",
                title:"Libro Agregado",
                text: `El Libro ${libro.nombre} ha sido agregado!`,
                timer: 5000
            })

            console.table(menus)
        }
    })
}

let agregar = document.getElementById("agregar")  // boton Agregar
agregar.addEventListener("click",nuevoLibro )

let filtrar = document.getElementById("filtrar") // boton Filtrar
filtrar.addEventListener("click", filtrarLibro)
