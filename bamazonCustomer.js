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
    })
  }
var customerBuys = function() {
  
    inquirer.prompt([{
    type: "input",
    name: "id",
    message: "Please select the Item ID that you wish to purchase.",
    validate: function(value) {
      if (isNaN(value) == false) {
        return true;
      } else {
        return false;
      }
    }
   },
  {
    type: "input",
    name: "quantity",
    message: "How many do you require?",
    validate: function(value) {
      if (isNaN(value) == false) {
        return true;
      } else {
        return false;
      }
    }
  }
]) .then (function(inquirerRes){
  var chosenID = inquirerRes.id;
  var chosenQuantity = inquirerRes.quantity;
  connection.query("SELECT * FROM products WHERE ?",
  {
    id: chosenID
  }, function(err, resp){
    
    for(i=0; i<resp.length; i++){
      var productToBuy = resp[i].product_name;
      var productQuantity = resp[i].stock_quantity;
      console.log(productToBuy);
      console.log(productQuantity);
    }
    
  })
    //console.log(inquirerRes.id);
    //console.log(inquirerRes.quantity);
    connection.end();
    
  })
}
productsMenu();

