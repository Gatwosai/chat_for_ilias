<?php
/**
 * Скрипт подключения к базе данных чата.
 * server name = localhost;
 * user name = iliasuser;
 * password = '123';
 * database name = chat.
 */
$serv_name = "localhost";
$usr_name = "iliasuser";
$pass = "123";
$db_name = "chat";
try {
    $conn = new PDO("mysql:host=$serv_name;dbname=$db_name",
                                $usr_name, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $err) {
    echo "Подключение к базе данных ilias не удалось: ".$err->getMessage();
}
