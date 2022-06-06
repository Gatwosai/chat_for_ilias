<?php
// Скрипт для отправки уведомления на почту.
$data = json_decode(file_get_contents("php://input"), true);
$usr_id = 305;//$data['usr_id'];
$content = "123";//$data['chat_id'];
$companion = 297;//$data['companion'];
$srv = "localhost";
$usr = "iliasuser";
$pass = "123";
$dbName = "ilias";
require_once("class.db.php");
$db = new Database($srv, $usr, $pass, $dbName);
$name = $db->getUsrName($usr_id);
$email = $db->getMail($companion);

$to = '';//$email;
$subject = 'Вам пришло новое личное сообщение в чате ILIAS';
$message = '
<html>
<head>
  <title>Вам пришло новое личное сообщение в чате ILIAS</title>
</head>
<body>
  <p>От: '.$name.'</p>
  <p>Текст сообщения:</p>
  <p>'.$content.'</p>
</body>
</html>
';
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
mail($to, $subject, $message, $headers);

