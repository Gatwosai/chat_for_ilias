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
const messageArea = document.querySelector(".messageArea")
const img1 = document.querySelector(".img1")
const messageIn = document.querySelector("#messageIn")
const sendBtn = document.querySelector("#sendBtn")
sendBtn.addEventListener("click", () => {
    const now = new Date().toLocaleString("ru-RU").replace(",", "")
    const promise = addMessage(1, 1, messageIn.value, now, 0, 0)
    promise.then((response) => {
        //FIXME
        console.log(response)
        mess = document.createElement('div')      
        mess.innerHTML = (`<div class='d-flex justify-content-end mb-4'>\
        <div class='msg_container_send'>\
        ${messageIn.value}\
        <span class='msg_time_send'>8:55, Сегодня</span></div>\
        <div class='img_cont_msg'><img src='./assets/icons/teacher.png' class='rounded-circle user_img_msg'></div></div>`)
        messageArea.appendChild(mess)
    })
})

const contacts = document.querySelector(".contacts")
function getMessagesFromDB() {
    const promise = getMessages()
    promise.then((response) => {
        //FIXME
        console.log(response)
        messageArea.innerHTML = ''
        response.data['messages'].forEach((message) => {
            div = document.createElement('div')
            //FIXME get usr_id from sessionstore
            if (message['usr_id'] == 1) {
                div.innerHTML = (
                    `<div class='d-flex justify-content-end mb-4'>\
                    <div class='msg_container_send'>\
                    ${message['content']}\
                    <span class='msg_time_send'>8:55, Сегодня</span></div>\
                    <div class='img_cont_msg'>
                    <img src='./assets/icons/teacher.png'     
                    class='rounded-circle user_img_msg'></div>
                    </div>`
                )
            }
            else {
                div.innerHTML = (
                    `<div class='d-flex justify-content-start mb-4'>
                    <div class='img_cont_msg'>
		            <img src='./assets/icons/student.jpg'
		            class='rounded-circle user_img_msg'>
		            </div>
                    <div class='msg_container'>
                    ${message['content']}
                    <span class='msg_time'>8:55, Сегодня</span></div>
                    </div>
                    </div>`
                )
            }
            messageArea.appendChild(div)
        })
    })
}

const promise = getChats();
promise.then((response) => {
    //FIXME
    console.log(response)
    response.data['name'].forEach((name) => {
        chat = document.createElement('div')
        chat.innerHTML = (
        `<li type=button onclick=getMessagesFromDB()>
		    <div class="d-flex bd-highlight">
		    <div class="img_cont">
		    <img src="./assets/icons/group.png" class="rounded-circle user_img">
			</div>
		    <div class="user_info">
		    <span>${name['name']}</span>
		    <p>Егор Блинов: пара в 13:35</p>
		    </div>
		    </div>
		</li>`
        /*`<li>
            <div class='col-4'>
	        <img src='./assets/icons/student.jpg' 
	        class='col-12 user_img rounded-circle'>
	        <span class='online_icon'></span>
	        </div>
	        <div class='user_info'>
	        <span>${name['name']}</span>
	        getText
	        </div>
	    </li>`*/
	    )
	    contacts.appendChild(chat)
    })
})

