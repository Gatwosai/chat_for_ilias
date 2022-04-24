<?php
/**
 * Скрипт аутентифицирует пользователя через SOAP.
 * Адрес до ilias, установленный локально: http://ilias
 * Client ID = test1
 * Входные параметры: login, password (method POST)
 */
session_start();
// игнор аутентификации
$_SESSION['id'] = 1;
header('Location: ../home.php');
exit();
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
header('Location: ../index.php');
exit();
*/