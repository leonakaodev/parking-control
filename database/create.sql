CREATE TABLE `users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`username` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`created_at` DATETIME NOT NULL,
	`updated_at` DATETIME DEFAULT NULL,
	`last_access` DATETIME DEFAULT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `settings` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`updated_at` DATETIME DEFAULT NULL,
	`updated_by` INT DEFAULT NULL,
	`half_price` FLOAT NOT NULL DEFAULT '2.00',
	`whole_price` FLOAT NOT NULL DEFAULT '4.00',
	PRIMARY KEY (`id`)
);

CREATE TABLE `vehicles` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`note` varchar(255),
	`created_at` DATETIME NOT NULL,
	`created_by` INT NOT NULL,
	`updated_at` DATETIME DEFAULT NULL,
	`updated_by` INT DEFAULT NULL,
	`finished` BOOLEAN NOT NULL DEFAULT '0',
	`finished_at` DATETIME DEFAULT NULL,
	`finished_by` INT DEFAULT NULL,
	`removed` BOOLEAN NOT NULL DEFAULT '0',
	`removed_at` DATETIME DEFAULT NULL,
	`removed_by` INT DEFAULT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `finances` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`value` FLOAT NOT NULL,
	`created_at` DATETIME NOT NULL,
	`created_by` INT NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `settings` ADD CONSTRAINT `settings_fk0` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`);

ALTER TABLE `vehicles` ADD CONSTRAINT `vehicles_fk0` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`);

ALTER TABLE `vehicles` ADD CONSTRAINT `vehicles_fk1` FOREIGN KEY (`finished_by`) REFERENCES `users`(`id`);

ALTER TABLE `vehicles` ADD CONSTRAINT `vehicles_fk2` FOREIGN KEY (`removed_by`) REFERENCES `users`(`id`);

ALTER TABLE `finances` ADD CONSTRAINT `finances_fk0` FOREIGN KEY (`created_by`) REFERENCES `vehicles`(`id`);