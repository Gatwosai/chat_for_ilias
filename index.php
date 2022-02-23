<?php
  session_start();
  
?>
<!doctype html>
<html lang="en">
  <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Login</title>
    <link href="./assets/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="./css/login.css" rel="stylesheet">
    
  </head>
  <body class="text-center"> 
    <main class="form-login shadow">
      <form method="post" action="php/auth.php">
        <img class="mb-4" src="./assets/icons/HeaderIcon.svg" alt="" width="72" height="57">
        <h1 class="h3 mb-3 fw-normal">Войти в чат</h1>
        <div class="form-floating">
          <input type="text" class="form-control" id="floatingInput" name="login" placeholder="login">
          <label for="floatingInput">Логин</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" id="floatingPassword" name="password" placeholder="Password">
          <label for="floatingPassword">Пароль</label>
        </div>
        <button class="w-100 btn btn-lg btn-primary" type="submit">Вход</button>
        <p class="mt-5 mb-3 text-muted">&copy; Александр Беляев</p>
      </form>
    </main>

  </body>
</html>
