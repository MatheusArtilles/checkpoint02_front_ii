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
const taskSaves = JSON.parse(localStorage.getItem("taskSaves"));
const taskCompletes = JSON.parse(localStorage.getItem("taskCompletes"));

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
        localStorage.setItem("taskCompletes", JSON.stringify(taskCompletes));
        
        listComplete.removeChild(li);
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
            
            excluir(idLi);
            if(taskCompletes !== null) {
                localStorage.setItem("taskCompletes", JSON.stringify([...taskCompletes, taskObj]));
            } else {
                localStorage.setItem("taskCompletes", JSON.stringify([taskObj]));
            }
            createCompleteTask(taskObj);
        }
    })
}
function refresh(id) {
    taskCompletes.forEach( task => {
        if(task.id == id) {
            const taskObj = {
                id: task.id,
                task: task.task,
                dateTask: task.dateTask
            }
            excludeComplete(id);
            localStorage.setItem("taskSaves", JSON.stringify([...taskSaves, taskObj]));
            addTask(taskObj.id, taskObj.task, taskObj.dateTask);
        }
    })
    
}
function createCompleteTask(task) {
    let li = document.createElement("li");
    li.classList.add("task-complete");
    li.id = task.id;

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
    

    
    
    li.appendChild(h4);
    li.appendChild(h5);
    li.appendChild(span);
    li.appendChild(btnEyes);
    li.appendChild(btnRefresh);

    listComplete.appendChild(li);
}
function addTask(id, task, dateTask){
    let li = document.createElement("li");
    li.classList.add("task");
    li.id = id;

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
    

    li.appendChild(buttonLi);
    li.appendChild(h4);
    li.appendChild(h5);
    li.appendChild(span);
    li.appendChild(btnEyes);
    li.appendChild(btnTrash);
    listActive.appendChild(li);
}
form.addEventListener("submit", (event)=> {
    event.preventDefault();
    const numRandom = randomId();
    let taskObj = {
        id: numRandom,
        task: input.value,
        dateTask: dataAtual
    }
    if(taskSaves !== null) {
        localStorage.setItem("taskSaves", JSON.stringify([...taskSaves, taskObj]));
    }else {
        localStorage.setItem("taskSaves", JSON.stringify([taskObj]));
    }
    addTask(taskObj.id, taskObj.task, taskObj.dateTask);

})
input.addEventListener("keydown", ()=> {
    if(input.value == "" || input.value === null) {
        btnSubmit.disabled = true;
    } else {
        btnSubmit.disabled = false;
    }
})