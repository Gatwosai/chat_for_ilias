CREATE TABLE `chat` (
	`chat_id` INT NOT NULL AUTO_INCREMENT,
	`creator_id` INT NOT NULL,
	`name` varchar(32) NOT NULL,
	PRIMARY KEY (`chat_id`)
);

CREATE TABLE `chat_users` (
	`chat_id` INT NOT NULL,
	`usr_id` INT NOT NULL
);

CREATE TABLE `message` (
	`chat_id` INT NOT NULL,
	`usr_id` INT NOT NULL,
	`content` TEXT(2000) NOT NULL,
	`datetime` DATETIME NOT NULL,
	`is_read` BOOLEAN NOT NULL,
	`is_file` BOOLEAN NOT NULL
);

ALTER TABLE `chat_users` ADD CONSTRAINT `chat_users_fk0` FOREIGN KEY (`chat_id`) REFERENCES `chat`(`chat_id`);

ALTER TABLE `message` ADD CONSTRAINT `message_fk0` FOREIGN KEY (`chat_id`) REFERENCES `chat`(`chat_id`);

CREATE TRIGGER insert_chat_id AFTER INSERT ON chat FOR EACH ROW INSERT INTO chat_users VALUES (NEW.chat_id, NEW.creator_id);

