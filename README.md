<p align="center">
 <img loading="lazy" src="http://img.shields.io/static/v1?label=STATUS&message=COMPLETO&color=green&style=for-the-badge"/>
</p>

<h1 align="center">Validação de Acesso e Manipulação de Lista de Usuários</h1>

<h3 align="center"> Este projeto implementa uma interface simples para validar o acesso a uma tela de login, redirecionar o usuário para uma página de cadastro e gerenciar uma lista de usuários. As funcionalidades incluem a adição, edição e exclusão de usuários, tudo dentro de uma aplicação web simples. </h3>

<h1 align="center"> Funcionalidades </h1>

## 1. Validação de Acesso à Tela de Login

A função `acessar()` valida se os campos de email e senha foram preenchidos na tela de login. Caso estejam preenchidos, o usuário é redirecionado para a página de cadastro. Se algum dos campos estiver vazio, um alerta é exibido.

```
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
```
<h2>Explicação:</h2>
<h4>• Captura os valores dos campos de email e senha.</h4>
<h4>• Verifica se os campos foram preenchidos.</h4>
<h4>• Se preenchidos, redireciona o usuário para cadastro.html.</h4>
<h4>• Caso contrário, exibe um alerta.</h4>

---

## 2. Armazenamento de Usuários na Tela de Cadastro

A função `salvarUser()` armazena os dados do usuário (nome, email e cpf) em uma lista quando ambos os campos são preenchidos corretamente. Após salvar, os campos de entrada são limpos.

```
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
```

<h2>Explicação:</h2>
<h4>• Adiciona o usuário à lista <code>dadosLista</code>.</h4>
<h4>• Atualiza a lista de usuários exibida na tela.</h4>
<h4>• Limpa os campos de entrada após o salvamento.</h4>

## 3. Criação da Lista de Usuários

A função `criarLista()` atualiza a tabela HTML para exibir os usuários cadastrados, criando uma linha para cada usuário com opções de edição e exclusão.

```
function criarLista() {
    let tabela = "<tr><th>Nome Usuário</th><th>Email</th><th>CPF</th><th>Ações</th></tr>";
    for (let i = 0; i < dadosLista.length; i++) {
        tabela += "<tr><td>" + dadosLista[i].nome + "</td><td>" + dadosLista[i].email + "</td><td>" + dadosLista[i].cpf + "</td>" +
        "<td><button type='button' onclick='editar(" + i + ")'>Editar</button>" +
        "<button type='button' onclick='excluir(" + i + ")'>Excluir</button></td></tr>";
    }
    document.getElementById('tabela').innerHTML = tabela;
}
```
<h2>Explicação:</h2>
<h4>• Cria uma linha na tabela para cada usuário na lista.</h4>
<h4>• Adiciona botões de "Editar" e "Excluir" para cada usuário.</h4> 


## 4. Edição de Usuários

A função `editar(i)` permite que um usuário seja editado, preenchendo os campos de entrada com os dados do usuário selecionado e removendo-o temporariamente da lista.

```
function editar(i) {
    document.getElementById('nomeUser').value = dadosLista[i].nome;
    document.getElementById('emailUser').value = dadosLista[i].email;
    document.getElementById('cpfUser').value = dadosLista[i].cpf;
    dadosLista.splice(i, 1); 
    criarLista(); 
}
```
<h2>Explicação:</h2>
<h4>• Preenche os campos de entrada com os dados do usuário selecionado.</h4>
<h4>• Remove o usuário da lista para que possa ser editado.</h4>
<h4>• Atualiza a tabela após a remoção.</h4>


## 5. Exclusão de Usuários

A função `excluir(i)` remove um usuário da lista e atualiza a tabela para refletir a exclusão.

```
function excluir(i) {
    dadosLista.splice(i, 1);
    criarLista(); 
}
```

## 6. Válidação de E-mail

A função valida o campo do E-mail

```
function validarEmail(email) {
    const padraoEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return padraoEmail.test(email);
}
```

## 7. Válidação de CPF

A função valida o campo do CPF

```
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
```



<h2>Explicação:</h2>
<h4>• Remove o usuário da lista.</h4>
<h4>• Atualiza a tabela para remover a linha correspondente.</h4>

<h1 align="center">Como Utilizar</h1>

<h2 align="center">Tela de Login</h2>
<h4>• Preencha os campos de e-mail, senha e CPF.</h4>
<h4>• Clique no botão de login para verificar os dados e ser redirecionado para a tela de cadastro.</h4>

<h2 align="center">Tela de Cadastro</h2>
<h4>• Preencha os campos de nome, e-mail e CPF.</h4>
<h4>• Clique no botão de salvar para adicionar o usuário à lista.</h4>
<h4>• Utilize os botões de editar e excluir para gerenciar os dados na tabela.</h4>

