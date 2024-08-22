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
function salvarUser() {
    let nomeUser = document.getElementById('nomeUser').value;
    let emailUser = document.getElementById('emailUser').value;
 
    if (nomeUser && emailUser) {
        dadosLista.push({ nome: nomeUser, email: emailUser });
        criarLista();
        document.getElementById('nomeUser').value = "";
        document.getElementById('emailUser').value = ""; 
    } else {
        alert('Por favor, informe um nome e um e-mail para cadastro.');
    }
}

// FUNÇÃO PARA CRIAR LISTA DE USUÁRIOS
// O CÓDIGO ATUALIZA O CONTEÚDO DA TABELA HTML PARA EXIBIR OS NOMES DA LISTA, ELE CRIA LINHAS PARA CADA NOME, ADICIONANDO "BOTÕES DE EDITAR E EXCLUIR"
function criarLista() {
    let tabela = "<tr><th>Nome Usuario</th><th>Email</th><th>Ações</th></tr>";
    for (let i = 0; i < dadosLista.length; i++) {
        tabela += "<tr><td>" + dadosLista[i].nome + "</td><td>" + dadosLista[i].email + "</td>" +
                  "<td><button type='button' onclick='editar(" + i + ")'>Editar</button>" +
                  "<button type='button' onclick='excluir(" + i + ")'>Excluir</button></td></tr>";
    }
    document.getElementById('tabela').innerHTML = tabela;
}
 
// FUNÇÃO PARA EDITAR NOMES DE LISTA
// O CÓDIGO ATUALIZA O CAMPO `NOMEUSER` COM O VALOR DO ITEM NA POSIÇÃO 'I-1' DO ARRAY `DADOSLISTA` E, EM SEGUIDA, TENTA REMOVER UM ITEM DE DADOSLISTA BASEADO NO VALOR DO ITEM NA POSIÇÃO 'I-1', O QUE PODE NÃO FUNCIONAR CORRETAMENTE.
function editar(i) {
    document.getElementById('nomeUser').value = dadosLista[i].nome;
    document.getElementById('EmailUser').value = dadosLista[i].email;
    dadosLista.splice(i, 1); 
   criarLista(); 
}
 
// FUNÇÃO PARA EXCLUIR NOME DE LISTA
// A FUNÇÃO EXCLUIR REMOVE O ITEM DO ARRAY E EXCLUI A LINHA CORRESPONDENTE DA TABELA HTML COM O ID TABELA.
function excluir(i) {
    dadosLista.splice(i, 1);
    criarLista(); 
}