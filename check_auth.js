function check_auth() {
    const promise = auth(sessionStorage.getItem('login'), sessionStorage.getItem('password'))
    promise.then((response) => {
        if (response.status != 200) {
            window.location.href = 'index.html'
        }
    })
}
check_auth()
