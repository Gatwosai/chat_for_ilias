<?php
/**
 * Скрипт аутентифицирует пользователя через SOAP.
 * Адрес до ilias, установленный локально: http://ilias
 * Client ID = test1
 * Входные параметры: login, password (method POST)
 */
//require_once("class.db.php");
//$db = new Database("localhost", "iliasuser", "123", "chat");
//echo $db.connector->addMessage(1, 1, 123, date(), false, false);
$data = json_decode(file_get_contents("php://input"), true);
$id = 228;
if (false) {
    http_response_code(401);
}
echo $id;
/*
if(!empty($_POST['login']) && !empty($_POST['password'])){
    require_once("connector.php");
    $session_id = ILIAS_CONNECTOR::ILConnect($_POST['login'], $_POST['password']);
    if(is_string($session_id)) {
        $_SESSION['id'] = $session_id;
        header('Location: ../home.php');
        exit;
    }
}
*/