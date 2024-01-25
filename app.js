//Permite buscar um elemento HTML com base em um seletor CSS.
    // let titulo = document.querySelector('h1');

//Define o conteúdo HTML de um elemento.
    // titulo.innerHTML = 'Jogo do número secreto!';

let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

let paragrafo = document.querySelector('p');
paragrafo.innerHTML = 'Escolha um número entre 1 e 10:';

// Function é um bloco de código que você pode chamar quando quiser realizar uma tarefa específica.
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto!');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10:');
}

exibirMensagemInicial();

function verificarChute() {
    //O .value permite que você acesse e manipule o conteúdo inserido pelo usuário em elementos interativos de um formulário.
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);

        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute < numeroSecreto) {
            exibirTextoNaTela('h1', 'Você errou!');
            exibirTextoNaTela('p', 'O número secreto é maior!');
        } else {
            exibirTextoNaTela('h1', 'Você errou!');
            exibirTextoNaTela('p', 'O número secreto é menor!');
        }
        tentativas++;
        limparCampo();
    }
}


// O return é como a resposta que você obtém quando pede algo para uma função. Pode ser um número, uma mensagem, ou até mesmo indicar que algo deu errado. 
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * 4 + 1);
    //A propriedade .length é usada para obter a quantidade de elementos em uma lista/array em JavaScript.
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido) ) {
        return gerarNumeroAleatorio();
    } else {
        // .push() é utilizada para adicionar um ou mais elementos ao final de um array. 
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    //O .querySelector seleciona o primeiro elemento que corresponde ao seletor CSS especificado.
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    exibirMensagemInicial();
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    document.getElementById('reiniciar').setAttribute('disabled',true);
}