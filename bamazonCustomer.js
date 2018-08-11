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
var productTotal;
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
    var item_ids = [];
    /*for (var i =0; i < response.length; i++) {
      console.log("Item ID: " + response[i].id + "  || Product Name: " + response[i].product_name + " || Department: " + response[i].department_name + " || Price: $" + response[i].price + " || Quantity in Stock: " + response[i].stock_quantity);
      resp = response;*/
      console.table(response); 
      /*for(var j= 0; j < response.length; j++){
      items_ids.push(respose[i].id);
      }*/
      productTotal = response.length;
      console.log(productTotal);
      customerBuys();
    })
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
        //productsMenu();
      }
}

var customerBuys = function(item_ids) {
  
    inquirer.prompt([{
    type: "input",
    name: "id",
    message: "Please select the Item ID that you wish to purchase.",
    validate: function(value) {
    if (isNaN(value) == false/* && item_ids.indexOf(value) !== -1*/) {
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

      console.log(resp.length);
      console.log(productToBuy);
      console.log(productQuantity);
    }
    if(chosenQuantity > productQuantity) {
      console.log("Our apologies, we currently do not have enough stock to fulfill your order. We are going to replenish stock soon. Thank you.");
    } else {
      console.log("Thank you for choosing us for your needs today. Your order of " + chosenQuantity + " " + productToBuy + " is being processed");
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

