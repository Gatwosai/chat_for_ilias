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

    function getMessages($chat_id, $usr_id) {
        $sql = "UPDATE message
                SET is_read=1
                WHERE chat_id=?
                AND usr_id NOT IN (?)";
        $stmt = $this->connector->prepare($sql);
	    $stmt->execute([$chat_id, $usr_id]);       
        $sql = "SELECT usr_id, content
	            FROM message
	            WHERE chat_id=?";
	    $stmt = $this->connector->prepare($sql);
	    $stmt->execute([$chat_id]);
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $res;
    }
    
    function checkNewMessages($chat_id) {
        $sql = "SELECT COUNT(1)
	            FROM message
	            WHERE chat_id=?
	            AND is_read=0";
	    $stmt = $this->connector->prepare($sql);
	    $stmt->execute([$chat_id]);
        $res = $stmt->fetch()[0];
        return $res;
    }
    
    function getChats($usr_id) {
        $sql = "SELECT chat_id, usr_id
                FROM chat_users
                WHERE usr_id=?";
        $stmt = $this->connector->prepare($sql);
        $stmt->execute([$usr_id]);
        $id_arr = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $chat_id_arr = array();
        foreach ($id_arr as $key => $el) {
			$chat_id_arr[$key] = $el['chat_id'];
		}
		$in  = str_repeat('?,', count($chat_id_arr) - 1).'?';
		$sql = "SELECT COUNT(chat_id)
				FROM chat_users
				GROUP BY chat_id";
		$stmt = $this->connector->prepare($sql);
		$stmt->execute();
		$count_usr = $stmt->fetchAll(PDO::FETCH_COLUMN);
        $sql = "SELECT chat_id, name
                FROM chat
                WHERE chat_id
                IN ($in)";
        $stmt = $this->connector->prepare($sql);
        $stmt->execute($chat_id_arr);
        $arr_assoc = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $res = array();
        foreach ($arr_assoc as $key => $el) {
        	$companion = array();
        	if ($count_usr[$key] == 2) { // 2 users
        		$sql = "SELECT usr_id
					FROM chat_users
					WHERE chat_id=?
					AND usr_id NOT IN ($usr_id)";
				$stmt = $this->connector->prepare($sql);
				$stmt->execute([$el['chat_id']]);
				$companion = $stmt->fetch();
        	}
			$res[$key] = $el;
        	$res[$key] += ['usr_id' => $companion['usr_id']];
        }
        return $res;
    }
    
    function searchUser($key) {
        //FIXME for search not this id
        $sql = "SELECT usr_id, firstname, lastname
                FROM usr_data
                WHERE login LIKE '$key%'
                OR firstname LIKE '$key%'
                OR lastname LIKE '$key%'";
        //FIXME mb for first+last name
        $stmt = $this->connector->prepare($sql);
        $stmt->execute();
        $contacts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $contacts;
    }
    
    function getImg($mas) {
    	$usr_ids = array();
    	foreach ($mas as $key => $val) {
    		$usr_ids[$key] = $val['usr_id'];
    	}
    	$in  = str_repeat('?,', count($usr_ids) - 1).'?';
    	//return count($usr_ids);
        $sql = "SELECT value
                FROM usr_pref
                WHERE usr_id
                IN ($in)
                AND value LIKE '%.jpg'";
        $stmt = $this->connector->prepare($sql);
        $stmt->execute($usr_ids);
        $imgs = $stmt->fetchAll(PDO::FETCH_COLUMN);
        return $imgs;
    }
    
    function getImgForMsg($messages) {
    	$usr_ids = array();
    	foreach ($messages as $key => $val) {
    		$usr_ids[$key] = $val['usr_id'];
    	}
    	$imgs = array();
    	foreach ($usr_ids as $key => $id) {
    		$sql = "SELECT value
    				FROM usr_pref
    				WHERE usr_id=$id
    				AND value LIKE '%.jpg'";
    		$stmt = $this->connector->prepare($sql);
    		$stmt->execute();
    		$imgs[$key] = $stmt->fetch()[0];
    	}
    	return $imgs;
    }
    
    function delSearchUser($search) {
    	$in = str_repeat('?,', count($search['usr_id']) - 1).'?';
    	$sql = "SELECT usr_id
    			FROM chat_users
    			WHERE usr_id
    			IN ($in)";
    	$stmt = $this->connector->prepare($sql);
    	$stmt->execute($search['usr_id']);
    	echo $search['usr_id'];
    	$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
    	return $res;
    }

    function getUsrId($login) {
        $sql = "SELECT usr_id
                FROM usr_data
                WHERE login=?";
        $stmt = $this->connector->prepare($sql);
        $stmt->execute([$login]);
        $res = $stmt->fetch(PDO::FETCH_ASSOC);
        return $res;
    }

    function addChat($creator_id, $name) {
        $sql = "INSERT INTO
                chat (creator_id, name)
                VALUES (?, ?)";
        $stmt = $this->connector->prepare($sql);
        $res = $stmt->execute([$creator_id, $name]);
        return $res;
    }
    
    function addUser($chat_id, $usr_id) {
        $sql = "INSERT INTO
                chat_users
                VALUES (?, ?)";
        $stmt = $this->connector->prepare($sql);
        $res = $stmt->execute([$chat_id, $usr_id]);
    }
}
