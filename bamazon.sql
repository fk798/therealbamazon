drop database if exists bamazon;
create database bamazon;

use bamazon;

create table products(
item_id int not null auto_increment,
product varchar(100),
department_name varchar(100),
price decimal(9, 2),
stock_quantity int,
product_sales int default 0,
primary key (item_id)
);

insert into products(product, department_name, price, stock_quantity)
values ("apples", "Food", 3.00, 10);

insert into products(product, department_name, price, stock_quantity)
values ("bananas", "Food", 3.50, 20);

insert into products(product, department_name, price, stock_quantity)
values ("Mac", "Technology", 2000.00, 5);

insert into products(product, department_name, price, stock_quantity)
values ("iPhone", "Technology", 799.99, 3);

insert into products(product, department_name, price, stock_quantity)
values ("Lamp", "Furniture", 40.00, 50);

insert into products(product, department_name, price, stock_quantity)
values ("Sofa", "Furniture", 500.00, 15);

insert into products(product, department_name, price, stock_quantity)
values ("Bed", "Furniture", 200.00, 10);

insert into products(product, department_name, price, stock_quantity)
values ("Black Panther DVD", "Entertainment", 19.99, 50);

insert into products(product, department_name, price, stock_quantity)
values ("Superman DVD", "Entertainment", 19.99, 50);

insert into products(product, department_name, price, stock_quantity)
values ("Paper Towels", "Supplies", 5.00, 30);


use bamazon;
select * from products;


use bamazon;
create table departments(
department_id int not null auto_increment,
department_name varchar(100),
over_head__costs int,
primary key (department_id)
);