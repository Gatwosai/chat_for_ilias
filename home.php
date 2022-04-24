<?php
	session_start();
	if(!isset($_SESSION['id'])){
		header("Location: index.php");
		exit;
	}
?>
<!DOCTYPE html>
<html>
	<head>

		<title>Chat</title>
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
		<link href="./assets/dist/css/bootstrap.min.css" rel="stylesheet">
		<script src="./assets/dist/js/bootstrap.bundle.min.js"></script>
		<link href="./css/home.css" rel="stylesheet">

	</head>
	<body>

	<div class="container-fluid h-100">
			<div class="row justify-content-center h-100">
				<div class="row col-md-4 col-xl-3 chat">
					<div class="card mb-md-2 contacts_card">
					<div class="card-header">
						<div class="d-flex bd-highlight">
							<div class="mb-md-2 user_info">
                                <img src="./assets/icons/teacher.png" class="mb-2 rounded-circle user_img_msg">
								<span>Aleksey</span>
							</div>
						</div>
						<span id="action_menu_btn_chat"><i class="fas fa-ellipsis-v"></i></span>
							<div class="action_menu_chat">
								<ul>
									<li><i class="fas fa-user-circle"></i> View profile</li>
									<li><i class="fas fa-users"></i> Add to close friends</li>
									<li><i class="fas fa-plus"></i> Add to group</li>
									<li><i class="fas fa-ban"></i> Block</li>
								</ul>
							</div>
						<div class="input-group">
							<input type="text" placeholder="Search..." name="" class="form-control search">
							<span class="input-group-text search_btn"><i class="fas fa-search"></i></span>
						</div>
					</div>
					<div class="card-body contacts_body">
						<ui class="contacts">
						</ui>
					</div>
					<div class="card-footer"><img class="mb-md-0", width=30 src="./assets/icons/HeaderIcon.svg" alt=""></div>
				</div>
			</div>
				<div class="row col-md-8 col-xl-6 chat">
					<div class="card">
						<div class="card-header msg_head">
							<div class="d-flex bd-highlight">
								<div class="img_cont">
									<img src="./assets/icons/student.jpg" class="rounded-circle user_img">
									<span class="online_icon"></span>
								</div>
								<div class="user_info">
									<span>Chat with Aleksandr</span>
									<p>7 Messages</p>
								</div>
							</div>
							<span id="action_menu_btn"><i class="fas fa-ellipsis-v"></i></span>
							<div class="action_menu">
								<ul>
									<li><i class="fas fa-user-circle"></i> View profile</li>
									<li><i class="fas fa-users"></i> Add to close friends</li>
									<li><i class="fas fa-plus"></i> Add to group</li>
									<li><i class="fas fa-ban"></i> Block</li>
									<li><a href="./php/logout.php" class="btn btn-dark">Logout</a>
								</ul>
							</div>
						</div>
						<div class="card-body msg_card_body">
							<div class="d-flex justify-content-start mb-4">
							</div>
						</div>
						<div class="card-footer">
							<div class="input-group">
								<span class="input-group-text attach_btn"><i class="fas fa-paperclip"></i></span>
								<textarea name="" class="form-control type_msg" id=message placeholder="Type your message..."></textarea>
								<span class="input-group-text send_btn" id=sendBtn><i class="fas fa-location-arrow"></i></span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<script src="./service.js"></script>
		<script src="./chat.js"></script>
	</body>
</html>
