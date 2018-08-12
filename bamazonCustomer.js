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

      
  var productTotal;
  var query = "SELECT * FROM products";
  
  var productsMenu = function(){
  connection.query(query, function(error, response){
    if (error) throw error;
        
      console.table(response); 
      productTotal = response.length;
      console.log(productTotal);
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
  var productQuantity;
  var productCost;

  function totalCost(a, b){
    var custTotal = a * b;
    
    console.log("Total amount due is $ " + custTotal.toFixed(2) + " \n");
  }

  function updateQ() {
    var newQ = productQuantity - chosenQuantity;
      connection.query("UPDATE PRODUCTS SET ? WHERE ?", [{
        stock_quantity: newQ
      }, 
      {
        id: chosenID
      }]), function(error2, res){
        console.log(res.affecteRows + " products updated!\n");
        productsMenu();
      }
}
  
  connection.query("SELECT * FROM products WHERE ?",
  {
    id: chosenID
  }, function(err, resp){
    
    for(i=0; i<resp.length; i++){
      var productToBuy = resp[i].product_name;
          productQuantity = resp[i].stock_quantity;
          productCost = resp[i].price;
      /*console.log(productCost);
      console.log(resp.length);
      console.log(productToBuy);
      console.log(productQuantity);*/
    }
    if(chosenQuantity > productQuantity) {
      console.log("Our apologies, we currently do not have enough stock to fulfill your order. We are going to replenish stock soon. Thank you.");
    } else {
      console.log("Thank you for choosing us for your needs today. Your order of " + chosenQuantity + " " + productToBuy + " is being processed");
      totalCost(chosenQuantity, productCost)
      updateQ()
    }
    productsMenu();
  })
    
    
    
  })
  
}
//connection.end();
/*function updateQ() {
    var newQ = productQuantity - chosenQuantity;
      connection.query("UPDATE PRODUCTS SET ? WHERE ?", [{
        stock_quantity: newQ
      }, 
      {
        id: chosenID
      }]), function(error2, res){
        console.log(res.affecteRows + " products updated!\n");
        //productsMenu();
      }
}*/
productsMenu();

