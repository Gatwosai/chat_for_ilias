function addMessageToDB(usr_id, chat_id, content, datetime, is_read, is_file) {
    const promise = axios({
        method: 'post',
        url: 'server/add_message.php',
        data: {
            usr_id: usr_id,
            chat_id: chat_id,
            content: content,
            datetime: datetime,
            is_read: is_read,
            is_file: is_file,
        }
    })
    return promise.then((response) => {
        return response
    })
}

function getMessages(chat_id, usr_id) {
    const promise = axios({
        method: 'get',
        url: `server/get_messages.php?chat_id=${chat_id}&usr_id=${usr_id}`
    })
    return promise.then((response) => {
        return response
    })
}

function getChats(usr_id) {
    const promise = axios({
        method: 'get',
        url: `server/get_chats.php?usr_id=${usr_id}`,
    })
    return promise.then((response) => {
        return response
    })
}

function addChat(id, name) {
    const promise = axios({
        method: 'get',
        url: `server/add_chat.php?creator_id=${id}&name=${name}`
    })
    return promise.then((response) => {
    	console.log(response)
        return response
    })
}

function addUser(chat_id, usr_id) {
    const promise = axios({
        method: 'get',
        url: `server/add_user.php?chat_id=${chat_id}&usr_id=${usr_id}`
    })
    return promise.then((response) => {
        return response
    })
}

function saveFile(file) {
    const promise = axios({
        method: 'post',
        url: 'server/save_file.php',
        data: file
    })
    return promise.then(response => {
        return response
    })
}

function loadFile(filePath) {
	const promise = axios({
		method: 'get',
		url: filePath,
		responseType: 'blob'
	})
	return promise.then(response => {
		return response
	})
}

function auth(login, password) {
    const promise =  axios({
        method: 'post',
        url: 'server/auth.php',
        data: {
            login: login,
            password: password,
        }
    })
    return promise.then((response) => {
        return response
    })
}

function sendMail(usr_id, content, companion) {
    const promise = axios({
        method: 'put',
        url: `server/send_mail.php`,
        data: {
        	usr_id: usr_id,
        	content: content,
        	companion: companion,
        }
    })
    return promise.then(response => {
        return response
    })
}

function deleteUserFromChat(usr_id, chat_id) {
	const promise = axios({
		method: 'delete',
		url: 'server/delete_user_from_chat.php',
		data: { 
			usr_id: usr_id,
			chat_id: chat_id,
		}
	})
	return promise.then(response => {
		return response
	})
}

function getInfo(chat_id) {
	const promise = axios({
		method: 'get',
		url: `server/get_info.php?chat_id=${chat_id}`
	})
	return promise.then(response => {
		return response
	})
}

function checkLastSeen(usr_id) {
	const promise = axios({
		method: 'get',
		url: `server/last_seen.php?usr_id=${usr_id}`
	})
	return promise.then(response => {
		return response
	})
}
