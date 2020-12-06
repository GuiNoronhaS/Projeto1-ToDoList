var botaoAdd = document.getElementById("adicionar");
var campoTxt = document.getElementById("tarefa");
var campoLista = document.getElementById("lista");
var listaTarefas = [];
carregarLista();
if (listaTarefas.length > 1) {
    var controleListaId = listaTarefas[listaTarefas.length - 1].id + 1;
} else {
    var controleListaId = 1;
}

function adicionarElemento() {
    var elemento = campoTxt.value;
    if (elemento) {
        adicionarALista(controleListaId, elemento, false);
        salvarNoLocalStorage(controleListaId, elemento, false);
        campoTxt.value = '';
    } else {
        alert("O campo esta vazio, Imposivel adicionar uma Tarefa Vazia!")
    }
}

function adicionarALista(idLista, novoItemLista, marcarCheck) {
    var itemLista = document.createElement('li');
    itemLista.id = 'li-' + idLista;
    itemLista.className = 'estilizarLista';
    var item = document.createElement('input');
    item.type = "checkbox";
    item.id = 'input-' + idLista;
    item.checked = marcarCheck;
    item.onchange = conferirCheckbox;
    itemLista.appendChild(item);
    var nomeItem = document.createElement('label');
    nomeItem.id = 'label-' + idLista;
    nomeItem.textContent = novoItemLista;
    itemLista.appendChild(nomeItem);
    var deleteButton = document.createElement('button');
    deleteButton.id = 'delete-' + idLista;
    deleteButton.className= 'estilizarDeleteButton';
    deleteButton.onclick = deleteTarefa;
    var icone = document.createElement('img')
    icone.src = "/resources/assets/icons/delete.png";
    icone.alt = "delete";
    deleteButton.appendChild(icone);
    itemLista.appendChild(deleteButton);
    campoLista.appendChild(itemLista);
}

function salvarNoLocalStorage(novoIdLista, novoElemento, novoCheck) {
    var elementoParaLista = { id: novoIdLista, tarefa: novoElemento, valor: novoCheck }
    listaTarefas.push(elementoParaLista);
    controleListaId += 1;
    localStorage.setItem('lista', JSON.stringify(listaTarefas));
}

function carregarLista() {
    var temp = JSON.parse(localStorage.getItem('lista'));
    if (temp) {
        listaTarefas = temp;
        for (var i = 0; i < listaTarefas.length; i++) {
            adicionarALista(listaTarefas[i].id, listaTarefas[i].tarefa, listaTarefas[i].valor);
        }
    }
}

function conferirCheckbox() {
    var id = this.id;
    id = id.replace('input-', '');
    var checkID = listaTarefas.findIndex(x => x.id == id);
    listaTarefas[checkID].valor = this.checked;
    localStorage.setItem('lista', JSON.stringify(listaTarefas));
}

function deleteTarefa() {
    var id = this.id;
    id = id.replace('delete-', 'label-')
    if (confirm("Realmente deseja deletar a tarefa: "+ document.getElementById(id).textContent +"?")) {
        var linha = id.replace('label-', 'li-');
        id = id.replace('label-', '')
        document.getElementById(linha).innerHTML = '';
        document.getElementById(linha).remove();
        var deleteID = listaTarefas.findIndex(x => x.id == id);
        listaTarefas.splice(deleteID, 1);
        localStorage.setItem('lista', JSON.stringify(listaTarefas));
    }
}

function verificarKey(key) {
    if (key.key === 'Enter') {
        adicionarElemento()
    }
}

campoTxt.addEventListener('keydown', verificarKey)
botaoAdd.addEventListener('click', adicionarElemento);