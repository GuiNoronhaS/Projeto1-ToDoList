var botaoAdd = document.getElementById("adicionar");
var campoTxt = document.getElementById("tarefa");
var campoLista = document.getElementById("lista");
var listaTarefas = [];
carregarListaTemp();

function adicionarElemento() {
    var elemento = campoTxt.value;
    if(elemento) {
        adicionarALista(elemento);
        salvarNoLocalStorage(elemento);
    } else {
        alert("O campo esta vazio, Imposivel adicionar uma Tarefa Vazia!")
    }
}

function adicionarALista(ItemLista) {
    var item = document.createElement('li');
    item.textContent = ItemLista;
    campoLista.appendChild(item);
}

function salvarNoLocalStorage(novoElemento) {
    listaTarefas.push(novoElemento);
    localStorage.setItem('temporario', JSON.stringify(listaTarefas));
}

function carregarListaTemp() {
    var temp = JSON.parse(localStorage.getItem('temporario'));
    if(temp) {
        listaTarefas = temp;
        for(var i = 0; i < listaTarefas.length; i++) {
            adicionarALista(listaTarefas[i]);
        }
    }
}

function verificarKey(key) {
    if(key.key === 'Enter'){
        adicionarElemento()
    }
}

campoTxt.addEventListener('keydown', verificarKey)
botaoAdd.addEventListener('click', adicionarElemento);