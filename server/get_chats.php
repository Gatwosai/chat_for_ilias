<?php
// Скрипт для добавления чатов.
$srv = "localhost";
$usr = "iliasuser";
$pass = "123";
$dbName = "chat";
require_once("class.db.php");
$db = new Database($srv, $usr, $pass, $dbName);
$chats = $db->getChats();
//FIXME del com
/*foreach(new RecursiveArrayIterator($chats) as $chat) {
    $name = $chat['name'];
    echo $name;
    echo "\n";
}*/
$data = $chats;
header('Content-Type: application/json');
echo json_encode($data);
