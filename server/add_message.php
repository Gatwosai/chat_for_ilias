<?php
/**
 * Скрипт для добавления нового сообщения в базу данных
 * с применением ajax.
 * Входные данные:
 * Идентификатор пользователя: usr_id,
 * Идентификатор чата: chat_id,
 * Сообщение: content,
 * Дата: datetime,
 * Прочитано или нет: is_read,
 * Файл или нет: is_file.
 */
require_once("class.db.php");

$usr_id = $_POST['usr_id'];
$chat_id = $_POST['chat_id'];
$content = $_POST['content'];
$datetime = $_POST['datetime'];
$is_read = $_POST['is_read'];
$is_file = $_POST['is_file'];
$db = new Database("localhost", "iliasuser", "123", "ilias");
db.connector->addMessage($usr_id, $chat_id, $content, $datetime, $is_read, $is_file);