$(document).ready(function(){
    $('#action_menu_btn').click(function(){
        $('.action_menu').toggle();
    });

    $('#action_menu_btn_chat').click(function(){
        $('.action_menu_chat').toggle();
    });

    $("#sendBtn").on('click', function() {
        message = $("#message").val();
        alert("123");
        //if (message == "") return;
        //$.post("../ajax/write_msg.php"), {
                //message: message,
                //to_id: <?=$chatWith['user_id']?>
            //},
            //function(data, status) {

                //$("#message").val("");
                //$("#chatBox").append(data);
            //}
    });
});
