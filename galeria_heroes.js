const listaDeHeroes = [
    'luchador_bad_axe.png',
    'luchador_Bear_Claw.png',
    'luchador_Beary_Wise.png',
    'luchador_Fury_Knuckle.png',
    'luchador_Heavy_Bear.png',
    'luchador_Pan_Chucks.png',
    'luchador_Qi_Bear.png',
    'luchador_Tough_Teddy.png',
    'guardian_Calming_Voice.png',
    'guardian_Guiding_Light.png',
    'guardian_Holy_Curselifter.png',
    'guardian_Iron_Resolve.png',
    'guardian_Mighty_Blade.png',
    'guardian_Radiant_Horn.png',
    'guardian_Vibrant_Glow.png',
    'guardian_Wise_Shield.png',
    'cazador_Bullseye.png',
    'cazador_Hook.png',
    'cazador_Lookie_Rookie.png',
    'cazador_Quick_Draw.png',
    'cazador_Serious_Grey.png',
    'cazador_Sharp_Fox.png',
    'cazador_Wildshot.png',
    'cazador_Wily_Red.png',
    'ladron_Kit_Napper.png',
    'ladron_Meowzio.png',
    'ladron_Plundering_Puma.png',
    'ladron_Shurikitty.png',
    'ladron_Silent_Shadow.png',
    'ladron_Slippery_Paws.png',
    'ladron_Sly_Pickings.png',
    'ladron_Smooth_Mimimeow.png',
    'mago_Bun_Bun.png',
    'mago_Buttons.png',
    'mago_Fluffy.png',
    'mago_Hopper.png',
    'mago_Snowball.png',
    'mago_Spooky.png',
    'mago_Whiskers.png',
    'mago_Wiggles.png',
    'bardo_Dodgy_Dealer.png',
    'bardo_Fuzzy_Cheeks.png',
    'bardo_Greedy_Cheeks.png',
    'bardo_Lucky_Bucky.png',
    'bardo_Mellow_Dee.png',
    'bardo_Napping_Nibbles.png',
    'bardo_Peanut.png',
    'bardo_Tipsy_Tootie.png',
    'guerrero_Agile_Dagger.png',
    'guerrero_Blinding_Blade.png',
    'guerrero_Critical_Fang.png',
    'guerrero_Hardened_Hunter.png',
    'guerrero_Looting_Lupo.png',
    'guerrero_Silent_Shield.png',
    'guerrero_Tenacious_Timber.png',
    'guerrero_Wolfgang_Pack.png',
    'druida_Big_Buckley.png',
    'druida_Buck_Omens.png',
    'druida_Doe_Fallow.png',
    'druida_Glowing_Antler.png',
    'druida_Maegisty.png',
    'druida_Magus_Moose.png',
    'druida_Majestelk.png',
    'druida_Stagguard.png',
    'nigromante_Bark_Hexer.png',
    'nigromante_Beholden_Retriever.png',
    'nigromante_Bone_Collector.png',
    'nigromante_Boston_Terror.png',
    'nigromante_Grim_Pupper.png',
    'nigromante_Hollow_Husk.png',
    'nigromante_Perfect_Vessel.png',
    'nigromante_Shadow_Saint.png',
    'berserker_Annihilator.png',
    'berserker_Brawling_Spirit.png',
    'berserker_Gruesome_Gladiator.png',
    'berserker_Meowntain.png',
    'berserker_Rabid_Beast.png',
    'berserker_Roaryal_Guard.png',
    'berserker_Vicious_Wildcat.png',
    'berserker_Unbridled_Fury.png'
];

// ELEMENTOS DEL DOM
const galeria = document.getElementById('galeria');
const modal = document.getElementById('modal-carta');
const modalImg = document.getElementById('img-modal');
const spanCerrar = document.getElementsByClassName('cerrar-modal')[0];
const buscador = document.getElementById('buscador-cartas');
const btnLimpiar = document.getElementById('limpiar-buscador');
const filtroBotones = document.querySelectorAll('.boton-filtro'); // ¡NUEVO!
const todasLasCartas = []; 

// VARIABLES DE FILTRADO
let filtroClaseActual = 'todos';

//FUNCIÓN DE AYUDA
function crearAltText(filename) {
    let name = filename.split('.')[0]; 
    name = name.replace(/_/g, ' ');   
    return name.charAt(0).toUpperCase() + name.slice(1); 
}

//LÓGICA DEL MODAL
spanCerrar.onclick = function() { modal.style.display = "none"; }
modal.onclick = function(event) {
    if (event.target == modal) { modal.style.display = "none"; }
}

//CONSTRUIR LA GALERÍA 
listaDeHeroes.forEach(nombreArchivo => {
    
    // 1. Partimos el nombre del archivo por el guion bajo "_"
    const partesNombre = nombreArchivo.split('_'); 
    
    // 2. La primera parte es SIEMPRE la clase
    const claseHeroe = partesNombre[0]; 
    
    // 3. El resto de las partes son el nombre real
    // .slice(1) -> toma todo MENOS el primer elemento
    // .join(' ') -> une las partes con un espacio
    const nombreParaAlt = partesNombre.slice(1).join(' '); // ej: "heroe espadachin.jpg"

    const altTexto = 'Carta ' + crearAltText(nombreParaAlt); // Usamos el nombre limpio para el Alt
    
    let nuevaCarta = document.createElement('img');
    nuevaCarta.src = 'heroes/' + nombreArchivo; 
    nuevaCarta.alt = altTexto;
    nuevaCarta.className = 'carta';
    
    // Lógica del modal
    nuevaCarta.onclick = function() {
        modal.style.display = "flex";
        modalImg.src = this.src;
    }
    
    galeria.appendChild(nuevaCarta);
    
    // Guardamos la carta con los datos que extrajimos
    todasLasCartas.push({ 
        elemento: nuevaCarta, 
        nombre: altTexto.toLowerCase(),
        clase: claseHeroe // La clase se obtuvo automáticamente
    });
});

// FUNCIÓN DE FILTRADO
function filtrarGaleria() {
    const consultaBuscador = buscador.value.toLowerCase();

    todasLasCartas.forEach(carta => {
        // Comprobación 1: ¿Coincide el nombre con el buscador?
        const nombreCoincide = carta.nombre.includes(consultaBuscador);

        // Comprobación 2: ¿Coincide la clase con el filtro activo?
        const claseCoincide = (filtroClaseActual === 'todos') || (carta.clase === filtroClaseActual);
        
        // La carta SÓLO se muestra si AMBAS condiciones son verdaderas
        if (nombreCoincide && claseCoincide) {
            carta.elemento.style.display = "";
        } else {
            carta.elemento.style.display = "none";
        }
    });
}

// EVENTOS DE LOS BUSCADORES Y BOTONES

// Evento para el buscador
buscador.addEventListener('input', filtrarGaleria);

// Evento para el botón limpiar 
btnLimpiar.addEventListener('click', () => {
    buscador.value = "";
    // Disparamos el evento 'input' para que la función filtrarGaleria se ejecute
    buscador.dispatchEvent(new Event('input')); 
});

// Evento para los botones de filtro de clase
filtroBotones.forEach(boton => {
    boton.addEventListener('click', () => {
        // 1. Quitar la clase "activo" de TODOS los botones
        filtroBotones.forEach(btn => btn.classList.remove('activo'));
        
        // 2. Añadir la clase "activo" SÓLO al botón clicado
        boton.classList.add('activo');
        
        // 3. Actualizar nuestra variable de filtro
        filtroClaseActual = boton.dataset.clase; // "data-clase" en HTML se lee como "dataset.clase" en JS
        
        // 4. Ejecutar el filtro
        filtrarGaleria();
    });

});
