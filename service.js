/*function addMessage(usr_id, chat_id, content, datetime, is_read, is_file) {
    axios({
        method: 'post',
        url: '.server/add_message.php',
        data: {
            usr_id: usr_id,
            chat_id: chat_id,
            content: content,
            datetime: datetime,
            is_read: is_read,
            is_file: is_file,
        }
    })
}*/

function auth(login, password) {
    const promise =  axios({
        method: 'post',
        url: 'server/auth.php',
        constdata: {
            login: "login",
            password: "password",
        }
    })
    return promise.then((response) => {
        return (response)
    })
}
