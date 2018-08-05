DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(

    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Olive Oil", "Baking", 7.80, 10 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Onions", "Produce", 1.07, 5 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bell Peppers", "Produce", 1.26, 14 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jalapeno", "Produce", .48, 8 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ground Cummin", "Spices", 4.99, 6 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Canned Tomatoes", "Canned Goods", 1.26, 10 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kosher Salt", "Condiments", 3.99, 12 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ground Black Pepper", "Condiments", 3.39, 7 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cilantro", "Produce", .80, 20 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Eggs", "Dairy", 9.89, 6 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Canned Olives", "Canned Goods", 1.50, 11 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Feta Cheese", "Dairy", 13.25, 3 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sourdough Bread", "Baked Goods", 4.39, 10 );

