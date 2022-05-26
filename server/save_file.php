<?php
// Скрипт для сохранения файла.
$fileTmpPath = $_FILES['File']['tmp_name'];
$fileName = $_FILES['File']['name'];
$fileSize = $_FILES['File']['size'];
$fileType = $_FILES['File']['type'];
$fileNameCmps = explode(".", $fileName);
$fileExtension = strtolower(end($fileNameCmps));
$newFileName = md5(time() . $fileName) . '.' . $fileExtension;
$uploadFileDir = './uploaded_files/';
$dest_path = $uploadFileDir . $newFileName;
if(move_uploaded_file($fileTmpPath, $dest_path))
{
  $message ='File is successfully uploaded.';
  echo $message;
}
else
{
    $message = 'There was some error moving the file to upload directory. Please make sure the upload directory is writable by web server.';
    echo $message;
}

