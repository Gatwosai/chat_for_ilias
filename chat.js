//const textAreaMessage = document.querySelector("#message")

const menu = document.querySelector(".action_menu_chat")
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

//const menu3 = document.querySelector(".action_menu")
//const menuBtn3 = document.querySelector(".dropdown-toggle")
//menuBtn3.addEventListener("click", () => {
    //$('.dropdown-toggle').dropdown()
    //addMessage()
//})