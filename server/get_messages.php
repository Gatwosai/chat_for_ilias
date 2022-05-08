<?php
/**
 * Скрипт для вывода сообщений.
 */

$srv = "localhost";
$usr = "iliasuser";
$pass = "123";
$dbName = "chat";

require_once("class.db.php");
$db = new Database($srv, $usr, $pass, $dbName);
$messages = $db->getMessages();
foreach(new RecursiveArrayIterator($messages) as $message) {
    $msg = $message['content'];
    if ($message['usr_id'] == 1) {
        echo "<div class='d-flex justify-content-end mb-4'>
        <div class='msg_container_send'>
        $msg
        <span class='msg_time_send'>8:55, Сегодня</span></div>
        <div class='img_cont_msg'><img src='./assets/icons/teacher.png' class='rounded-circle user_img_msg'>
        </div>
        </div>";
    }
}