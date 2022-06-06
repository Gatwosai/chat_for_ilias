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
	    $sql = "SELECT COUNT(chat_id)
	    		FROM chat_users
	    		WHERE chat_id=$chat_id
				GROUP BY chat_id";
	    $stmt = $this->connector->prepare($sql);
	    $stmt->execute();
        $res = $stmt->fetch()[0];
        if ($res == 2) {
			$sql = "SELECT usr_id
					from chat_users
					WHERE usr_id NOT IN ($usr_id)";
			$stmt = $this->connector->prepare($sql);
			$stmt->execute();
			$res = $stmt->fetch()[0];
		}
		else {
			$res = 0;
		}
        return $res;
    }

    function getMessages($chat_id, $usr_id) {
    //FIXME Свои сообщения
        $sql = "UPDATE message
                SET is_read=1
                WHERE chat_id=?
                AND usr_id NOT IN (?)";
        $stmt = $this->connector->prepare($sql);
	    $stmt->execute([$chat_id, $usr_id]);       
        $sql = "SELECT usr_id, content, datetime, is_file
	            FROM message
	            WHERE chat_id=?";
	    $stmt = $this->connector->prepare($sql);
	    $stmt->execute([$chat_id]);
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $res;
    }
    
    function updateLastSeen($usr_id) {
    	$date = date("Y.m.d H:i:s");
		$sql = "UPDATE usr_data
                SET last_update='$date'
                WHERE usr_id=?";
        $stmt = $this->connector->prepare($sql);
	    $stmt->execute([$usr_id]);
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
				WHERE chat_id IN ($in)
				GROUP BY chat_id";
		$stmt = $this->connector->prepare($sql);
		$stmt->execute($chat_id_arr);
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
        	$companion = null;
        	if ($count_usr[$key] == 2) { // 2 users
        		$sql = "SELECT usr_id
					FROM chat_users
					WHERE chat_id=?
					AND usr_id NOT IN ($usr_id)";
				$stmt = $this->connector->prepare($sql);
				$stmt->execute([$el['chat_id']]);
				$companion = $stmt->fetch()[0];
        	}
        	$sql = "SELECT COUNT(1)
	            FROM message
	            WHERE chat_id=?
	            AND is_read=0
	            AND usr_id NOT IN (?)";
	    	$stmt = $this->connector->prepare($sql);
	    	$stmt->execute([$el['chat_id'], $usr_id]);
        	$countMsgs = $stmt->fetch()[0];
			$res[$key] = $el;
        	$res[$key] += ['usr_id' => $companion];
        	$res[$key] += ['count' => $countMsgs];
        }
        return $res;
    }
    
    function getLastSeen($usr_id) {
    	$sql = "SELECT last_update
    			FROM usr_data
    			WHERE usr_id=$usr_id";
    	$stmt = $this->connector->prepare($sql);
    	$stmt->execute();
    	$res = $stmt->fetch()[0];
    	return $res;
    }
    
    function getUsrIdInChat($chat_id) {
    	$sql = "SELECT usr_id
    			FROM chat_users
    			WHERE chat_id=$chat_id";
    	$stmt = $this->connector->prepare($sql);
    	$stmt->execute();
    	$res = $stmt->fetchAll(PDO::FETCH_COLUMN);
    	return $res;
    }
    
    function getInfo($usr_ids) {
    	$in  = str_repeat('?,', count($usr_ids) - 1).'?';
    	$sql = "SELECT firstname, lastname, login, last_update
    			FROM usr_data
    			WHERE usr_id IN ($in)";
    	$stmt = $this->connector->prepare($sql);
    	$stmt->execute($usr_ids);
    	$usrs = $stmt->fetchAll(PDO::FETCH_ASSOC);
    	$sql = "SELECT tutor
    			FROM obj_members
    			WHERE usr_id IN ($in)";
    	$stmt = $this->connector->prepare($sql);
    	$stmt->execute($usr_ids);
    	$tutor = $stmt->fetchAll(PDO::FETCH_COLUMN);
    	$res = array();
    	foreach ($usrs as $key => $usr) {
    		$res[$key] = $usr;
    		$res[$key]['last_update'] = (time() - strtotime($res[$key]['last_update'])) / 3600;
    		$res[$key] += ['tutor' => $tutor[$key]]; 
    	}
    	return $res;
    }
    
    function getCreator($chat_id) {
    	$sql = "SELECT creator_id
    			FROM chat
    			WHERE chat_id=$chat_id";
    	$stmt = $this->connector->prepare($sql);
    	$stmt->execute();
    	$res = $stmt->fetch()[0];
    	return $res;
    }
    
    function searchUser($key) {
        $sql = "SELECT usr_id, firstname, lastname, login
                FROM usr_data
                WHERE login LIKE '$key%'
                OR firstname LIKE '$key%'
                OR lastname LIKE '$key%'";
        $stmt = $this->connector->prepare($sql);
        $stmt->execute();
        $contacts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $contacts;
    }
    
    function deleteUsrFromChat($usr_id, $chat_id) {
    	$sql = "DELETE FROM chat_users
    			WHERE usr_id=$usr_id
    			AND chat_id=$chat_id";
    	$stmt = $this->connector->prepare($sql);
    	$res = $stmt->execute();
    	return $res;
    }
    
    function getImg($mas) {
    	$usr_ids = array();
    	foreach ($mas as $key => $val) {
    		$usr_ids[$key] = $val['usr_id'];
    	}
    	$in  = str_repeat('?,', count($usr_ids) - 1).'?';
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
    
    function getImgForSearch($usr_ids) {
    	$in  = str_repeat('?,', count($usr_ids) - 1).'?';
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
    
    function getMail($usr_id) {
		$sql = "SELECT email
                FROM usr_data
                WHERE usr_id=?";
        $stmt = $this->connector->prepare($sql);
        $stmt->execute([$usr_id]);
        $res = $stmt->fetch()[0];
        return $res;
    }
    
    function getUsrName($usr_id) {
    	$sql = "SELECT firstname, lastname
                FROM usr_data
                WHERE usr_id=?";
        $stmt = $this->connector->prepare($sql);
        $stmt->execute([$usr_id]);
        $name = $stmt->fetch();
        $res = $name[0]." ".$name[1];
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
