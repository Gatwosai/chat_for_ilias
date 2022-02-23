<?php
?>
<!DOCTYPE html>
<html>
	<head>

		<title>Chat</title>
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
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
							<span id="action_menu_btn"><i class="fas fa-ellipsis-v"></i></span>
							<div class="action_menu">
								<ul>
									<li><i class="fas fa-user-circle"></i> View profile</li>
									<li><i class="fas fa-users"></i> Add to close friends</li>
									<li><i class="fas fa-plus"></i> Add to group</li>
									<li><i class="fas fa-ban"></i> Block</li>
								</ul>
							</div>
						</div>
						<div class="input-group">
							<input type="text" placeholder="Search..." name="" class="form-control search">
							<span class="input-group-text search_btn"><i class="fas fa-search"></i></span>
						</div>
					</div>
					<div class="card-body contacts_body">
						<ui class="contacts">
						<li class="active">
							<div class="d-flex bd-highlight">
								<div class="img_cont">
									<img src="./assets/icons/student.jpg" class="rounded-circle user_img">
									<span class="online_icon"></span>
								</div>
								<div class="user_info">
									<span>Aleksandr</span>
									<p>Aleksandr is online</p>
								</div>
							</div>
						</li>
						<li>
							<div class="d-flex bd-highlight">
								<div class="img_cont">
									<img src="./assets/icons/group.png" class="rounded-circle user_img">
									<!---<span class="online_icon offline"></span>
									--->
								</div>
								<div class="user_info">
									<span>IVT-82</span>
									<p>20 members</p>
								</div>
							</div>
						</li>
						<li>
							<div class="d-flex bd-highlight">
								<div class="img_cont">
									<img src="./assets/icons/teacher_woman.png" class="rounded-circle user_img">
									<span class="online_icon"></span>
								</div>
								<div class="user_info">
									<span>Angelina</span>
									<p>Angelina is online</p>
								</div>
							</div>
						</li>
						<li>
							<div class="d-flex bd-highlight">
								<div class="img_cont">
									<img src="./assets/icons/student_woman.jpg" class="rounded-circle user_img">
									<span class="online_icon offline"></span>
								</div>
								<div class="user_info">
									<span>Anna</span>
									<p>Anna left 30 mins ago</p>
								</div>
							</div>
						</li>
						<li>
							<div class="d-flex bd-highlight">
								<div class="img_cont">
									<img src="./assets/icons/group.png" class="rounded-circle user_img">
									
								</div>
								<div class="user_info">
									<span>Programing</span>
									<p>4 members</p>
								</div>
							</div>
						</li>
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
								</ul>
							</div>
						</div>
						<div class="card-body msg_card_body">
							<div class="d-flex justify-content-start mb-4">
								<div class="img_cont_msg">
									<img src="./assets/icons/student.jpg" class="rounded-circle user_img_msg">
								</div>
								<div class="msg_container">
									Hi, how are you Aleksey?
									<span class="msg_time">8:40 AM, Today</span>
								</div>
							</div>
							<div class="d-flex justify-content-end mb-4">
								<div class="msg_container_send">
									Hi, Aleksandr. I am good, thx. How about you?
									<span class="msg_time_send">8:55 AM, Today</span>
								</div>
								<div class="img_cont_msg">
									<img src="./assets/icons/teacher.png" class="rounded-circle user_img_msg">
								</div>
							</div>
							<div class="d-flex justify-content-start mb-4">
								<div class="img_cont_msg">
									<img src="./assets/icons/student.jpg" class="rounded-circle user_img_msg">
								</div>
								<div class="msg_container">
									I am good too, thank you for work
									<span class="msg_time">9:00 AM, Today</span>
								</div>
							</div>
							<div class="d-flex justify-content-end mb-4">
								<div class="msg_container_send">
									You are welcome
									<span class="msg_time_send">9:05 AM, Today</span>
								</div>
								<div class="img_cont_msg">
									<img src="./assets/icons/teacher.png" class="rounded-circle user_img_msg">
								</div>
							</div>
							<div class="d-flex justify-content-start mb-4">
								<div class="img_cont_msg">
									<img src="./assets/icons/student.jpg" class="rounded-circle user_img_msg">
								</div>
								<div class="msg_container">
									I am looking for your new works
									<span class="msg_time">9:07 AM, Today</span>
								</div>
							</div>
							<div class="d-flex justify-content-end mb-4">
								<div class="msg_container_send">
									Ok, thank you. Have a good day
									<span class="msg_time_send">9:10 AM, Today</span>
								</div>
								<div class="img_cont_msg">
									<img src="./assets/icons/teacher.png" class="rounded-circle user_img_msg">
								</div>
							</div>
							<div class="d-flex justify-content-start mb-4">
								<div class="img_cont_msg">
									<img src="./assets/icons/student.jpg" class="rounded-circle user_img_msg">
								</div>
								<div class="msg_container">
									Bye, see you
									<span class="msg_time">9:12 AM, Today</span>
								</div>
							</div>
						</div>
						<div class="card-footer">
							<div class="input-group">
								<span class="input-group-text attach_btn"><i class="fas fa-paperclip"></i></span>
								<textarea name="" class="form-control type_msg" placeholder="Type your message..."></textarea>
								<span class="input-group-text send_btn"><i class="fas fa-location-arrow"></i></span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<script src="chat.js"></script>
	</body>
</html>