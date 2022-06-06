if (sessionStorage['session_id'] === 'undefined') {
	window.location.href = 'index.html'
}

const messageArea = document.querySelector(".messageArea")
const messageIn = document.querySelector("#messageIn")
const sendBtn = document.querySelector("#sendBtn")
const contacts = document.querySelector(".contacts")
const contactsArea = document.querySelector(".contactsArea")
const chatArea = document.querySelector('.chat');

function getMessagesFromDB() {
    const promise = getMessages(sessionStorage['chat_id'], sessionStorage['usr_id'])
    promise.then((response) => {
        messageArea.innerHTML = ''
        title = document.createElement('div')
        title.innerHTML = (`${sessionStorage['name']}`)
        document.querySelector(".chat-title").innerHTML = ''
        document.querySelector(".chat-title").appendChild(title)
        response.data.forEach((message) => {
        	time = new Date(message['datetime']).toLocaleString("ru-RU").slice(0, -3)
            div = document.createElement('div')
            if (message['usr_id'] === sessionStorage['usr_id']) {
            	if (message['is_file'] == 0) {
            		div.innerHTML = (
                    `<div class='d-flex justify-content-end mb-3'>
                    <div class='msg_container_send'>
                    ${message['content']}
                    <span class='msg_time_send'>${time}</span></div>
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
    				div.innerHTML = (`<div class='btn d-flex justify-content-end mb-4'>
                    <div class='msg_container_send'>
                    <img src='./assets/icons/file.png'
                    class='rounded-circle user_img_msg'>${fileName}</div>
                    <div class='img_cont_msg'>
                    <img src='./assets/usr_images/${message['img']}'     
                    class='rounded-circle user_img_msg'></div>
                    </div>`
    				)
    				div.addEventListener("click", () => {
    					request = path.substring(path.lastIndexOf("uploads"), path.length)
    					const promise2 = loadFile(request)
    					promise2.then(response2 => {
    						const url = window.URL.createObjectURL(new Blob([response2.data]))
							const link = document.createElement('a')
							link.href = url
							link.setAttribute('download', fileName)
							document.body.appendChild(link)
							link.click()
							link.remove()
    					})
    				})			
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
                    <span class='msg_time'>${time}</span></div>
                    </div>
                    </div>`
                	)
            	}
            	else {
            		var path = message['content']
            		var index = path.lastIndexOf("/")
            		var fileName = path.substring(index + 1, path.length)
            		div = document.createElement('div')
    				div.innerHTML = (`<div class='btn d-flex justify-content-start mb-4'>
    				<div class='img_cont_msg'>
                    <img src='./assets/usr_images/${message['img']}'     
                    class='rounded-circle user_img_msg'></div>
                    <div class='msg_container'>
                    <img src='./assets/icons/file.png'
                    class='rounded-circle user_img_msg'>${fileName}</div>
                    </div>`
    				)
    				div.addEventListener("click", () => {
    					request = path.substring(path.lastIndexOf("uploads"), path.length)
    					const promise2 = loadFile(request)
    					promise2.then(response2 => {
    						const url = window.URL.createObjectURL(new Blob([response2.data]))
							const link = document.createElement('a')
							link.href = url
							link.setAttribute('download', fileName)
							document.body.appendChild(link)
							link.click()
							link.remove()
    					})
    				})
            	}
                
            }
            messageArea.appendChild(div)
        })
    })
}

function updateChats() {
    const promise = getChats(sessionStorage['usr_id'])
    promise.then(response => {
    	contacts.innerHTML = ''
    	response.data.forEach((chat) => {
    		var bg = ''
    		countNotReadMsgs = chat['count']
    		if (countNotReadMsgs != 0) {
    			bg = "bg-danger"
    		}
    		else {
    			countNotReadMsgs = ''
    		}
    		let src = './assets/icons/group.png'
    		if (chat['img'] != null) {
    			src = './assets/usr_images/' + chat['img']
    		}
		    contact = document.createElement('li')
		    contact.classList.add("btn", "d-flex", "rounded-0", "justify-content-between", "mb-3")
		    if (chat['chat_id'] === sessionStorage['chat_id']) {
		    	contact.classList.add("active")
		    	contact.style.backgroundColor = "lightblue"
		    }
		    contact.innerHTML = (
		    	`<div class="img_cont">
				    <img src="${src}" class="rounded-circle user_img">
				</div>
				<div class="user_info flex-grow-1 text-truncate align-self-center">${chat['name']}</div>
				<div class="${bg} countmsg align-self-center rounded-circle">${countNotReadMsgs}</div>
				`
			)
			contact.addEventListener("mouseover", function() {
				if (!Array.from(this.classList).includes("active")) {
            		this.style.backgroundColor = "#F0F8FF"
            	}
            })
            contact.addEventListener("mouseout", function() {
            	if (!Array.from(this.classList).includes("active")) {
            		this.style.backgroundColor = "white"
            	}
            })
			contact.addEventListener("click", function() {
				sessionStorage['chat_id'] = chat['chat_id']
				sessionStorage['name'] = chat['name'];
				if (window.innerWidth < 576) {
                    chatArea.classList.remove("d-none", "d-sm-block")
                    contactsArea.classList.add("d-none", "d-sm-block")
                    this.style.visibility = "visible"
                }
                if (document.querySelector(".active")) {
                	document.querySelector(".active").style.backgroundColor = "white"
                    document.querySelector(".active").classList.remove("active")
                }
                this.classList.add("active")
                this.style.backgroundColor = "lightblue"
			    getMessagesFromDB()
			})
			contacts.appendChild(contact)
    	})
    })
    
}

function showList(form) {
	form.innerHTML = ''
    const promise = getChats(sessionStorage['usr_id'])
    promise.then((response) => {
        response.data.forEach((contact) => {
        	if (contact['name'].indexOf(search.value) != -1) {
        		let src = './assets/icons/group.png'
				if (contact['img'] != null) {
					src = './assets/usr_images/' + contact['img']
				}
        		searchContact = document.createElement('li')
		        searchContact.classList.add("row", "btn", "d-flex", "p-0", "m-0", "rounded-0")
		        searchContact.innerHTML = (`
					<div class="col-2 img_cont">
					<img src="${src}"
					class="rounded-circle user_img">
					</div>
					<div class="col user_info text-truncate align-self-center">
						${contact['name']}
					</div>
					</div>`
				)
				searchContact.addEventListener("mouseover", function() {
					if (!Array.from(this.classList).includes("active")) {
		        		this.style.backgroundColor = "#F0F8FF"
		        	}
            	})
		        searchContact.addEventListener("mouseout", function() {
		        	if (!Array.from(this.classList).includes("active")) {
		        		this.style.backgroundColor = "white"
		        	}
		        })
				searchContact.addEventListener("click", function() {
					sessionStorage['chat_id'] = contact['chat_id']
					sessionStorage['name'] = contact['name'];
					if (window.innerWidth < 576) {
		                chatArea.classList.remove("d-none", "d-sm-block")
		                contactsArea.classList.add("d-none", "d-sm-block")
		                this.style.visibility = "visible"
		            }
		            if (document.querySelector(".active")) {
		            	document.querySelector(".active").style.backgroundColor = "white"
		                document.querySelector(".active").classList.remove("active")
		            }
		            this.classList.add("active")
		            search.value = ""
		            intervalUpdateChats = window.setInterval(updateChats, 3000)
					getMessagesFromDB()
				})
				form.appendChild(searchContact)
        	}
        })
    })
}

function searchMsgForKey() {
	const promise = getMessages(sessionStorage['chat_id'], sessionStorage['usr_id'])
    promise.then((response) => {
        messageArea.innerHTML = ''
        title = document.createElement('div')
        title.innerHTML = (`${sessionStorage['name']}`)
        document.querySelector(".chat-title").innerHTML = ''
        document.querySelector(".chat-title").appendChild(title)
        response.data.forEach((message) => {
        	if (message['content'].indexOf(searchMsg.value) != -1) {
        		time = new Date(message['datetime']).toLocaleString("ru-RU").slice(0, -3)
		        div = document.createElement('div')
		        if (message['usr_id'] === sessionStorage['usr_id']) {
		        	if (message['is_file'] == 0) {
		        		div.innerHTML = (
		                `<div class='d-flex justify-content-end mb-3'>
		                <div class='msg_container_send'>
		                ${message['content']}
		                <span class='msg_time_send'>${time}</span></div>
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
						div.innerHTML = (`<div class='btn d-flex justify-content-end mb-4'>
		                <div class='msg_container_send'>
		                <img src='./assets/icons/file.png'
		                class='rounded-circle user_img_msg'>${fileName}</div>
		                <div class='img_cont_msg'>
		                <img src='./assets/usr_images/${message['img']}'     
		                class='rounded-circle user_img_msg'></div>
		                </div>`
						)
						div.addEventListener("click", () => {
							request = path.substring(path.lastIndexOf("uploads"), path.length)
							const promise2 = loadFile(request)
							promise2.then(response2 => {
								const url = window.URL.createObjectURL(new Blob([response2.data]))
								const link = document.createElement('a')
								link.href = url
								link.setAttribute('download', fileName)
								document.body.appendChild(link)
								link.click()
								link.remove()
							})
						})			
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
		                <span class='msg_time'>${time}</span></div>
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
						div.addEventListener("click", () => {
							request = path.substring(path.lastIndexOf("uploads"), path.length)
							const promise2 = loadFile(request)
							promise2.then(response2 => {
								const url = window.URL.createObjectURL(new Blob([response2.data]))
								const link = document.createElement('a')
								link.href = url
								link.setAttribute('download', fileName)
								document.body.appendChild(link)
								link.click()
								link.remove()
							})
						})	
		        	}
		        }
		        messageArea.appendChild(div)
        	}
        	
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
		        })    
		    })
        })
    })
}

function saveFileToDB(input) {
    file = input.files[0]
    formData = new FormData()
    formData.append('File', file)
    const promise = saveFile(formData)
    promise.then(response => {
        addMessage(1, response.data)
    })
}

function mail(companion) {
    const promise = sendMail(companion)
}

function showInfo() {
	modalInfoBody.innerHTML = ''
	const promise = getInfo(sessionStorage['chat_id'])
	var i = 0
	promise.then(response => {
		data = response.data
		var creator = data.pop()
		data.forEach((contact) => {
			classBtn = 'btn-delete' + i
			btnClose = `<div class="col-2 bd-highlight modal-dialog-centered justify-content-end">
				    <button type="button" class="btn-close ${classBtn} float-end"></button>
				    </div>`
			if (creator != sessionStorage['usr_id']) {
				btnClose = ""	
			}
			usrInfo = ""
			if (contact['tutor'] === "1") {
				usrInfo = "Преподаватель"
			}
			else {
				usrInfo = "Студент"
			}
			if (parseFloat(contact['last_update']) < 0.83) {// не более 5 минут бездействия
				usrInfo += ", онлайн"
			}
			else {
				usrInfo += ", оффлайн"
			}
            div = document.createElement('div')
            div.innerHTML = ( `<li>
		        	<div class="row bd-highlight m-0">
				    <div class="col-3 img_cont">
				    <img src="./assets/usr_images/${contact['img']}" 
				    class="rounded-circle user_img">
					</div>
				    <div class="col-7 user_info">
				    <span>${contact['firstname']} ${contact['lastname']}</span>
				    <p>${usrInfo}</p>
				    </div>
				    ${btnClose}
				    </div>
				</li>`
		    )
		    modalInfoBody.appendChild(div)
		    usr_id = contact['usr_id']
		    if (creator === sessionStorage['usr_id']) {
		    	document.querySelector('.' + classBtn).addEventListener('click', () => {
					const promise2 = deleteUserFromChat(usr_id, sessionStorage['chat_id'])
					promise2.then(response2 => {
						if (usr_id === sessionStorage['usr_id']) {
							alert("Вы вышли из чата")
						}
						else {
							alert("Пользователь удален из чата")
						}
						showInfo()
		    		})
		    	})
		    }
		    i += 1
        })
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
        companion = response.data
        const promise2 = checkLastSeen(companion)
        promise2.then(response2 => {
        	if (parseFloat(response2.data) > (1/6)) // Если более 10 минут без активности
        	{
        		//mail(companion)
        	}
        })
    })
    messageIn.value = ""
}

messageIn.addEventListener("keyup", (event) => {
	event.preventDefault()
	if (messageIn.value != "") {
		if (event.keyCode === 13)
			sendBtn.click()
	}
})

sendBtn.addEventListener("click", () => {
    addMessage(0, '', '');
})

const search = document.querySelector(".search")
search.addEventListener("input", () => {
	if (search.value != "") {
		clearInterval(intervalUpdateChats)
		showList(contacts)
	}
	else {
		intervalUpdateChats = window.setInterval(updateChats, 3000)
	}	
})
const search_modal = document.querySelector(".search-modal")
search_modal.addEventListener("input", () => {
	if (search_modal.value != "")
    	showListUsersAdd(document.querySelector(".modal-body"))
})

const searchMsg = document.querySelector(".search-msg")
searchMsg.addEventListener("input", () => {
	if (searchMsg.value != "") {
		clearInterval(intervalGetMessages)
		searchMsgForKey()
	}
	else {
		intervalGetMessages = window.setInterval(getMessagesFromDB, 3000)
	}
})

const create_chat = document.querySelector(".create_chat")
create_chat.addEventListener("click", () => {
    id = sessionStorage['usr_id']
    name = document.querySelector(".name-chat").value
    const promise = addChat(id, name)
    promise.then((response) => {
    	alert("Чат успешно создан")
    })
})

window.addEventListener("resize", () => {
    if (window.innerWidth > 576) {
        btnBackContacts.style.visibility = "hidden"
        chatArea.classList.remove("d-none", "d-sm-block")
        contactsArea.classList.remove("d-none", "d-sm-block")
    }
    else if (window.innerWidth < 576) {
        if (btnBackContacts.style.visibility != "visible") {
            btnBackContacts.style.visibility = "visible"
            chatArea.classList.add("d-none", "d-sm-block")
        }
    }
})

const btnBackContacts = document.querySelector('.back-contacts')
btnBackContacts.addEventListener("click", () => {
    chatArea.classList.add("d-none", "d-sm-block")
    contactsArea.classList.remove("d-none", "d-sm-block")
})

const logout = document.querySelector(".logout")
logout.addEventListener("click", () => {
	sessionStorage.clear();
	window.location.href = 'index.html'
})

const modalInfo = document.querySelector("#Modal-info")
const modalInfoBody = document.querySelector(".modal-body-info")
modalInfo.addEventListener('shown.bs.modal', () => {
	showInfo()
})

if (window.innerWidth < 576) {
    chatArea.classList.add("d-none", "d-sm-block")
    btnBackContacts.style.visibility = "visible"
}

// Очистка форм
search.value = ""
messageIn.value = ""
search_modal.value = ""
searchMsg.value = ""

intervalUpdateChats = window.setInterval(updateChats, 3000)
intervalGetMessages = window.setInterval(getMessagesFromDB, 3000)

