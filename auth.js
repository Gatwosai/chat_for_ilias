// Страница чата
if (false) {
    const textAreaMessage = document.querySelector("#message")
    const sendBtn = document.querySelector("#sendBtn")
    sendBtn.addEventListener("click", () => {
        const message = textAreaMessage.val()
        addMessage()
    })
}

// Страница входа
const textAreaLogin = document.querySelector("#login")
const textAreaPassword = document.querySelector("#password")
const btnAuth = document.querySelector("#btnAuth")
btnAuth.addEventListener("click", () => {
    const promise = auth(textAreaLogin.value, textAreaPassword.value)
    promise.then((response) => {
        sessionStorage.setItem("id", response.data)
        sessionStorage.setItem("login", textAreaLogin.value)
        sessionStorage.setItem("password", textAreaPassword.value)
        if (response.status == 200) {
            window.location.href = 'home.html'
        }
    })
})
