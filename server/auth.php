<?php
/**
 * Скрипт аутентифицирует пользователя через SOAP.
 * Адрес до ilias, установленный локально: http://ilias
 * Client ID = test1
 * Входные параметры: login, password (method POST)
 */
$data = json_decode(file_get_contents("php://input"), true);
$login = $data['login'];
$password = $data['password'];
$srv = "localhost";
$usr = "iliasuser";
$pass = "123";
$dbName = "ilias";
if(!empty($login) && !empty($password)){
    require_once("connector.php");
    $session_id = ILIAS_CONNECTOR::ILConnect($login, $password);
    if(is_string($session_id)) {
        require_once("class.db.php");
		$db = new Database($srv, $usr, $pass, $dbName);
		$usr_id = $db->getUsrId($login);
        //header('Location: ../home.html');
        header('Content-Type: application/json');
    	$response['session_id'] = $session_id;
    	$response['usr_id'] = $usr_id['usr_id'];
    	echo json_encode($response);
    }
    else {
    	//header('Location: ../index.html');
    	//exit;
    	//http_response_code(401);
    }
}

