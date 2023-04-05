let tokenJwt = sessionStorage.getItem("jwt");
let baseApi =  "https://todo-api.ctd.academy/v1";
let userName = document.querySelector(".user-name");
const form = document.querySelector("form");
const input = document.querySelector("input");
const btnSubmit = document.querySelector(".btn-add");
const listActive = document.querySelector(".lists-active");
const listComplete = document.querySelector(".lists-complete");
onload = () => {
    if(!tokenJwt) {
        alert("algo deu errado ao entrar. Tente novamente");
        location.href = "login.html";
    }else {
        getUser(tokenJwt);
        getTasks(tokenJwt);
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
function exclude(id) {
    let li = document.getElementById("" + id + "");
    let configReqTask = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'authorization': tokenJwt
        },
    }
    if(li) {
        fetch(`${baseApi}/tasks/${id}`, configReqTask)
            .then(response => {
                if(response.status == 201 || response.status == 200){
                    return response.json();
                }else {
                    throw response;
                }
            }).then(res => {
                return res;
            })
        
        listActive.removeChild(li);
    }
}
function complete(id) {
    let li = document.getElementById(""+ id +"");
    let text = li.childNodes[2].textContent;
    
    if(li){
        const task = {
            description: text,
            completed: true
        };
        let taskString = JSON.stringify(task); 
        let configReq = {
            method: 'PUT',
            body: taskString,
            headers: {
                'Content-type': 'application/json',
                'authorization': tokenJwt
            },
        }
        fetch(`${baseApi}/tasks/${id}`, configReq)
            .then(response => {
                if(response.status == 201 || response.status == 200){
                    return response.json();
                }else {
                    throw response;
                }
            }).then(res => {
                createCompleteTask(res.id, res.description, res.createdAt);
            })
        
        listActive.removeChild(li);
    }
    
}
function refresh(id) {
    let li = document.getElementById(""+ id +"");
    let text = li.childNodes[1].textContent;
    if(li){
        const task = {
            description: text,
            completed: false 
        };
        let taskString = JSON.stringify(task);
        let config = {
            method: 'PUT',
            body: taskString,
            headers: {
                'Content-type': 'application/json',
                'authorization': tokenJwt
            },
        }
        fetch(`${baseApi}/tasks/${id}`, config)
            .then(response => {
                if(response.status == 201 || response.status == 200){
                    return response.json();
                }else {
                    throw response;
                }
            }).then(res => {
                addTask(res.id, res.description, res.createdAt);
            })
        
        listComplete.removeChild(li);
    }
}
function blurTask(id) {
    let li = document.getElementById("" + id + "");
    if(li) {
        let includeBlur = li.classList.contains("blur");
        if(includeBlur === true) {
            li.classList.remove("blur");
        } else {
            li.classList.add("blur");
        }
    }
}
function addTask(id, task, dateTask){
    let li = document.createElement("li");
    li.classList.add("task");
    li.id = id;

    let h5 = document.createElement("h5");
    h5.innerText = task;
    
    let buttonLi = document.createElement("button");
    buttonLi.classList.add("btn-complete");
    buttonLi.innerHTML = `<ion-icon name="checkmark-outline"></ion-icon>`;
    buttonLi.setAttribute('onclick', 'complete('+ li.id +')');
   
    let h4 = document.createElement("h4");
    h4.innerText = `id: ${id}`;

    let btnTrash = document.createElement("button");
    btnTrash.classList.add("btn-task");
    btnTrash.classList.add("trash");
    btnTrash.innerHTML = `<ion-icon name="trash-outline"></ion-icon>`;
    btnTrash.setAttribute('onclick', 'exclude('+ li.id +')')
    

    let span = document.createElement("span");
    span.innerText = dateTask;

    let btnEyes = document.createElement("button");
    btnEyes.classList.add("btn-task");
    btnEyes.classList.add("eyes");
    btnEyes.innerHTML = `<ion-icon name="eye-outline"></ion-icon>`;
    btnEyes.setAttribute('onclick', 'blurTask('+ li.id +')');
    

    li.appendChild(buttonLi);
    li.appendChild(h4);
    li.appendChild(h5);
    li.appendChild(span);
    li.appendChild(btnEyes);
    li.appendChild(btnTrash);
    listActive.appendChild(li);
    return li;
}
function createCompleteTask(taskId, taskDescription, taskDate) {
    let li = document.createElement("li");
    li.classList.add("task-complete");
    li.id = taskId;

    let btnRefresh = document.createElement("button");
    btnRefresh.classList.add("btn-task");
    btnRefresh.innerHTML = `<ion-icon name="refresh-outline"></ion-icon>`;
    btnRefresh.setAttribute('onclick', 'refresh('+ li.id +')');

    let h4 = document.createElement("h4");
    h4.innerText = `id: ${taskId}`;

    let h5 = document.createElement("h5");
    h5.innerText = taskDescription;

    let span = document.createElement("span");
    span.innerText = taskDate;

    let btnEyes = document.createElement("button");
    btnEyes.classList.add("btn-task");
    btnEyes.classList.add("eyes");
    btnEyes.innerHTML = `<ion-icon name="eye-outline"></ion-icon>`;
    btnEyes.setAttribute('onclick', 'blurTask('+ li.id +')');
    
    li.appendChild(h4);
    li.appendChild(h5);
    li.appendChild(span);
    li.appendChild(btnEyes);
    li.appendChild(btnRefresh);

    listComplete.appendChild(li);
    return li;
}
function getTasks(token) {
    let taskReq = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'authorization': token
        },
    }
    fetch(`${baseApi}/tasks`, taskReq)
        .then(response => {
            if(response.status == 201 || response.status == 200){
                return response.json();
            }else {
                throw response;
            }
        }).then(res => {
            res.forEach(element => {
                if(element.completed == false){
                    addTask(element.id, element.description, element.createdAt);
                }else {
                    createCompleteTask(element.id, element.description, element.createdAt);
                }
                
            })
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
            addTask(res.id, res.description, res.createdAt);
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
