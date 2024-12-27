const Pelicula = function(nombre, anioEstreno, duracion){
    this.nombre= nombre
    this.anioEstreno = anioEstreno
    this.duracion = duracion
}
let Pelicula1  = new Pelicula("El Padrino",1972,140)
let Pelicula2  = new Pelicula("Top Gun",1989,92)
let Pelicula3  = new Pelicula("La Mision",1991,96)
let Pelicula4  = new Pelicula("Crepusculo",2005,74)
let Pelicula5  = new Pelicula("El Señor de los Anillos",125,2003)
let Pelicula6  = new Pelicula("El Rey León",91,2024)
let Pelicula7  = new Pelicula("Yo Robot",2001,68)

let lista = [Pelicula1,Pelicula2,Pelicula3,Pelicula4,Pelicula5,Pelicula6,Pelicula7]

function filtrarPelicula() {
    let cadena = prompt("ingresa la Pelicula a buscar:")
    let resultado = lista.filter((x)=>x.nombre.toUppercase().includes(cadena))
    if (resultado.length > 0) {
        console.table(resultado)
    }else{
        alert("Esta película no existe!")
    }
}

function agregarPelicula(){
let nombre= prompt("ingresa el nombre de la pelicula")
let anioEstreno = prompt("ingresa el año de estreno de la pelicula")
let duracion = prompt("ingresa la duración de la pelicula")

if(isNaN(anioEstreno) || isNaN(duracion) || nombre == ""){
    alert("Ingresar valores válidos")
    return
}
let Pelicula = new Pelicula (nombre,anioEstreno,duracion)
lista.push(Pelicula)
console.table(lista)
}