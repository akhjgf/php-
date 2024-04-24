/*
SQLyog Professional v12.08 (64 bit)
MySQL - 5.7.26 
*********************************************************************
*/
/*!40101 SET NAMES utf8 */;

create table `user_info` (
	`u_id` int (11),
	`phone` varchar (765),
	`nickname` varchar (765),
	`email` varchar (765),
	`password` varchar (765),
	`birthday` date ,
	`sex` varchar (765),
	`bankcard` varchar (765),
	`true_name` varchar (765),
	`balance` Decimal (12),
	`register_time` timestamp ,
	`head_img` varchar (765),
	`status` char (6)
); 
insert into `user_info` (`u_id`, `phone`, `nickname`, `email`, `password`, `birthday`, `sex`, `bankcard`, `true_name`, `balance`, `register_time`, `head_img`, `status`) values('4','19881867957','123',NULL,'123456',NULL,NULL,NULL,NULL,NULL,'2023-12-10 16:33:17','img/user/member.jpg','正常');
insert into `user_info` (`u_id`, `phone`, `nickname`, `email`, `password`, `birthday`, `sex`, `bankcard`, `true_name`, `balance`, `register_time`, `head_img`, `status`) values('5','13980199867','123456',NULL,'123456',NULL,NULL,NULL,NULL,NULL,'2024-01-02 17:10:50','img/user/member.jpg','正常');
