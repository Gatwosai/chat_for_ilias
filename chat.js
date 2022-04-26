/*$(document).ready(function() {
    $('#action_menu_btn').click(function(){
        $('.action_menu').toggle();
    });

    $('#action_menu_btn_chat').click(function(){
        $('.action_menu_chat').toggle();
    });

    $("#sendBtn").on('click', function() {
        message = $("#message").val();
        if (message == "") return;
        $.post("./service/write_msg.php"), {
                message: message,
                to_id: to_id
            },
            function(data, status) {
                $("#message").val("");
                $("#chatBox").append(data);
            }
    });
});
*/

// Страница чата
if (false) {
    const textAreaMessage = document.querySelector("#message")
    const sendBtn = document.querySelector("#sendBtn")
    sendBtn.addEventListener("click", () => {
        const message = textAreaMessage.val()
        addMessage()
    })
}

// Страница входа
const textAreaLogin = document.querySelector("#login")
const textAreaPassword = document.querySelector("#password")
const btnAuth = document.querySelector("#loginForm")
btnAuth.addEventListener("submit", () => {
    const promise = auth(textAreaLogin.value, textAreaPassword.value)
    promise.then((response) => {
        sessionStorage.setItem("id", response.data)
        if (response.status == 200) {
            window.location.href = 'home.php'
        }
    })
})
