let tokenJwt = sessionStorage.getItem("jwt");
let baseApi =  "https://todo-api.ctd.academy/v1";
let userName = document.querySelector(".user-name");
const form = document.querySelector("form");
const input = document.querySelector("input");
const btnSubmit = document.querySelector(".btn-add");
const listActive = document.querySelector(".lists-active");
const listComplete = document.querySelector(".lists-complete");
const btnExit = document.querySelector(".btn-exit");
const audioAdd = document.querySelector(".sound-add-task");
const trashTaskAudio = document.querySelector(".sound-trash-task");
const exitModal = document.querySelector(".return");
const saveNewTask = document.querySelector(".btn-edit-task");
const formModal = document.querySelector(".form-modal");

onload = () => {
    if(!tokenJwt) {
        location.href = "index.html";
    }else {

        getUser(tokenJwt);
        getTasks(tokenJwt);
    }
    getDarkMode();
}
btnExit.addEventListener("click", ()=> {
    sessionStorage.removeItem("jwt");
    location.href = "index.html";
})
exitModal.addEventListener("click", ()=> {
    fechaModal();
})
function fechaModal(){
    let inputModal = document.querySelector(".input-modal");
    inputModal.disabled = true;
    saveNewTask.disabled = true;
    const areaModal = document.querySelector(".area-modal");
    areaModal.classList.remove("modal-active");
}
formModal.addEventListener("submit", (event)=> {
    event.preventDefault();
    let inputModal = document.querySelector(".input-modal");
    let modal = document.querySelector(".modal");
    let h4Content = modal.children[0].textContent;
    let contentNumberH4 = h4Content.replace(/[#]/gm, '');
    let smallModal = document.querySelector(".erro-input-modal");
    if(inputModal.value == ""){
        inputModal.style.borderColor = "red";
        smallModal.innerText = 'tarefa não pode ser vazia';
        smallModal.style.color = "red"
    } else {
        inputModal.style.borderColor = "#ccc"
        smallModal.textContent = '';
        newTask(contentNumberH4, inputModal.value);
    }
})
function newTask(id, value) {
    let li = document.getElementById(`${id}`);
    let taskAct = {
        description: value,
        completed: li.getAttribute('value')
    }
    let config = {
        method: 'PUT',
        body: JSON.stringify(taskAct),
        headers: {
            'Content-type': 'application/json',
            'authorization': tokenJwt
        }
    }
    fetch(`${baseApi}/tasks/${id}`, config)
        .then(response => {
            if(response.status == 200 || response.status == 201){
                return response.json();
            }else {
                throw response
            }
        }).then(res => {
            if(li.getAttribute('value') == 'true'){
                li.children[1].textContent = res.description;
            }else {
                li.children[2].textContent = res.description;
            } 
        })
    fechaModal();
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
            let firstNameCaractere = respost.firstName.charAt(0);
            let lastNameCaractere = respost.lastName.charAt(0);
            userName.innerText = `${firstNameCaractere.toUpperCase()} ${lastNameCaractere.toUpperCase()}`;
        })
        .catch(erro => {
            if(erro.status == 400 || erro.status == 401) {
                alert("erro no servidor. Tente novamente");
                location.href = "index.html";
            }
        })
}
function editData(data) {
    let dataFormat = /[a-z A-Z][0-9][0-9][:][0-9][0-9][:][0-9][0-9][.][0-9][0-9][0-9][A-Z a-z]/gm;
    let formatData = data.replace(dataFormat, '');
    let newData = formatData.replace(/[-]/gm, '/');
    return newData
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
        trashTaskAudio.play();
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
                createCompleteTask(res.id, res.description, editData(res.createdAt));
                audioAdd.play()
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
                addTask(res.id, res.description, editData(res.createdAt));
                audioAdd.play()
            })
        
        listComplete.removeChild(li);
    }
}
function editTask() {
    let inputModal = document.querySelector(".input-modal");
    inputModal.disabled = false;
    saveNewTask.disabled = false;
}
function showTask(id) {
    let li = document.getElementById("" + id + "");
    if(li) {
        let areaModal = document.querySelector(".area-modal");
        let modal = document.querySelector(".modal");

        let h4 = modal.children[0];
        h4.innerText = `#${id}`;

        let inputModal = document.querySelector(".input-modal");

        let btnEdit = document.querySelector(".edit-task");
        btnEdit.setAttribute('onclick', 'editTask()');
        
        let configReq = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'authorization': tokenJwt
            }
        }
        fetch(`${baseApi}/tasks/${id}`, configReq)
            .then(response => {
                if(response.status == 201 || response.status == 200){
                    return response.json();
                }else {
                    throw response;
                }
            }).then(res => {
                inputModal.value = res.description;
                areaModal.classList.add("modal-active");
            })
        
    }
}

function addTask(id, task, dateTask){
    let li = document.createElement("li");
    li.classList.add("task");
    li.id = id;
    li.setAttribute('value', 'false');

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
    btnEyes.setAttribute('onclick', 'showTask('+ li.id +')');
    

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
    li.classList.add("task")
    li.id = taskId;
    li.setAttribute('value', 'true');

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
    btnEyes.setAttribute('onclick', 'showTask('+ li.id +')');
    
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
                    addTask(element.id, element.description, editData(element.createdAt));
                }else {
                    createCompleteTask(element.id, element.description, editData(element.createdAt));
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
            addTask(res.id, res.description, editData(res.createdAt));
        })
}
form.addEventListener("submit", (event)=>{
    event.preventDefault();
    if(input.value == ""){
        alert("Não pode enviar uma tarefa vazia");
    }else {
        setTask(input.value, tokenJwt);
        input.value = "";
        audioAdd.play()
    }
});

input.addEventListener("keydown", ()=>{
    if(input.value == "" || input.length <= 0){
        btnSubmit.disabled = true;
    }else {
        btnSubmit.disabled = false;
    }
})
