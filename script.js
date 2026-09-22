const formulario = document.getElementById("form-tarefa");
const inputNome = document.getElementById("nome");
const inputDescricao = document.getElementById("descricao");
const listaTarefas = document.getElementById("lista-tarefas");
const elementoMensagem = document.getElementById("mensagem");

function exibirMensagem(texto, tipo) {

    // insere o texto recebido no elemento HTML
    elementoMensagem.textContent = texto;

    // define uma classe CSS conforme o tipo da mensagem recebida.
    elementoMensagem.className = tipo;
}

function limparMensagem(){

    elementoMensagem.textContent = "";

    elementoMensagem.className = "";
}



let tarefas = [];
let idEditando = null;
let estaSalvando = false;

const botaoSubmit = document.getElementById("botao-submit");


formulario.addEventListener("submit", async function(event) {

    event.preventDefault();

    if (estaSalvando){
        return;
    }

    const nome = inputNome.value.trim();

    const descricao = inputDescricao.value.trim();

    if (nome == "" || descricao == ""){

        alert("Preencha todos os campos.");

        return;
    }

    estaSalvando = true;

    botaoSubmit.disabled = true;

    botaoSubmit.textContent = "Salvando...";


    try {
        // verifica se estamos cadatrando uma nova tarefa
        if (idEditando === null) {
            // enviar tarefa p backend, se o POST falhar, a execução será direcionada para o catch externo do formulário
            await adicionarTarefa(nome, descricao);

            // o POST foi concluído com sucesso, agora atualizar os cards.
            const atualizou = await atualizarListagem();
            
            if (atualizou) {
                exibirMensagem("Tarefa cadastrada com sucesso!", "sucesso");
            } else {
                exibirMensagem("Tarefa cadastrada com sucesso, " + "mas não possível atualizar a lista. ", "erro");
            }

        } else {

            // envia o ID e os dados atualizados para o backend
            await editarTarefa(idEditando, nome, descricao);
            
            const atualizou = await atualizarListagem();

            if (atualizou) {

                exibirMensagem("Tarefa atualizada com sucesso!", "sucesso");

            } else {

                exibirMensagem("Tarefa atualizada com sucesso, " + "mas não possível atualizar a lista.", "erro");
                
            }
        }

        inputNome.value = "";
        inputDescricao.value = "";
        idEditando = null;
        botaoSubmit.textContent = "Adicionar tarefa";
    } catch (erro) {

        // exibe o erro no Console do navegador
        console.error("Erro ao salvar tarefa", erro);

        // informa ao usuário que ocorreu um problema
        exibirMensagem("Não foi possível salvar a tarefa. Tente novamente.", "erro");
    } finally {
        estaSalvando = false;

        botaoSubmit.disabled = false;

        if (idEditando === null) {
            botaoSubmit.textContent = "Adicionar tarefa";
        } else {
            botaoSubmit.textContent = "Salvar alteração";
        }
    }

});



function renderizarTarefas(){

    listaTarefas.innerHTML = " ";

    tarefas.forEach(function(tarefa, index) {

        const card = document.createElement("div");
        card.classList.add("tarefa"); //adicionando uma classe CSS no card
    
        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.nome;

        const descricao = document.createElement("p");
        descricao.textContent = tarefa.descricao;

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.classList.add("botao-excluir");

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";
        botaoEditar.classList.add("botao-editar");

        botaoExcluir.addEventListener("click", async function(){

            const confirmar = confirm(`Deseja realmente excluir a tarefa "${tarefa.nome}"?`);

            if (!confirmar){
                return;
            }

            try {

                await excluirTarefa(tarefa.id);

                if (idEditando === tarefa.id){
                    
                    idEditando = null;

                    inputNome.value = "";
                    inputDescricao.value = "";

                    botaoSubmit.textContent = "Adicionar tarefa";
                }

                const atualizou = await atualizarListagem();

                if (atualizou) {

                    exibirMensagem("Tarefa excluída com sucesso!", "sucesso");

                } else {

                    exibirMensagem("Tarefa excluída com sucesso, " + "mas não foi possível atualizar a lista.", "erro");

                }

            } catch (erro) {
                
                console.error("Erro ao excluir tarefa:", erro);

                exibirMensagem("Não foi possível excluir a tarefa. " + "Tente novamente.", "erro");
            }

        });

        botaoEditar.addEventListener("click", function(){

            inputNome.value = tarefa.nome;

            inputDescricao.value = tarefa.descricao;

            idEditando = tarefa.id;

            botaoSubmit.textContent = "Salvar alteração";
            //console.log("Editar tarefa:", index)
        });


        card.appendChild(titulo);
        card.appendChild(descricao);
        card.appendChild(botaoExcluir);
        card.appendChild(botaoEditar);
        
        listaTarefas.appendChild(card);
        
    });

};

async function buscarTarefas() {
    try {
        // Solicita as tarefas cadastradas no backend.
        const resposta = await fetch(
            "http://127.0.0.1:5000/tarefas"
        );

        // Mostra o status HTTP recebido.
        console.log("Status:", resposta.status);

        // Interrompe a execução se a API retornar um erro HTTP.
        if (!resposta.ok) {
            throw new Error("Não foi possível buscar as tarefas.");
        }

        // Converte a resposta JSON em dados JavaScript.
        const tarefasDoBanco = await resposta.json();

        // Exibe os dados recebidos para conferirmos.
        console.log("Tarefas do banco:", tarefasDoBanco);

        tarefas = tarefasDoBanco;

        renderizarTarefas();

        limparMensagem();

    } catch (erro) {
        console.error("Erro ao buscar tarefas:", erro);
        throw erro;
    }
}

async function adicionarTarefa(nome, descricao) {
    // Endereço da rota resposável por cadastrar tarefas
    const url = "http://127.0.0.1:5000/tarefas";
    
    // organiza os dados recebidos em um obj JS
    const novaTarefa = {
        nome: nome,
        descricao: descricao
    };

    // envia dados para o backend
    const resposta = await fetch(url, {
        // informa que queremos criar um novo recurso
        method: "POST",

        // informa ao flask que estamos enviando dados em JSON
        headers: {
            "Content-Type": "application/json"
        },

        // converte o obj JS em uma string JSON
        body: JSON.stringify(novaTarefa)
    });

    // mostra o status http retornado pelo backend
    console.log("Status do POST:", resposta.status);

    // verifica se o servidor retornou um erro http
    if (!resposta.ok){
        throw new Error("Não foi possível cadastrar a tarefa.");
    }

    // converte a resposta JSON em um obj JS
    const tarefaCadastrada = await resposta.json();

    // mostra o resultado do cadastro no Console
    console.log("Tarefa Cadastrada:", tarefaCadastrada);

    // retorna os dados para quem chamou a função
    return tarefaCadastrada;
}

async function editarTarefa(id, nome, descricao) {

    // monta a URL utilizando o ID da  tarefa
    const url = `http://127.0.0.1:5000/tarefas/${id}`;

    // orgainiza os dados atualizados em um obj JS
    const tarefaAtualizada = {
        nome: nome,
        descricao: descricao
    };

    // envia requisição PUT ao backend
    const resposta = await fetch(url, {

        // informa que queremos atualizar um recurso existente
        method: "PUT",

        // informa ao Flask que estamos enviando dados em JSON
        headers: {
            "Content-Type": "application/json"
        },

        // converte o obj JS em uma string JSON
        body: JSON.stringify(tarefaAtualizada)
    });

    // mostra o status HTTP retornado pelo backend
    console.log("STATUS do PUT:", resposta.status);

    // verifica se o servidor retornou um erro HTTP
    if (!resposta.ok){
        throw new Error("Não foi possível editar a tarefa.");
    }

    // Converte a resposta JSON em um obj JS
    const resultado = await resposta.json();

    // exibe o resultado a edição no console
    console.log("Resultado da edição:", resultado);

    // retorna o resultado para quem chamou a função
    return resultado;

}

async function excluirTarefa(id){

    const url = `http://127.0.0.1:5000/tarefas/${id}`;

    const resposta = await fetch(url, {

        method: "DELETE"

    });

    console.log("Status do DELETE:", resposta.status);

    if(!resposta.ok) {
        throw new Error("Não foi possível excluir a tarefa.");
    }

    console.log("Tarefa excluída. ID:", id);
}

// Executa a busca quando a página é carregada.
buscarTarefas().catch(function(erro){

    console.error("Erro no carregamento inicial das tarefas:", erro);

    exibirMensagem(
        "Não foi possível carregar as tarefas. " +
        "Verifique sua conexão com o servidor.", 
        "erro"
    );

});

async function atualizarListagem() {
    
    try {
        
        await buscarTarefas();
        
        return true;

    } catch (erro) {

        console.error("Erro ao atualizar a listagem:", erro);

        exibirMensagem("Não foi possível atualizar a lista de tarefas. " + "Tente novamente mais tarde. ", "erro");

        return false;
    }
}

