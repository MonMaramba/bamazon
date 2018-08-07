var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

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

      
  var resp;
  var query = "SELECT * FROM products";
  
  var productsMenu = function(){
  connection.query(query, function(error, response){
    if (error) throw error;
    /*for (var i =0; i < response.length; i++) {
      console.log("Item ID: " + response[i].id + "  || Product Name: " + response[i].product_name + " || Department: " + response[i].department_name + " || Price: $" + response[i].price + " || Quantity in Stock: " + response[i].stock_quantity);
      resp = response;*/
      console.table(response); 
      customerBuys();
      
      
    //console.log(response);
    //console.log(table.toString);
       
  })
  }
var customerBuys = function() {
  
  
  inquirer.prompt([{
    type: "input",
    name: "id",
    message: "Please select the Item ID that you wish to purchase."
   },
  {
    type: "input",
    name: "quantity",
    message: "How many do you require?"
  }
]) .then (function(inquirerRes){
    console.log(inquirerRes.id);
    console.log(inquirerRes.quantity);
    connection.end();
    /*var productChoice;
    if (inquirerRes.id !== resp.id[i]){
      return "Please enter a whole non-zero number."
    } else {
      productChoice = 
    }
    var productQ;
    if(inquirerRes.quantity > ){

    }*/

  })
}
productsMenu();

