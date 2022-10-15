const cartas = document.querySelectorAll('.carta');
let estaVirada = false;
let estaBloqueado = false;
let primeiraCarta, segundaCarta;

const qtdDeMatchsNescessarios = 6
let matchsDados = 0

cartas.forEach(card => card.addEventListener('click', flipCard));

function flipCard() {
    if (estaBloqueado) {
        return;
    }

    const ehPrimeiraCarta = (this === primeiraCarta);
    if (ehPrimeiraCarta) {
        return;
    }

    this.classList.add('flip');

    if (!estaVirada) {
        estaVirada = true;
        primeiraCarta = this;

        return;
    }

    segundaCarta = this;
    validandoCartasSelecionadas();
}

function validandoCartasSelecionadas() {
    const primeiraCartaID = primeiraCarta.dataset.framework;
    const segundaCartaID = segundaCarta.dataset.framework;
    let ehIgual = (primeiraCartaID === segundaCartaID);

    if (ehIgual) {
        ehFimDeJogo();
        desabilitandoCarta();
    } else {
        desvirandoCarta();
    }
}

function ehFimDeJogo() {
    matchsDados += 1;

    const estaCompleto = (matchsDados === qtdDeMatchsNescessarios);
    if (estaCompleto) {
        console.log("Jogo completado!")
    }
}

function desabilitandoCarta() {
    primeiraCarta.removeEventListener('click', flipCard);
    segundaCarta.removeEventListener('click', flipCard);

    resetandoJogo();
}

function desvirandoCarta() {
    estaBloqueado = true;

    setTimeout(() => {
        primeiraCarta.classList.remove('flip');
        segundaCarta.classList.remove('flip');

        resetandoJogo();
    }, 1000);
}

function limpando() {
    cartas.forEach(carta => carta.classList.remove('flip'));
    cartas.forEach(card => card.addEventListener('click', flipCard));

    resetandoJogo()
    embaralhar()
}

function resetandoJogo() {
    [estaVirada, estaBloqueado] = [false, false];
    [primeiraCarta, segundaCarta] = [null, null];
}

function embaralhar() {
    cartas.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}

embaralhar();