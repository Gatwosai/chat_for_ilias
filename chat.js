const messageArea = document.querySelector(".messageArea")
const messageIn = document.querySelector("#messageIn")
const sendBtn = document.querySelector("#sendBtn")
const contacts = document.querySelector(".contacts")

function getMessagesFromDB(chat_id) {
    const promise = getMessages(chat_id)
    promise.then((response) => {
        messageArea.innerHTML = ''
        response.data.forEach((message) => {
            div = document.createElement('div')
            if (message['usr_id'] === sessionStorage['usr_id']) {
                div.innerHTML = (
                    `<div class='d-flex justify-content-end mb-4'>
                    <div class='msg_container_send'>
                    ${message['content']}
                    <span class='msg_time_send'>8:55, Сегодня</span></div>
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

function updateChats(response) {
    const promise = getChats(sessionStorage['usr_id'])
    promise.then(response => {
    	contacts.innerHTML = ''
    	response.data.forEach((chat) => {
		    contact = document.createElement('div')
		    contact.innerHTML = (
		    `<li type=button>
				<div class="d-flex bd-highlight">
				<div class="img_cont">
				<img src="./assets/icons/group.png" class="rounded-circle user_img">
				</div>
				<div class="user_info">
				<span>${chat['name']}</span>
				<p>Егор Блинов: пара в 13:35</p>
				</div>
				</div>
			</li>`
			)
			contacts.appendChild(contact)
			contact.addEventListener("click", () => {
				sessionStorage['chat_id'] = chat['chat_id']
			    getMessagesFromDB(chat['chat_id'])
			})
    	})
    })
    
}

function showList(form, mode) {
    form.innerHTML = ''
    usr_id = sessionStorage['usr_id']
    const promise = searchUser(usr_id, search.value)
    promise.then((response) => {
        response.data.forEach((contact) => {
            div = document.createElement('div')
            if (mode == "Для загрузки чата") {
		        div.innerHTML = (`<li type=button>
				    <div class="d-flex bd-highlight">
				    <div class="img_cont">
				    <img src="./assets/icons/group.png" class="rounded-circle user_img">
					</div>
				    <div class="user_info">
				    <span>${contact['firstname']} ${contact['lastname']}</span>
				    <p>Егор Блинов: пара в 13:35</p>
				    </div>
				    </div>
				</li>`
				)
            }
            else if (mode == "Для добавления пользователя") {
		        div.innerHTML = ( `<li type="button">
		        	<div class="row bd-highlight m-0">
				    <div class="col-3 img_cont">
				    <img src="./assets/icons/group.png" class="rounded-circle user_img">
					</div>
				    <div class="col-7 user_info">
				    <span>${contact['firstname']} ${contact['lastname']}</span>
				    <p>Егор Блинов: пара в 13:35</p>
				    </div>
				    <div class="col-2 bd-highlight modal-dialog-centered">
				    <i class="fas fa-user-check"></i>
				    </div>
				    </div>
				</li>`
		    	)
		    }
		    form.appendChild(div)
		    div.addEventListener("click", () => {
		        //FIXME
		        usr_id = sessionStorage['usr_id']
		        chat_id = sessionStorage['chat_id']
		        if (mode == "Для добавления пользователя") {
		            const promise = addUser(chat_id, contact['usr_id'])
		            promise.then((response) => {
		                //FIXME
		            })
		        }
		        else if (mode == "Для загрузки чата") {
		            getMessagesFromDB(chat_id)
		        }
		    })
        })
    })
}

function showFile(input) {
    file = input.files[0]
    img = document.createElement('div')
    img.innerHTML = ("<div class='d-flex justify-content-end mb-4'>\
        <div class='msg_container_send bg-transparent'>\
        <div class='img_cont_msg'>\
        <img src='./assets/icons/file.png' class='rounded-circle user_img_msg'></div>\
        </div>")
    
    //messageIn.type = "image";
    //messageIn.appendChild(img)
}

function saveFileToDB(input) {
    file = input.files[0]
    formData = new FormData()
    formData.append('File', file)
    const promise = saveFile(formData)
    promise.then(response => {
        console.log(response)
    })
    //messageIn.type = "image";
    //messageIn.appendChild(img)
}

if (typeof sessionStorage['session_id'] === 'undefined') {
	//FIXME add print message
	window.location.href = 'index.html'
}

sendBtn.addEventListener("click", () => {
    const now = new Date().toLocaleString("ru-RU").replace(",", "")
    usr_id = sessionStorage['usr_id']
    chat_id = sessionStorage['chat_id']
    const promise = addMessage(usr_id, chat_id, messageIn.value, now, 0, 0)
    promise.then((response) => {
        mess = document.createElement('div')      
        mess.innerHTML = (`<div class='d-flex justify-content-end mb-4'>\
        <div class='msg_container_send'>\
        ${messageIn.value}\
        <span class='msg_time_send'>8:55, Сегодня</span></div>\
        <div class='img_cont_msg'><img src='./assets/icons/teacher.png' class='rounded-circle user_img_msg'></div></div>`)
        messageArea.appendChild(mess)
    })
})

const search = document.querySelector(".search")
search.addEventListener("input", () => {
    showList(contacts, "Для загрузки чата")
})
const search_modal = document.querySelector(".search-modal")
search_modal.addEventListener("input", () => {
    showList(document.querySelector(".modal-body"), "Для добавления пользователя")
})

const create_chat = document.querySelector(".create_chat")
create_chat.addEventListener("click", () => {
    id = sessionStorage['usr_id']
    name = prompt('Ввод названия чата', '')
    const promise = addChat(id, name)
    promise.then((response) => {
        messageArea.innerHTML = ''
    })
})

const add_user = document.querySelector(".add_user")
add_user.addEventListener("click", () => {
    
})

const logout = document.querySelector(".logout")
logout.addEventListener("click", () => {
	sessionStorage.clear();
	window.location.href = 'index.html'
})

updateChats()
timeoutID = window.setInterval(updateChats, 3000)

