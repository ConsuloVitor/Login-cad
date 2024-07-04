// VALIDAR ACESSO TELA DE LOGIN

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

var dadosLista = [];
function salvarUser(){
    let nomeUser = document.getElementById('nomeUser').value;

    if(nomeUser){
        dadosLista.push(nomeUser);
        console.log(dadosLista);
        document.getElementById("nomeUser").value = "";
    }else{
        alert("Por favor informar o nome para cadastro");
    }
}
