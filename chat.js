//const textAreaMessage = document.querySelector("#message")

/*const menu = document.querySelector(".action_menu_chat")
const menuBtn = document.querySelector("#action_menu_btn_chat")
menuBtn.addEventListener("click", () => {
    menu.classList.toggle("action_menu_chat")
    //addMessage()
})
const menu2 = document.querySelector(".action_menu")
const menuBtn2 = document.querySelector("#action_menu_btn")
menuBtn2.addEventListener("click", () => {
    menu2.classList.toggle("action_menu")
    //addMessage()
})
*/

const messageIn = document.querySelector("#messageIn")
const sendBtn = document.querySelector("#sendBtn")
sendBtn.addEventListener("click", () => {
    const now = new Date().toLocaleString("ru-RU").replace(",", "")
    console.log(now)
    const promise = addMessage(1, 1, messageIn.value, now, 0, 0)
    promise.then((response) => {
        console.log(response)
    })
})
