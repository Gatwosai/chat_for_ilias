<?php
/**
 * Класс подключения к базе данных.
 * server name = localhost;
 * user name = iliasuser;
 * password = '123';
 * database name = ilias / chat.
**/
class Database {
    private $connector;

    function __construct($srv, $usr, $pass, $db) {
        try {
            $this->connector = new PDO("mysql:host=$srv;dbname=$db", $usr, $pass);
            $this->connector->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } 
        catch(PDOException $err) {
            echo "Подключение к базе данных не удалось: ".$err->getMessage();
        }
    }

    function addMessage($usr_id, $chat_id, $content, $datetime, $is_read, $is_file) {
        $sql = "INSERT INTO 
	            message (usr_id, chat_id, content, datetime, is_read, is_file) 
	            VALUES (?, ?, ?, STR_TO_DATE(?, '%d.%m.%Y %H:%i:%s'), ?, ?)";
        
	    $stmt = $this->connector->prepare($sql);
	    $res  = $stmt->execute([$usr_id, $chat_id, $content, $datetime, $is_read, $is_file]);
        return $res;
    }

    function getMessages() {
        $chat_id = 1;
        $sql = "SELECT usr_id, content
	            FROM message  
	            WHERE chat_id=?";
        
	    $stmt = $this->connector->prepare($sql);
	    $stmt->execute([$chat_id]);
        $res = $stmt->fetchAll();
        return $res;
    }

    function test($number) {
        $sql = "INSERT INTO
                test (test)
                VALUES (?)";
        $stmt = $this->connector->prepare($sql);
        $res = $stmt->execute([$number]);
        return $res;
    }

    function addChat() {

    }
}
