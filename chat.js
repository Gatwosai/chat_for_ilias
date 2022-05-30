const messageArea = document.querySelector(".messageArea")
const messageIn = document.querySelector("#messageIn")
const sendBtn = document.querySelector("#sendBtn")
const contacts = document.querySelector(".contacts")

function getMessagesFromDB() {
    const promise = getMessages(sessionStorage['chat_id'], sessionStorage['usr_id'])
    promise.then((response) => {
        messageArea.innerHTML = ''
        title = document.createElement('div')
        title.innerHTML = (`${sessionStorage['name']}`)
        document.querySelector(".chat-title").innerHTML = ''
        document.querySelector(".chat-title").appendChild(title)
        response.data.forEach((message) => {
            div = document.createElement('div')
            if (message['usr_id'] === sessionStorage['usr_id']) {
            	if (message['is_file'] == 0) {
            		div.innerHTML = (
                    `<div class='d-flex justify-content-end mb-4'>
                    <div class='msg_container_send'>
                    ${message['content']}
                    <span class='msg_time_send'>${message['datetime']}</span></div>
                    <div class='img_cont_msg'>
                    <img src='./assets/usr_images/${message['img']}'     
                    class='rounded-circle user_img_msg'></div>
                    </div>`
                )
            	}
            	else {
            		var path = message['content']
            		var index = path.lastIndexOf("/")
            		var fileName = path.substring(index + 1, path.length)
            		div = document.createElement('div')
    				div.innerHTML = (`<div class='d-flex justify-content-end mb-4'>
                    <div class='msg_container_send'>
                    <img src='./assets/icons/file.png'
                    class='rounded-circle user_img_msg'>${fileName}</div>
                    <div class='img_cont_msg'>
                    <img src='./assets/usr_images/${message['img']}'     
                    class='rounded-circle user_img_msg'></div>
                    </div>`
    				)				
            	}
                
            }
            else {
            	if (message['is_file'] == 0) {
            		div.innerHTML = (
                    `<div class='d-flex justify-content-start mb-4'>
                    <div class='img_cont_msg'>
		            <img src='./assets/usr_images/${message['img']}'
		            class='rounded-circle user_img_msg'>
		            </div>
                    <div class='msg_container'>
                    ${message['content']}
                    <span class='msg_time'>${message['datetime']}</span></div>
                    </div>
                    </div>`
                	)
            	}
            	else {
            		var path = message['content']
            		var index = path.lastIndexOf("/")
            		var fileName = path.substring(index + 1, path.length)
            		div = document.createElement('div')
    				div.innerHTML = (`<div class='d-flex justify-content-starn mb-4'>
    				<div class='img_cont_msg'>
                    <img src='./assets/usr_images/${message['img']}'     
                    class='rounded-circle user_img_msg'></div>
                    <div class='msg_container'>
                    <img src='./assets/icons/file.png'
                    class='rounded-circle user_img_msg'>${fileName}</div>
                    </div>`
    				)
            	}
                
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
    		bg = 'bg-danger'
    		countNotReadMsgs = chat['count']
    		if (countNotReadMsgs == 0) {
    			bg = ''
    			countNotReadMsgs = ''
    		}
    		let src = './assets/icons/group.png';
    		if (chat['img'] != null) {
    			src = './assets/usr_images/' + chat['img'];
    		}
		    contact = document.createElement('li')
		    contact.classList.add('row')
		    contact.classList.add('btn')
		    contact.classList.add('d-flex')
		    contact.innerHTML = (
		    `<div class="col-2 img_cont">
				    <img src="${src}" class="rounded-circle user_img">
					</div>
				    <div class="col-7 user_info">
				    <span>${chat['name']}</span>
				    </div>
				    <div class="col-1 modal-dialog-centered">
				    <i class="align-centered ${bg} countmsg rounded-circle">
				    &nbsp;&nbsp;${countNotReadMsgs}&nbsp;&nbsp;</i>
				    </div>`
			)
			//FIXME <p>Егор Блинов: пара в 13:35</p>
			contacts.appendChild(contact)
			contact.addEventListener("click", () => {
				sessionStorage['chat_id'] = chat['chat_id']
				sessionStorage['name'] = chat['name'];
			    getMessagesFromDB()
			})
    	})
    })
    
}

function showList(form) {
	form.innerHTML = ''
    const promise = searchUser(search.value)
    promise.then((response) => {
        response.data.forEach((contact) => {
            div = document.createElement('div')
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
		    form.appendChild(div)
		    div.addEventListener("click", () => {
		    	//FIXME
		        //getMessagesFromDB()
		    })
        })
    })   
}

function showListUsersAdd(form) {
    form.innerHTML = ''
    const promise = searchUser(search_modal.value)
    promise.then((response) => {
        response.data.forEach((contact) => {
            div = document.createElement('div')
            div.innerHTML = ( `<li type="button">
		        	<div class="row bd-highlight m-0">
				    <div class="col-3 img_cont">
				    <img src="./assets/usr_images/${contact['img']}" 
				    class="rounded-circle user_img">
					</div>
				    <div class="col-7 user_info">
				    <span>${contact['firstname']} ${contact['lastname']}</span>
				    <p>${contact['login']}</p>
				    </div>
				    <div class="col-2 bd-highlight modal-dialog-centered">
				    <i class="fas fa-user-check"></i>
				    </div>
				    </div>
				</li>`
		    )
		    form.appendChild(div)
		    div.addEventListener("click", () => {
		        usr_id = sessionStorage['usr_id']
		        chat_id = sessionStorage['chat_id']
		        const promise = addUser(chat_id, contact['usr_id'])
		        promise.then((response) => {
		            alert("Пользователь добавлен")
		            document.querySelector('.btn-modal').click()
		            //FIXME create form
		        })    
		    })
        })
    })
}

function showFile(fileName, justify) {
    fileDiv = document.createElement('div')
    fileDiv.innerHTML = (`<div class='d-flex justify-content-end mb-4'>
                    <div class='msg_container_send'>
                    <img src='./assets/icons/file.png'
                    class='rounded-circle user_img_msg'>${fileName}</div>
                    <div class='img_cont_msg'>
                    <img src='./assets/usr_images/${sessionStorage['img']}'     
                    class='rounded-circle user_img_msg'></div>
                    </div>`
    )
    messageArea.appendChild(fileDiv)
}

function saveFileToDB(input) {
    file = input.files[0]
    formData = new FormData()
    formData.append('File', file)
    const promise = saveFile(formData)
    promise.then(response => {
        addMessage(1, response.data)
        //showFile(input, response.data)
    })
}

function mail(companion) {
    const promise = sendMail(companion)
    promise.then(response => {
        console.log(response)
    })
}

function lastSeen(usr_id) {
	const promise = checkLastSeen(usr_id)
	promise.then(response => {
		//FIXME
		mail(usr_id)
	})
}

function addMessage(is_file, filePath) {
	const now = new Date().toLocaleString("ru-RU").replace(",", "")
    usr_id = sessionStorage['usr_id']
    chat_id = sessionStorage['chat_id']
    var value = messageIn.value
    if (is_file == 1) {
    	value = filePath
    }
    const promise = addMessageToDB(usr_id, chat_id, value, now, 0, is_file)
    promise.then((response) => {
        /*mess = document.createElement('div')      
        mess.innerHTML = (`<div class='d-flex justify-content-end mb-4'>\
        <div class='msg_container_send'>\
        ${messageIn.value}\
        <span class='msg_time_send'>${now}</span></div>\
        <div class='img_cont_msg'>
        <img src='./assets/usr_images/${sessionStorage['img']}' 
        class='rounded-circle user_img_msg'></div></div>`)
        messageArea.appendChild(mess)
        companion = response.data*/
        //const promise2 = checkLastSeen(companion)
        //promise2.then(response2 => {
        	//if (response2 > 2) // Если более двух часов без активности
        	//{
        		//FIXME
        		//mail(companion)
        	//}
        //})
    })
}

if (typeof sessionStorage['session_id'] === 'undefined') {
	//FIXME add print message
	window.location.href = 'index.html'
}

sendBtn.addEventListener("click", () => {
    addMessage(0, '', '');
})

const search = document.querySelector(".search")
search.addEventListener("input", () => {
    showList(contacts)
})
const search_modal = document.querySelector(".search-modal")
search_modal.addEventListener("input", () => {
    showListUsersAdd(document.querySelector(".modal-body"))
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
timeoutID = window.setInterval(getMessagesFromDB, 3000)

