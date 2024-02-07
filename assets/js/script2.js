// Definición de las opciones del juego
const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";

// Definición de los resultados posibles del juego
const TIE = 0;
const WIN = 1;
const LOST = 2;

// Variables de estado del juego
let isPlaying = false; // Indica si se está jugando actualmente
let totalPlays = 0; // Total de rondas a jugar
let wins = 0; // Total de victorias del jugador

// Obtención de los botones de selección de jugada y elementos de texto e imágenes
const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");
const resultText = document.getElementById("start-text");
const userImg = document.getElementById("user-img");
const machineImg = document.getElementById("machine-img");

// Event listeners para cada botón de selección de jugada
rockBtn.addEventListener("click", () => {
    play(ROCK);
});
paperBtn.addEventListener("click", () => {
    play(PAPER);
});
scissorsBtn.addEventListener("click", () => {
    play(SCISSORS);
});

// Creación del botón para jugar de nuevo
const playAgainBtn = document.createElement("button");
playAgainBtn.textContent = "Volver a jugar";
playAgainBtn.style.display = "none"; // El botón no se muestra inicialmente
playAgainBtn.addEventListener("click", startNewRound);
document.body.appendChild(playAgainBtn);
// Obtén la referencia al contenedor principal
const container = document.querySelector(".container");
// Inserta el botón después del título h1
container.insertAdjacentElement("afterbegin", playAgainBtn);
// Agrega el evento clic al botón
playAgainBtn.addEventListener("click", startNewRound);

// Función para iniciar una nueva ronda
function startNewRound() {
    // Se solicita el nombre del jugador
    const playerName = prompt("Por favor, ingresa tu nombre:");
    if (playerName === null || playerName.trim() === "") {
        alert("Por favor, ingresa un nombre válido.");
        return;
    }

    // Se solicita la cantidad de rondas a jugar
    const playCount = prompt(`Hola, ${playerName}! ¿Cuántas veces deseas jugar consecutivamente?`);
    if (playCount === null || isNaN(playCount) || playCount <= 0) {
        alert("Por favor, ingresa un número válido mayor a cero.");
        return;
    }

    // Se actualiza el total de rondas y se reinician las victorias
    totalPlays = parseInt(playCount);
    wins = 0;
    playNextRound(); // Se inicia la primera ronda
}

// Función para jugar la siguiente ronda
function playNextRound() {
    if (totalPlays === 0) {
        // Si se han completado todas las rondas, se muestra el mensaje de finalización
        resultText.innerHTML = `Haz completado todas las rondas. Ganaste ${wins} veces.`;
        playAgainBtn.style.display = "block"; // Se muestra el botón para jugar de nuevo
        return;
    }

    totalPlays--; // Se reduce el número de rondas restantes

    resultText.innerHTML = "Selecciona tu jugada:"; // Se muestra el texto de selección de jugada
    isPlaying = false; // Se indica que no se está jugando actualmente
}

// Iniciar la primera ronda al cargar la página
startNewRound();

// Función para jugar una ronda
function play(userOption) {
    if (isPlaying) return; // Si ya se está jugando, se ignora la selección del jugador

    isPlaying = true; // Se indica que se está jugando
// OJO RUTA CARPETA IMAGEN
    userImg.src = "./assets/img/" + userOption + ".svg"; // Se muestra la imagen de la jugada del jugador

    resultText.innerHTML = "Eligiendo!"; // Se muestra el texto de "Eligiendo jugada"

    // Se simula la selección de la máquina con un intervalo
    const interval = setInterval(function () {
        const machineOption = calcMachineOption();
        machineImg.src = "./assets/img/" + machineOption + ".svg";
    }, 200);
// OJO RUTA CARPETA IMAGEN
    setTimeout(function () {
        clearInterval(interval); // Se detiene la simulación de selección de la máquina

        // Se obtiene la jugada de la máquina
        const machineOption = calcMachineOption();
        // Se calcula el resultado de la ronda
        const result = calcResult(userOption, machineOption);
// OJO RUTA CARPETA IMAGEN
        machineImg.src = "./assets/img/" + machineOption + ".svg"; // Se muestra la imagen de la jugada de la máquina

        // Se muestra el resultado de la ronda en función del resultado obtenido
        switch (result) {
            case TIE:
                resultText.innerHTML = "Empate!";
                break;
            case WIN:
                resultText.innerHTML = "Ganaste!";
                wins++; // Se incrementa el contador de victorias
                break;
            case LOST:
                resultText.innerHTML = "Perdiste!";
                break;
        }

        setTimeout(playNextRound, 1000); // Se espera un segundo y se inicia la siguiente ronda

    }, 2000); // Se espera dos segundos para simular la selección de la máquina
}

// Función para calcular la jugada de la máquina
function calcMachineOption() {
    const number = Math.floor(Math.random() * 3);
    switch (number) {
        case 0:
            return ROCK;
        case 1:
            return PAPER;
        case 2:
            return SCISSORS;
    }
}

// Función para calcular el resultado de la ronda
function calcResult(userOption, machineOption) {
    if (userOption === machineOption) {
        return TIE; // Si las jugadas son iguales, es un empate
    } else if (userOption === ROCK) {
        if (machineOption === PAPER) return LOST; // Si la máquina juega papel, pierde el jugador
        if (machineOption === SCISSORS) return WIN; // Si la máquina juega tijeras, gana el jugador
    } else if (userOption === PAPER) {
        if (machineOption === SCISSORS) return LOST; // Si la máquina juega tijeras, pierde el jugador
        if (machineOption === ROCK) return WIN; // Si la máquina juega piedra, gana el jugador
    } else if (userOption === SCISSORS) {
        if (machineOption === ROCK) return LOST; // Si la máquina juega piedra, pierde el jugador
        if (machineOption === PAPER) return WIN; // Si la máquina juega papel, gana el jugador
    }
}
