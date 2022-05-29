// Страница входа
const textAreaLogin = document.querySelector("#login")
const textAreaPassword = document.querySelector("#password")
const btnAuth = document.querySelector("#btnAuth")
btnAuth.addEventListener("click", () => {
    const promise = auth(textAreaLogin.value, textAreaPassword.value)
    promise.then((response) => {
    	console.log(response)
        sessionStorage.setItem("session_id", response.data["session_id"])
        sessionStorage.setItem("usr_id", response.data["usr_id"])
        sessionStorage.setItem("img", response.data["img"])
        window.location.href = 'home.html'
   /})
})
