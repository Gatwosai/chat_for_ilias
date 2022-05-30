<?php
// Скрипт для отправки уведомления на почту.

$content = "Привет! Можешь, пожалуйста, отправить мне материалы для подготовки к экзамену?\r\n";
$name = "Александр Беляев";
$to      = 'hognidudre@vusra.com';
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

