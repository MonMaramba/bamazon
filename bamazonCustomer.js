var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

//connection setup
var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "DamnSQL1!",
  database: "bamazon_db"
});

//connect to sql database
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    //productTable();
      });

      

  var query = "SELECT * FROM products";
  
  
  connection.query(query, function(error, response){
    if (error) throw error;
    for (var i =0; i < response.length; i++) {
      console.log("Item ID: " + response[i].id + "  || Product Name: " + response[i].product_name + " || Department: " + response[i].department_name + " || Price: $" + response[i].price + " || Quantity in Stock: " + response[i].stock_quantity);
      
    }

    //console.log(table.toString);
    connection.end();
  })
  
  