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
}

function auth(login, password) {
    //const promise1 = axios.get('./server/auth.php?id=1')
    return axios({
        method: 'get',
        url: 'https://repetitora.net/api/JS/Tasks?widgetId=228',
        //constdata: {
            //login: login,
            //password: password,
        //}
    })
    .then(function(response) {
        console.log(response.data)
        return response.data
    })

}*/