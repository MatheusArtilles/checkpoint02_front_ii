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

form.addEventListener("submit", (event)=> {
    event.preventDefault();
    

});

inputs.forEach(input => {
    
    input.addEventListener("keydown", ()=>{
        let listInputs = [inputs[0].value, inputs[1].value];
        if(listInputs.indexOf("") !== -1){
            btnSubmit.disabled = true;
        }else {
            btnSubmit.disabled = false;
        }
    })
})