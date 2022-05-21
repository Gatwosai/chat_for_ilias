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

function getMessages() {
    const promise = axios({
        method: 'get',
        url: 'server/get_messages.php'
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
