let tokenJwt = sessionStorage.getItem("jwt");
let baseApi =  "https://todo-api.ctd.academy/v1";
let userName = document.querySelector(".user-name");
const form = document.querySelector("form");
const input = document.querySelector("input");
const btnSubmit = document.querySelector(".btn-add");
onload = () => {
    if(!tokenJwt) {
        alert("algo deu errado ao entrar. Tente novamente");
        location.href = "login.html";
    }else {
        getUser(tokenJwt);
    }
}
function getUser(key){
    let reqConfig = {
        method: 'GET',
        headers: {
        'Content-type': 'application/json',
        'authorization': key
        },
    }
    fetch(`${baseApi}/users/getMe`, reqConfig)
        .then(response => {
            if(response.status == 201 || response.status == 200){
                return response.json();
            }else {
                throw response;
            }
        }).then(respost => {
            console.log(respost);
            userName.innerText = `${respost.firstName} ${respost.lastName}`;
        })
        .catch(erro => {
            if(erro.status == 400 || erro.status == 401) {
                alert("erro no servidor. Tente novamente");
                location.href = "login.html";
            }
        })
}
function setTask(descriptionTask, tokenJwtTask){
    const task = {
        description: descriptionTask,
        completed: false
    };
    let taskString = JSON.stringify(task);
    let configTaskReq = {
        method: 'POST',
        body: taskString,
        headers: {
            'Content-type': 'application/json',
            'authorization': tokenJwtTask
        },
    }
    fetch(`${baseApi}/tasks`, configTaskReq)
        .then(response => {
            if(response.status == 201 || response.status == 200){
                console.log(response);
                return response.json();
            }else {
                throw response;
            }  
        }).then(res => {
            console.log(res);
        })
}
form.addEventListener("submit", (event)=>{
    event.preventDefault();
    setTask(input.value, tokenJwt);
});

input.addEventListener("keydown", ()=>{
    if(input.value == "" || input.length <= 0){
        btnSubmit.disabled = true;
    }else {
        btnSubmit.disabled = false;
    }
})
