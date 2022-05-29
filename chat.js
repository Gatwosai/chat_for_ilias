const messageArea = document.querySelector(".messageArea")
const messageIn = document.querySelector("#messageIn")
const sendBtn = document.querySelector("#sendBtn")
const contacts = document.querySelector(".contacts")

function getMessagesFromDB(chat_id) {
    const promise = getMessages(chat_id, sessionStorage['usr_id'])
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
                    <img src='./assets/usr_images/${message['img']}'     
                    class='rounded-circle user_img_msg'></div>
                    </div>`
                )
            }
            else {
                div.innerHTML = (
                    `<div class='d-flex justify-content-start mb-4'>
                    <div class='img_cont_msg'>
		            <img src='./assets/usr_images/${message['img']}'
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
    	    countMsgs = checkNewMessages(chat['chat_id'])
    	    countMsgsDiv = null
			if (countMsgs > 0) {
			    countMsgsDiv = document.createElement('div')
			    countMsgsDiv.innerHTML = (
			    `<div class="w-10 rounded-circle">${countMsgs}</div>`)
			}
    		let src = './assets/icons/group.png';
    		if (chat['img'] != null) {
    			src = './assets/usr_images/' + chat['img'];
    		}
		    contact = document.createElement('div')
		    contact.innerHTML = (
		    `<li type=button>
				<div class="d-flex bd-highlight">
				<div class="img_cont">
				<img src="${src}" class="rounded-circle user_img">
				</div>
				<div class="user_info">
				<span>${chat['name']}</span>
				${countMsgsDiv}
				</div>
				</div>
			</li>`
			)
			//FIXME <p>Егор Блинов: пара в 13:35</p>
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
    const promise = searchUser(search.value)
    promise.then((response) => {
        response.data.forEach((contact) => {
            div = document.createElement('div')
            if (mode == "Для загрузки чата") {
		        div.innerHTML = (`<li type=button>
				    <div class="d-flex bd-highlight">
				    <div class="img_cont">
				    <img src="./assets/usr_images/${contact['img']}" 
				    class="rounded-circle user_img">
					</div>
				    <div class="user_info">
				    <span>${contact['firstname']} ${contact['lastname']}</span>
				    </div>
				    </div>
				</li>`
				)
            }
            else if (mode == "Для добавления пользователя") {
		        div.innerHTML = ( `<li type="button">
		        	<div class="row bd-highlight m-0">
				    <div class="col-3 img_cont">
				    <img src="./assets/usr_images/${contact['img']}" 
				    class="rounded-circle user_img">
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
		        usr_id = sessionStorage['usr_id']
		        chat_id = sessionStorage['chat_id']
		        if (mode == "Для добавления пользователя") {
		            const promise = addUser(chat_id, contact['usr_id'])
		            promise.then((response) => {
		            	alert("Пользователь добавлен")
		            	document.querySelector('.btn-modal').click()
		            	//FIXME create form
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

function mail() {
    const promise = sendMail()
    promise.then(response => {
        console.log(response)
    })
}

function checkNewMessages(chat_id) {
    const promise = checkNewMessagesFromDB(chat_id)
    promise.then(response => {
        return response.data
    })
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
        <div class='img_cont_msg'><img src='./assets/usr_images/${sessionStorage['img']}' 
        class='rounded-circle user_img_msg'></div></div>`)
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

