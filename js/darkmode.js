const btnDark = document.querySelector(".btn-dark");
const darkMode = document.querySelector("body");


getDarkMode();



btnDark.addEventListener("click", ()=>{
    let bodyContains = darkMode.classList.contains("dark");
    if(bodyContains === false) {
        darkMode.classList.add("dark");
        btnDark.classList.add("active");
        localStorage.setItem("darkMode", "true")
    }else {
        darkMode.classList.remove("dark");
        btnDark.classList.remove("active");
        localStorage.setItem("darkMode", "false");
    }
})
function getDarkMode(){
    let getDark = localStorage.getItem("darkMode");
    if(getDark == "true"){
        darkMode.classList.add("dark");
        btnDark.classList.add("active");
    }else {
        darkMode.classList.remove("dark");
        btnDark.classList.remove("active");
    }
}