// VALIDAR ACESSO TELA DE LOGIN
// VALIDA SE OS CAMPOS FORAM PREENCHIDO E O REDIRECIONA PARA PAGINA CADASTRO, CASO AO CONTRARIO ENVIA UM ALERTA
function acessar(){
    let loginEmail = document.getElementById('loginEmail').value;
    let loginSenha = document.getElementById('loginSenha').value;

    if(!loginEmail || !loginSenha){
        alert("Por favor preencher todos os campos");
    }else{
        // alert("Campos preenchido com sucesso");
        window.location.href = 'cadastro.html';
    }
}


// FUNÇÃO QUE ARMAZENA NOME NA TELA DE CADASTRO
// O CÓDIGO ADICIONA UM NOME À LISTA E LIMPA O CAMPO SE O NOME NÃO ESTIVER VAZIO, CASO CONTRÁRIO, EXIBE UM ALERTA
var dadosLista = [];
function salvarUser(){
    let nomeUser = document.getElementById('nomeUser').value;

    if(nomeUser){
        dadosLista.push(nomeUser);
        // console.log(dadosLista);
        criaLista();
        document.getElementById("nomeUser").value = "";
    }else{
        alert("Por favor informar o nome para cadastro");
    }
}

// FUNÇÃO PARA CRIAR LISTA DE USUÁRIOS
// O CÓDIGO ATUALIZA O CONTEÚDO DA TABELA HTML PARA EXIBIR OS NOSMES DA LISTA, ELE CRIA LINHAS PARA CADA NOME, ADICIONANDO "BOTÕES DE EDITAR E EXCLUIR"
function criaLista(){
    let tabela = document.getElementById('tabela').innerHTML = "<tr><th>Nome Usuário</th><th>Ações</th></tr>";
    for(let i=0;i<=(dadosLista.length - 1);i++){
        tabela += "<tr><td>" + dadosLista[i] + "</td><td><button type='button' onclick='editar(parentNode.parentNode.rowIndex)'>Editar</button><button type='button' onclick='excluir(parentNode.parentNode.rowIndex)'>Excluir</button></td></tr>";
        document.getElementById('tabela').innerHTML = tabela;
    }
}

// FUNÇÃO PARA EDITAR NOMES DE LISTA
// O CÓDIGO ATUALIZA O CAMPO `NOMEUSER` COM O VALOR DO ITEM NA POSIÇÃO 'I-1' DO ARRAY `DADOSLISTA` E, EM SEGUIDA, TENTA REMOVER UM ITEM DE DADOSLISTA BASEADO NO VALOR DO ITEM NA POSIÇÃO 'I-1', O QUE PODE NÃO FUNCIONAR CORRETAMENTE.
function editar(i){
    document.getElementById('nomeUser').value = dadosLista[(i - 1)];
    dadosLista.splice(dadosLista[(i - 1)], 1);
}

// FUNÇÃO PARA EXCLUIR NOME DE LISTA
// A FUNÇÃO EXCLUIR REMOVE O ITEM DO ARRAY E EXCLUI A LINHA CORRESPONDENTE DA TABELA HTML COM O ID TABELA.
function excluir(i){
    dadosLista.splice((i - 1), 1);
    document.getElementById('tabela').deleteRow(i);
}