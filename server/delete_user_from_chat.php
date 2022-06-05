<?php
// Скрипт для удаления пользователя из чата
$data = json_decode(file_get_contents("php://input"), true);
$usr_id = $data['usr_id'];
$chat_id = $data['chat_id'];
$srv = "localhost";
$usr = "iliasuser";
$pass = "123";
$dbName = "chat";
require_once("class.db.php");
$db = new Database($srv, $usr, $pass, $dbName);
$res = $db->deleteUsrFromChat($usr_id, $chat_id);
echo $res;
