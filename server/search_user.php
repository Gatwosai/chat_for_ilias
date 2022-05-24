<?php
/**
 * Скрипт для поиска пользователей ilias.
 */
$usr_id = $_GET['usr_id'];
$key = $_GET['key'];

$srv = "localhost";
$usr = "iliasuser";
$pass = "123";
$dbName = "ilias";
require_once("class.db.php");
$db = new Database($srv, $usr, $pass, $dbName);
$search = $db->searchUser($usr_id, $key);
//FIXME del com
/*foreach(new RecursiveArrayIterator($chats) as $chat) {
    $name = $chat['name'];
    echo $name;
    echo "\n";
}*/
$data['search'] = $search;
header('Content-Type: application/json');
echo json_encode($data);
