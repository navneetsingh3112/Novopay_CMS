create database cms;
use database cms;

CREATE TABLE `users` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`username` varchar(255) NOT NULL,
`password` varbinary(255) NOT NULL,
`createdAt` datetime NOT NULL,
`updatedAt` datetime NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


insert into users (username,password,createdAt,updatedAt) values ('1111',AES_ENCRYPT('1111',UNHEX('F3229A0B371ED2D9441B830D21A390C3')),NOW(),NOW());