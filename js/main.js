/*
    ESSE É UM POSSÍVEL PROJETO CASO VOCÊ QUEIRA IMPLEMENTAR UTILIZANDO O LOCALSTORAGE
    SEM COMUNICAÇÃO COM A API DO TO-DO LIST
*/
let data = new Date();
let dia = String(data.getDate()).padStart(2, '0');
let mes = String(data.getMonth() + 1).padStart(2, '0');
let ano = data.getFullYear();
let dataAtual = dia + '/' + mes + '/' + ano;
const form = document.querySelector("form");
const listActive = document.querySelector(".lists-active");
const listComplete = document.querySelector(".lists-complete");
const input = document.querySelector("input");
const btnSubmit = document.querySelector(".btn-add");
const exitModal = document.querySelector(".return");
const saveNewTask = document.querySelector(".btn-edit-task");
const formModal = document.querySelector(".form-modal");
const audioAdd = document.querySelector(".sound-add-task");
const trashTaskAudio = document.querySelector(".sound-trash-task");
let taskSaves = JSON.parse(localStorage.getItem("taskSaves"));
let taskCompletes = JSON.parse(localStorage.getItem("taskCompletes"));
onload = () => {
    if(taskSaves !== null) {
        taskSaves.forEach(task => {
            addTask(task.id, task.task, task.dateTask);
        })
    }
    if(taskCompletes !== null) {
        taskCompletes.forEach(task => {
            createCompleteTask(task);
        })
    }
}
exitModal.addEventListener("click", ()=> {
    fechaModal();
})
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
function newTask(id, value){
    let li = document.getElementById(""+ id +"");
    let valueLi = li.getAttribute('value');

    if(valueLi == 'false'){
        taskSaves.forEach(element => {
            if(element.id == id){
                element.task = value;
            }
        })
        li.children[2].innerText = value;
        localStorage.setItem("taskSaves", JSON.stringify(taskSaves));
        fechaModal();
    }else {
        taskCompletes.forEach(element => {
            if(element.id == id){
                element.task = value;
            }
        })
        li.children[1].innerText = value;
        localStorage.setItem("taskCompletes", JSON.stringify(taskCompletes));
        fechaModal();
    }
}
function fechaModal(){
    let inputModal = document.querySelector(".input-modal");
    inputModal.disabled = true;
    saveNewTask.disabled = true;
    const areaModal = document.querySelector(".area-modal");
    areaModal.classList.remove("modal-active");
}
function randomId() {
    return Math.floor(Math.random() * 500);
}
function excluir(id) {
    let li = document.getElementById("" + id + "");
    if(li) {
        for(let i = 0; i < taskSaves.length; i++){
            if(taskSaves[i].id == parseInt(li.id)){
                let indexTask = i
                taskSaves.splice(indexTask, 1);
            }
        }
        localStorage.setItem("taskSaves", JSON.stringify(taskSaves));
        
        listActive.removeChild(li);
        trashTaskAudio.play();
    }
}
function excludeComplete(id) {
    let li = document.getElementById("" + id + "");
    if(li) {
        for(let i = 0; i < taskCompletes.length; i++){
            if(taskCompletes[i].id == parseInt(li.id)){
                let indexTask = i
                taskCompletes.splice(indexTask, 1);
            }
        }
        listComplete.removeChild(li);
        localStorage.setItem("taskCompletes", JSON.stringify(taskCompletes));
    }
}
function editTask() {
    let inputModal = document.querySelector(".input-modal");
    inputModal.disabled = false;
    saveNewTask.disabled = false;
}
function showTask(id) {
    let li = document.getElementById(""+ id +"");
    if(li){
        let areaModal = document.querySelector(".area-modal");
        let modal = document.querySelector(".modal");

        let h4 = modal.children[0];
        h4.innerText = `#${id}`;

        let inputModal = document.querySelector(".input-modal");

        let btnEdit = document.querySelector(".edit-task");
        btnEdit.setAttribute('onclick', 'editTask()');

        let elementSaves = taskSaves.find(element => element.id == id);
        let elementComplete = taskCompletes.find(element => element.id == id);
        if(elementSaves != undefined) {
            inputModal.value = `${elementSaves.task}`;
            areaModal.classList.add("modal-active")
            
        } else {
            
            taskCompletes.forEach(element => {
                if(element.id == id){
                    inputModal.value = `${element.task}`;
                    
                    areaModal.classList.add("modal-active");
                }
            })
        }
    }
}
function complete(idLi){
    taskSaves.forEach(task => {
        if(task.id == idLi) {
            
            const taskObj = {
                id: task.id,
                task: task.task,
                dateTask: task.dateTask
            }
            createCompleteTask(taskObj);
            excluir(idLi);
            audioAdd.play();
            taskCompletes = taskCompletes == null ? [taskObj] : [...taskCompletes, taskObj]
            localStorage.setItem("taskCompletes", JSON.stringify(taskCompletes));
        }
    })
}
function refresh(id) {
    taskCompletes.forEach(task=>{
        if(task.id == id) {
            const taskObj = {
                id: task.id,
                task: task.task,
                dateTask: task.dateTask
            }
            excludeComplete(id);
            addTask(taskObj.id, taskObj.task, taskObj.dateTask);
            audioAdd.play()
            taskSaves = taskSaves == null ? [taskObj] : [...taskSaves, taskObj]
            localStorage.setItem("taskSaves", JSON.stringify(taskSaves));  
        }
    })
    
}
function createCompleteTask(task) {
    let li = document.createElement("li");
    li.classList.add("task-complete");
    li.id = task.id;
    li.setAttribute('value', 'true');

    let btnRefresh = document.createElement("button");
    btnRefresh.classList.add("btn-task");
    btnRefresh.innerHTML = `<ion-icon name="refresh-outline"></ion-icon>`;
    btnRefresh.setAttribute('onclick', 'refresh('+ li.id +')');

    let h4 = document.createElement("h4");
    h4.innerText = `id: ${task.id}`;

    let h5 = document.createElement("h5");
    h5.innerText = task.task;

    let span = document.createElement("span");
    span.innerText = task.dateTask;

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
function addTask(id, task, dateTask){
    let li = document.createElement("li");
    li.classList.add("task");
    li.id = id;
    li.setAttribute('value', 'false');

    let buttonLi = document.createElement("button");
    buttonLi.classList.add("btn-complete");
    buttonLi.innerHTML = `<ion-icon name="checkmark-outline"></ion-icon>`;
    buttonLi.setAttribute('onclick', 'complete('+ li.id +')');
   

    let btnTrash = document.createElement("button");
    btnTrash.classList.add("btn-task");
    btnTrash.classList.add("trash");
    btnTrash.innerHTML = `<ion-icon name="trash-outline"></ion-icon>`;
    btnTrash.setAttribute('onclick', 'excluir('+ li.id +')')
    
    let h4 = document.createElement("h4");
    h4.innerText = `id: ${id}`;

    let h5 = document.createElement("h5");
    h5.innerText = task;

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
form.addEventListener("submit", (event)=> {
    event.preventDefault();
    const numRandom = randomId();
    let taskObj = {
        id: numRandom,
        task: input.value,
        dateTask: dataAtual
    }
    addTask(taskObj.id, taskObj.task, taskObj.dateTask);
    audioAdd.play()
    taskSaves = taskSaves == null ? [taskObj] : [...taskSaves, taskObj]
    
    localStorage.setItem("taskSaves", JSON.stringify(taskSaves));
    input.value = "";
        
})
input.addEventListener("keydown", ()=> {
    if(input.value == "" || input.value === null) {
        btnSubmit.disabled = true;
    } else {
        btnSubmit.disabled = false;
    }
})