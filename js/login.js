const btnMobile = document.querySelector(".toogle-menu");
btnMobile.addEventListener("click", ()=>{
    btnMobile.classList.toggle("active");
});

let inputs = document.querySelectorAll(".input-form");
const form = document.querySelector("form");
const btnSubmit = document.querySelector(".btn-submit");

let baseApi = "https://todo-api.ctd.academy/v1";

let loginUser = {
    email: "",
    password: ""
}

function removeSpaces(valor) {
    return valor.trim();
}
function setLoginUser(userJwt){
    sessionStorage.setItem("jwt", userJwt);
    location.href = "app.html"
}
form.addEventListener("submit", (event)=> {
    event.preventDefault();
    let emailInput = inputs[0].value;
    let passwordInput = inputs[1].value;

    let emailNormalize = removeSpaces(emailInput);
    let passwordNormalize = removeSpaces(passwordInput);

    loginUser.email = emailNormalize;
    loginUser.password = passwordNormalize;
    let loginUserString = JSON.stringify(loginUser);

    let configReq = {
      method: 'POST',
      body: loginUserString,
      headers: {
        'Content-type': 'application/json',
      },
    }
    
    fetch(`${baseApi}/users/login`, configReq)
        .then(response => {
            console.log(response);
            if(response.status == 201 || response.status == 200) {
               return response.json();
            }else {
                throw response;
            }
        })
         .then(function(resposta) {
            console.log(resposta.jwt);
            setLoginUser(resposta.jwt);
         })
         .catch(erro => {
            let dangerZone = document.querySelectorAll(".danger-zone");
            if(erro.status == 400 || erro.status == 404){
                dangerZone.forEach(small => {
                    small.innerText = "Erro no email e/ou senha";
                })
                inputs.forEach(input => {
                    input.style.borderColor = "red";
                })
                inputs[1].value = "";
            }
         })

});

inputs.forEach(input => {
    
    input.addEventListener("keydown", ()=>{
        let listInputs = [inputs[0].value, inputs[1].value];
        if(listInputs.indexOf("") !== -1 || listInputs.indexOf(null) !== -1){
            btnSubmit.disabled = true;
        }else {
            btnSubmit.disabled = false;
        }
    })
})