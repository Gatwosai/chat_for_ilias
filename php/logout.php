<?php
/**
 * Скрипт заканчивает сессию пользователя ilias
 * и перенаправляет на страницу входа
 */
session_start();

require_once("connector.php");

ILIAS_CONNECTOR::ILDisConnect($_SESSION['id']);
session_unset();
session_destroy();

header("Location: ../index.php");
exit;