use data;


create table users(
id int auto_increment primary key,
firstname varchar(300),
lastname varchar(300),
email varchar(300) not null,
password varchar(300) not null
);

select * from users;
