<?php
// Скрипт для сохранения файла.
try {
	$move = move_uploaded_file($_FILES['File']['tmp_name'], $_SERVER['DOCUMENT_ROOT'].'/uploads/'.$_FILES['File']['name']);
	echo $_FILES['File']['tmp_name'];
	echo "\n";
	echo $_SERVER['DOCUMENT_ROOT'].'/uploads/'.$_FILES['File']['name'];
	if (!$move) {
       throw new Exception('File didn\'t upload');
    }
    echo "File uploaded successfully";
} catch (Exception $ex) {
	echo $ex->getMessage();
}

