/*let tokenJwt = sessionStorage.getItem("jwt");
let baseApi =  "https://todo-api.ctd.academy/v1";
function getUser(key){
    let reqConfig = {
        method: 'GET',
        body: key,
        headers: {
        'Content-type': 'application/json',
        },
    }
    fetch(`${baseApi}/users/getMe`, reqConfig)
        .then(response => {
            return response.json();
        }).then(respost => {
            console.log(respost);
        })
}
getUser(tokenJwt);*/