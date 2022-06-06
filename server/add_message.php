<?php

/**
 * Скрипт для добавления нового сообщения в базу данных
 * Входные данные:
 * Идентификатор пользователя: usr_id,
 * Идентификатор чата: chat_id,
 * Сообщение: content,
 * Дата: datetime,
 * Прочитано или нет: is_read,
 * Файл или нет: is_file.
 */

$srv = "localhost";
$usr = "iliasuser";
$pass = "123";
$dbName = "chat";

$data = json_decode(file_get_contents("php://input"), true);
$usr_id = $data['usr_id'];
$chat_id = $data['chat_id'];
$content = $data['content'];
$datetime = $data['datetime'];
$is_read = $data['is_read'];
$is_file = $data['is_file'];
require_once("class.db.php");
$db = new Database($srv, $usr, $pass, $dbName);
$companion = $db->addMessage($usr_id, $chat_id, $content, $datetime, $is_read, $is_file);

$srv = "localhost";
$usr = "iliasuser";
$pass = "123";
$dbName = "ilias";
$db = new Database($srv, $usr, $pass, $dbName);
$db->updateLastSeen($usr_id);
echo $companion;
?>
