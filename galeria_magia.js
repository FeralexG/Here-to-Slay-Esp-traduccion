const listaDeMonstruos = [
    'Call to the Fallen.png',
    'Critical Boost.png',
    'Destructive Spell.png',
    'Enchanted Spell.png',
    'Entangling Trap.png',
    'Forced Exchange.png',
    'Forceful Winds.png',
    'Winds of Change.png',
    'Beast Call.png',
    'Rapid Refresh.png',
    'Mass Sacrifice.png',
    'Lightning Labrys.png'
];

// ELEMENTOS DEL DOM
const galeria = document.getElementById('galeria');
const modal = document.getElementById('modal-carta');
const modalImg = document.getElementById('img-modal');
const spanCerrar = document.getElementsByClassName('cerrar-modal')[0];
const buscador = document.getElementById('buscador-cartas'); 
const btnLimpiar = document.getElementById('limpiar-buscador');
const todasLasCartas = []; //Array para guardar las cartas

// FUNCIÓN DE AYUDA
function crearAltText(filename) {
    let name = filename.split('.')[0]; 
    name = name.replace(/_/g, ' ');   
    return name.charAt(0).toUpperCase() + name.slice(1); 
}

// LÓGICA DEL MODAL
spanCerrar.onclick = function() { 
    modal.style.display = "none";
}

modal.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// CONSTRUIR LA GALERÍA 
listaDeMonstruos.forEach(nombreArchivo => {
    let nuevaCarta = document.createElement('img');
    let altTexto = 'Carta ' + crearAltText(nombreArchivo); // Guardamos el alt text
    
    nuevaCarta.src = 'magia/' + nombreArchivo;
    nuevaCarta.alt = altTexto;
    nuevaCarta.className = 'carta';
    
    // Lógica para abrir el modal
    nuevaCarta.onclick = function() {
        modal.style.display = "flex";
        modalImg.src = this.src;
    }
    
    // Añadimos la carta a la galería
    galeria.appendChild(nuevaCarta);
    
    // Guardamos la carta y su nombre en nuestro array
    todasLasCartas.push({ elemento: nuevaCarta, nombre: altTexto.toLowerCase() });
});

// LÓGICA DEL BUSCADOR
// Esto se ejecuta cada vez que el usuario escribe una letra
buscador.addEventListener('input', (e) => {
    // Obtenemos el texto del buscador en minúsculas
    const consulta = e.target.value.toLowerCase();

    // Recorremos nuestro array de cartas
    todasLasCartas.forEach(carta => {
        // Comprobamos si el nombre de la carta incluye el texto de la consulta
        const esCoincidencia = carta.nombre.includes(consulta);
        
        // Si coincide, la mostramos. Si no, la ocultamos.
        // El grid se reajusta solo
        carta.elemento.style.display = esCoincidencia ? "" : "none";
    });
});

// LÓGICA DEL BOTÓN LIMPIAR
btnLimpiar.addEventListener('click', () => {
    // 1. Vaciamos el contenido del buscador
    buscador.value = "";
    
    // Disparamos un evento 'input' en el buscador
    // Esto hace que el filtro se vuelva a ejecutar
    // y, como el buscador está vacío, mostrará todas las cartas.
    buscador.dispatchEvent(new Event('input'));

});

