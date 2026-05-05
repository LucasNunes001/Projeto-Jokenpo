const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');
const result = document.getElementById('result');
const resetBtn = document.getElementById('reset');

let playerScore = 0;
let machineScore = 0;

const score = document.getElementById("score-players");

// Máquina escolhe
function playMachine() {
    const options = ['rock', 'paper', 'scissors']; 
    const randomNumber = Math.floor(Math.random() * 3);
    return options[randomNumber];
}

// Animação do resultado (fade + cor)
function setResult(text, color) { // Primeiro, esconde o resultado para a transição
    result.style.opacity = 0;
    result.style.transform = "translateY(10px)";

    setTimeout(() => { // Depois de 150ms, atualiza o texto e a cor, e mostra o resultado com a animação
        result.innerText = text;
        result.style.color = color;
        result.style.opacity = 1;
        result.style.transform = "translateY(0)";
    }, 150);
}

// Animação da máquina pensando
function animateThinking(callback) {
    const options = ['✊', '✋', '✌️'];
    let i = 0;

    const interval = setInterval(() => { // A cada 120ms, muda o símbolo para simular o pensamento
        result.innerText = options[i % 3] + " ...";
        i++;
    }, 120);

    setTimeout(() => { // Após 1 segundo, para a animação e executa o jogo
        clearInterval(interval);
        callback(); // depois executa o jogo
    }, 1000);
}

//  Lógica do jogo 
function playGame(playerChoice) {
    const machineChoice = playMachine();

    if (playerChoice === machineChoice) { // Empate
        setResult('Empate!', 'orange');
        return;
    }

    if ( // Condições de vitória do jogador
        (playerChoice === 'rock' && machineChoice === 'scissors') ||  
        (playerChoice === 'paper' && machineChoice === 'rock') ||  
        (playerChoice === 'scissors' && machineChoice === 'paper')
    ) {
        playerScore++;
        score.innerText = `${playerScore} | ${machineScore}`;
        setResult('Você venceu!', 'green');
        
    } else { // Condições de vitória da máquina
        machineScore++;
        score.innerText = `${playerScore} | ${machineScore}`;
        setResult('Você perdeu!', 'red');
    }
}

// Função para resetar o jogo
function resetGame() {
    playerScore = 0;
    machineScore = 0;
    score.innerText = `${playerScore} | ${machineScore}`;
    result.innerText = "Placar resetado!";
    result.style.color = "black"; // opcional
}

// Eventos dos botóes com animação de pensamento
rock.addEventListener('click', () => {
    animateThinking(() => playGame('rock'));
});

paper.addEventListener("click", () => {
    animateThinking(() => playGame("paper"));
});

scissors.addEventListener("click", () => {
    animateThinking(() => playGame("scissors"));
});

// Evento do botão de reset
resetBtn.addEventListener('click', resetGame);