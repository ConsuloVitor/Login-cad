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


