let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

// Gato
 let imagenGato = new Image();
imagenGato.src = "ggato.png";
let gatoX = 0;
let gatoY = 0;
const ANCHO_GATO = 50;
const ALTO_GATO = 50;



// Comida
let comidaX = 470;
let comidaY = 470;
const ANCHO_COMIDA = 30;
const ALTO_COMIDA = 30;

//Puntaje
let puntaje=0;
//Tiempo
let tiempo=15;
let temporizador;

let tiempoInicial=15;


function graficarRectangulo(x, y, ancho, alto, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto);
};
 
function graficarGato() {
    if (imagenGato.complete) {
        ctx.drawImage(imagenGato, gatoX, gatoY, ANCHO_GATO, ALTO_GATO);
    } else {
        // fallback (por si no carga la imagen)
        graficarRectangulo(gatoX, gatoY, ANCHO_GATO, ALTO_GATO, "#000000");
    }
}
 
function graficarComida() {
    graficarRectangulo(comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA, "#ff0000");
};
 
function iniciarJuego() {
    gatoX = (canvas.width / 2) - (ANCHO_GATO / 2);
    gatoY = (canvas.height / 2) - (ALTO_GATO / 2);
    temporizador = setInterval(restarTiempo, 1000);
    graficarGato();
    graficarComida();
}

function limpiarCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
}
function moverIzquierda(){
    gatoX=gatoX-10;
    limpiarCanvas();
    graficarGato();
    graficarComida();
    detectarColision();
}
function moverDerecha(){
    gatoX=gatoX+10;
    limpiarCanvas();
    graficarGato();
    graficarComida();
    detectarColision();
}
function moverAbajo(){
    gatoY=gatoY+10;
    limpiarCanvas();
    graficarGato();
    graficarComida();
    detectarColision();
}
function moverArriba(){
    gatoY=gatoY-10;
    limpiarCanvas();
    graficarGato();
    graficarComida();
    detectarColision();
}
function detectarColision(){
    if((comidaX+ANCHO_COMIDA>gatoX &&
        comidaX<gatoX+ANCHO_GATO)&&
        (comidaY+ALTO_COMIDA>gatoY &&
        comidaY<gatoY+ALTO_GATO))
    {
        aparecerComida();
        puntaje=puntaje+1;
        mostrarEnSpan("puntos",puntaje);
        //alert("Atrapado");

        reinicioTiempo();

        if(puntaje==6){
        clearInterval(temporizador);
        alert("HAZ SIDO GANADOR");
        }
        
    }
}
function aparecerComida(){
    comidaX=generarAleatorio(0,canvas.width-ANCHO_COMIDA);
    comidaY=generarAleatorio(0,canvas.height-ALTO_COMIDA);
    limpiarCanvas();
    graficarGato();
    graficarComida();
}

function restarTiempo(){
    tiempo = tiempo - 1;
    mostrarEnSpan("tiempo",tiempo);
    if (tiempo <= 0) {
        clearInterval(temporizador); 
        alert("GAME OVER");
    }
}
function reiniciar(){
    clearInterval(temporizador);
    puntaje = 0;
    tiempo = 10;
    gatoX = (canvas.width / 2) - (ANCHO_GATO / 2);
    gatoY = (canvas.height / 2) - (ALTO_GATO / 2);
    limpiarCanvas();
    graficarGato();
    aparecerComida(); //permite cambiar en aleatorio la comida
    graficarComida();
    mostrarEnSpan("puntos", puntaje);
    mostrarEnSpan("tiempo", tiempo);
    temporizador = setInterval(restarTiempo, 1000);
}

function reinicioTiempo(){
    clearInterval(temporizador);
    tiempo = tiempoInicial;
    tiempoInicial=tiempoInicial-1;
    mostrarEnSpan("puntos", puntaje);
    mostrarEnSpan("tiempo", tiempo);
    temporizador = setInterval(restarTiempo, 1000);
}


