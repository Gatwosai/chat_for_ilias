<?php
// Скрипт для добавления чата.
$id = $_GET['creator_id'];
$name = $_GET['name'];
$srv = "localhost";
$usr = "iliasuser";
$pass = "123";
$dbName = "chat";
require_once("class.db.php");
$db = new Database($srv, $usr, $pass, $dbName);
echo $db->addChat($id, $name);

