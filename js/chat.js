$(document).ready(function(){
    $('#action_menu_btn').click(function(){
        $('.action_menu').toggle();
    });

    $('#action_menu_btn_chat').click(function(){
        $('.action_menu_chat').toggle();
    });

    $("#sendBtn").on('click', function() {
        message = $("#message").val();
        //if (message == "") return;
        $.post("./service/write_msg.php"), {
                message: "message1",
                to_id: 1
            },
            function(data, status) {
                $("#message").val("");
                $("#chatBox").append(data);
            }
    });
});
