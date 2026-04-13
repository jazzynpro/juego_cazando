let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

function graficarGato() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(canvas.width/2,canvas.height/2, 50, 50);
};
 
function iniciarJuego() {
    graficarGato();
}
 
