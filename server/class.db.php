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
	    $res  = $stmt->execute([$usr_id, $chat_id, $content, $datetime,        
	                            $is_read, $is_file]);
        return $res;
    }

    function getMessages() {
        // FIXME chat id is param
        $chat_id = 1;
        $sql = "SELECT usr_id, content
	            FROM message  
	            WHERE chat_id=?";
	    $stmt = $this->connector->prepare($sql);
	    $stmt->execute([$chat_id]);
        $res = $stmt->fetchAll();
        return $res;
    }
    
    function getChats() {
        // FIXME usr id is param
        $usr_id = 1;
        $sql = "SELECT chat_id
                FROM Chat_users
                WHERE usr_id=?";
        $stmt = $this->connector->prepare($sql);
        $stmt->execute([$usr_id]);
        $chat_id_arr = $stmt->fetchAll();
        $name = $chat_id_arr['name'];
        $in  = str_repeat('?,', count($name) - 1).'?';
        $sql = "SELECT name
                FROM Chat
                WHERE chat_id
                IN (2, 3, 4, 5)"; //FIXME
        $stmt = $this->connector->prepare($sql);
        $stmt->execute($name);
        $res = $stmt->fetchAll();
        return $res;
    }
    
    function searchUser($usr_this, $key) {
        $sql = "SELECT firstname, lastname
                FROM usr_data
                WHERE login LIKE '$key%'
                OR firstname LIKE '$key%'
                OR lastname LIKE '$key%'";
        //FIXME mb for first+last name
        $stmt = $this->connector->prepare($sql);
        $stmt->execute();
        $contacts = $stmt->fetchAll();
        return $contacts;
    }

    function test($number) {
        $sql = "INSERT INTO
                test (test)
                VALUES (?)";
        $stmt = $this->connector->prepare($sql);
        $res = $stmt->execute([$number]);
        return $res;
    }

    function addChat($creator_id, $name) {
        $sql = "INSERT INTO
                Chat (creator_id, name)
                VALUES (?, ?)";
        $stmt = $this->connector->prepare($sql);
        $res = $stmt->execute([$creator_id, $name]);
        return $res;
    }
}
