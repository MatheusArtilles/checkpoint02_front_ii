const btnMobile = document.querySelector(".toogle-menu");
btnMobile.addEventListener("click", ()=>{
    btnMobile.classList.toggle("active");
});

const inputs = document.querySelectorAll(".input-form");
const form = document.querySelector("form");
const btnSubmit = document.querySelector(".btn-submit");

let baseApi = "https://todo-api.ctd.academy/v1";

let userObj = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
}

function removeSpaces(valor) {
    return valor.trim();
}

function setCreateUser(userJwt){
    sessionStorage.setItem("jwt", userJwt);
    location.href = "app.html"
}

form.addEventListener("submit", (event)=> {
    event.preventDefault();
    let newList = [inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value];
    
    let normalizes = newList.map(value => {
        let valueNormalize = removeSpaces(value);
        return valueNormalize;
    })
    if(normalizes[3] == normalizes[4]){
        userObj.firstName = normalizes[0].toLowerCase();
        userObj.lastName = normalizes[1].toLowerCase();
        userObj.email = normalizes[2].toLowerCase();
        userObj.password = normalizes[3].toLowerCase();

        let config = {
            method: 'POST',
            body: JSON.stringify(userObj),
            headers: {
                'Content-type': 'application/json'
            },
        }
        fetch(`${baseApi}/users`, config)
            .then(response => {
                if(response.status == 201 || response.status == 200){
                    return response.json();
                }else {
                    throw response;
                }
            }).then(res => {
                setCreateUser(res.jwt);
            })
            .catch(erro => {
                let dangerZone = document.querySelectorAll(".danger-zone");
                if(erro.status == 400 || erro.status == 404){
                    dangerZone.forEach(small => {
                        small.innerText = "Erro no email e/ou senha";
                    })
                    inputs.forEach(input => {
                        input.style.borderColor = "red";
                        input.value = "";
                    })
                    btnSubmit.disabled = true;
                    alert("Esse usuário já existe");
                }
            })
    }else {
        alert("não foi");
    }
})


inputs.forEach(input => {
    
    input.addEventListener("keydown", ()=>{
        let newList = [inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value];
        if(newList.indexOf("") !== -1 || newList.indexOf(null) !== -1){
            btnSubmit.disabled = true;
        }else {
            btnSubmit.disabled = false;
        }
    })
})