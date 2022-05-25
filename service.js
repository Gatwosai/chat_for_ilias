function addMessage(usr_id, chat_id, content, datetime, is_read, is_file) {
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

function getMessages(chat_id) {
    const promise = axios({
        method: 'get',
        url: `server/get_messages.php?chat_id=${chat_id}`
    })
    return promise.then((response) => {
        return response
    })
}

function getChats() {
    const promise = axios({
        method: 'get',
        //FIXME usr_id is param
        url: 'server/get_chats.php?usr_id=1',
    })
    return promise.then((response) => {
        return response
    })
}

function searchUser(usr_id, key) {
    const promise = axios({
        method: 'get',
        url: `server/search_user.php?usr_id=${usr_id}&key=${key}`
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
        return response
    })
}

function addUser(usr_id, chat_id) {
    const promise = axios({
        method: 'get',
        url: `server/add_user.php?usr_id=${usr_id}&chat_id=${chat_id}`
    })
    return promise.then((response) => {
        return response
    })
}

function auth(login, password) {
    const promise =  axios({
        method: 'post',
        url: 'server/auth.php',
        constdata: {
            login: login,
            password: password,
        }
    })
    return promise.then((response) => {
        return response
    })
}
