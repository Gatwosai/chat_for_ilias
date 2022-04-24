<?php
/**
 * Класс подключения к базе данных.
 * server name = localhost;
 * user name = iliasuser;
 * password = '123';
 * database name = ilias / chat.
**/
class Database {
    public $connector;

    function __construct($srv, $usr, $pass, $db) {
        try {
            $connector = new PDO("mysql:host=$srv;dbname=$db",
            $usr, $pass);
            $connector->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } 
        catch(PDOException $err) {
            echo "Подключение к базе данных не удалось: ".$err->getMessage();
        }
    }

    function addMessage($usr_id, $chat_id, $content) {
        $sql = "INSERT INTO 
	            chats (from_id, to_id, message) 
	            VALUES (?, ?, ?)";
	    $stmt = $connector->prepare($sql);
	    $res  = $stmt->execute([$from_id, $to_id, $message]);
    }

    function addChat() {

    }
}
