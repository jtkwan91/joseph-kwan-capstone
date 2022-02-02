CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `hashed_password` varchar(32) NOT NULL,
  `display_name` varchar(100) NOT NULL,
  `time_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `time_updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB;
