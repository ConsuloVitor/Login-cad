// FUNÇÃO QUE VALIDA O FORMATO DO EMAIL
function validarEmail(email) {
    // Expressão regular para validar o formato do email
    const padraoEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return padraoEmail.test(email);
}

// FUNÇÃO QUE VALIDA O FORMATO DO CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g,''); // Remove caracteres não numéricos

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false; // Verifica se tem 11 dígitos e se todos os dígitos são iguais
    }

    let soma = 0;
    let resto;

    // Validação do primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;

    // Validação do segundo dígito verificador
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

// VALIDAR ACESSO TELA DE LOGIN
// VALIDA SE OS CAMPOS FORAM PREENCHIDO E O REDIRECIONA PARA PAGINA CADASTRO, CASO AO CONTRARIO ENVIA UM ALERTA
function acessar(){
    let loginEmail = document.getElementById('loginEmail').value;
    let loginSenha = document.getElementById('loginSenha').value;

    if(!loginEmail || !loginSenha){
        alert("Por favor preencher todos os campos");
    } else if (!validarEmail(loginEmail)) {
        // alert("Por favor, insira um e-mail válido");
    } else {
        window.location.href = 'cadastro.html';
    }
}


// FUNÇÃO QUE ARMAZENA NOME E EMAIL NA TELA DE CADASTRO
// O CÓDIGO ADICIONA UM NOME À LISTA E LIMPA O CAMPO SE O NOME NÃO ESTIVER VAZIO, CASO CONTRÁRIO, EXIBE UM ALERTA
var dadosLista = [];
function salvarUser() {
    let nomeUser = document.getElementById('nomeUser').value;
    let emailUser = document.getElementById('emailUser').value;
 
    if (nomeUser && emailUser) {
        if(validarEmail(emailUser)) {
        dadosLista.push({ nome: nomeUser, email: emailUser });
        criarLista();
        document.getElementById('nomeUser').value = "";
        document.getElementById('emailUser').value = ""; 
    } else {
        alert('Por favor, insira um e-mail válido.');
       } 
    } else {
        alert('Por favor, informe um nome e um e-mail para cadastro');
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
 
// FUNÇÃO PARA EDITAR NOME E EMAIL DE LISTA
// O CÓDIGO ATUALIZA O CAMPO `NOMEUSER` E `EMAILUSER` COM O VALOR DO ITEM NA POSIÇÃO 'I-1' DO ARRAY `DADOSLISTA` E, EM SEGUIDA, TENTA REMOVER UM ITEM DE DADOSLISTA BASEADO NO VALOR DO ITEM NA POSIÇÃO 'I-1', O QUE PODE NÃO FUNCIONAR CORRETAMENTE.
function editar(i) {
    document.getElementById('nomeUser').value = dadosLista[i].nome;
    document.getElementById('emailUser').value = dadosLista[i].email;
    dadosLista.splice(i, 1); 
   criarLista(); 
}
 
// FUNÇÃO PARA EXCLUIR NOME DE LISTA
// A FUNÇÃO EXCLUIR REMOVE O ITEM DO ARRAY E EXCLUI A LINHA CORRESPONDENTE DA TABELA HTML COM O ID TABELA.
function excluir(i) {
    dadosLista.splice(i, 1);
    criarLista(); 
}