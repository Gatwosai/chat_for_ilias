<?php
// Скрипт для сохранения файла.
try {
	$move = move_uploaded_file($_FILES['File']['tmp_name'], $_SERVER['DOCUMENT_ROOT'].'/uploads/'.$_FILES['File']['name']);
	if (!$move) {
       throw new Exception('File didn\'t upload');
    }
    echo $_SERVER['DOCUMENT_ROOT'].'/uploads/'.$_FILES['File']['name'];
} catch (Exception $ex) {
	echo $ex->getMessage();
}

