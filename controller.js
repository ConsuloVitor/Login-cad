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
        soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;

    // Validação do segundo dígito verificador
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
}

// VALIDAR ACESSO TELA DE LOGIN
// VALIDA SE OS CAMPOS FORAM PREENCHIDOS E O REDIRECIONA PARA A PÁGINA DE CADASTRO, CASO CONTRÁRIO ENVIA UM ALERTA
function acessar() {
    let loginEmail = document.getElementById('loginEmail').value;
    let loginSenha = document.getElementById('loginSenha').value;
    let loginCPF = document.getElementById('loginCPF').value;

    if (!loginEmail || !loginSenha || !loginCPF) {
        alert("Por favor, preencha todos os campos");
    } else if (!validarEmail(loginEmail)) {
        alert("Por favor, insira um e-mail válido");
    } else if (!validarCPF(loginCPF)) {
        alert("Por favor, insira um CPF válido.");
    } else {
        window.location.href = 'cadastro.html';
    }
}

// FUNÇÃO QUE ARMAZENA NOME, EMAIL E CPF NA TELA DE CADASTRO
// O CÓDIGO ADICIONA UM NOME À LISTA E LIMPA OS CAMPOS SE O NOME NÃO ESTIVER VAZIO, CASO CONTRÁRIO, EXIBE UM ALERTA
var dadosLista = [];
function salvarUser() {
    let nomeUser = document.getElementById('nomeUser').value;
    let emailUser = document.getElementById('emailUser').value;
    let cpfUser = document.getElementById('cpfUser').value;

    if (nomeUser && emailUser && cpfUser) {
        if (!validarEmail(emailUser)) {
            alert('Por favor, insira um e-mail válido.');
        } else if (!validarCPF(cpfUser)) {
            alert('Por favor, insira um CPF válido.');
        } else {
            dadosLista.push({ nome: nomeUser, email: emailUser, cpf: cpfUser });
            criarLista();
            document.getElementById('nomeUser').value = "";
            document.getElementById('emailUser').value = ""; 
            document.getElementById('cpfUser').value = ""; 
        }
    } else {
        alert('Por favor, preencha todos os campos.');
    } 
}

// FUNÇÃO PARA CRIAR LISTA DE USUÁRIOS
// O CÓDIGO ATUALIZA O CONTEÚDO DA TABELA HTML PARA EXIBIR OS DADOS DA LISTA, CRIANDO LINHAS PARA CADA ITEM, ADICIONANDO "BOTÕES DE EDITAR E EXCLUIR"
function criarLista() {
    let tabela = "<tr><th>Nome Usuário</th><th>Email</th><th>CPF</th><th>Ações</th></tr>";
    for (let i = 0; i < dadosLista.length; i++) {
        tabela += "<tr><td>" + dadosLista[i].nome + "</td><td>" + dadosLista[i].email + "</td><td>" + dadosLista[i].cpf + "</td>" +
        "<td><button type='button' onclick='editar(" + i + ")'>Editar</button>" +
        "<button type='button' onclick='excluir(" + i + ")'>Excluir</button></td></tr>";
    }
    document.getElementById('tabela').innerHTML = tabela;
}
 
// FUNÇÃO PARA EDITAR NOME, EMAIL E CPF DA LISTA
// O CÓDIGO ATUALIZA OS CAMPOS `NOMEUSER`, `EMAILUSER` E `CPUSER` COM O VALOR DO ITEM NA POSIÇÃO 'I' DO ARRAY `DADOSLISTA` E REMOVE O ITEM DA LISTA
function editar(i) {
    document.getElementById('nomeUser').value = dadosLista[i].nome;
    document.getElementById('emailUser').value = dadosLista[i].email;
    document.getElementById('cpfUser').value = dadosLista[i].cpf;
    dadosLista.splice(i, 1); 
    criarLista(); 
}
 
// FUNÇÃO PARA EXCLUIR ITEM DA LISTA
// A FUNÇÃO REMOVE O ITEM DO ARRAY E ATUALIZA A TABELA HTML COM O ID TABELA
function excluir(i) {
    dadosLista.splice(i, 1);
    criarLista(); 
}