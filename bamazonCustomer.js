var mysql = require("mysql");
var inquirer = require("inquirer")

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  displayProducts()
});

function displayProducts() {
    connection.query("select * from products", function(err, res) {
        if (err) throw err
        for (i=0; i<res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product + " | " + res[i].price)
        }
        promptMessages()
    })
}

function promptMessages() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the ID of the product you would like to buy?",
            name: "id"
        },
        {
            type: "input",
            message: "How many units would you like to buy?",
            name: "quantity"
        }
    ]).then(function(response) {
        connection.query(
            "select stock_quantity from products where item_id =" + response.id, function(err, queryResponse) {
                if (response.quantity > queryResponse[0].stock_quantity) {
                    console.log("Insufficient quantity!")
                    afterConnection()
                }
                else {
                    var left = queryResponse[0].stock_quantity - response.quantity
                    connection.query("update products set stock_quantity=" + left + " where item_id=" + response.id)
                    displayPrice(response.id, response.quantity)
                }
            }
        )
    })
}

function displayPrice(id, quantity) {
    connection.query("select price from products where item_id=" + id, function(err, response) {
        var price = quantity * response[0].price
        connection.query("update products set product_sales = product_sales + " + price + " where item_id =" + id, function(error, res) {
            console.log("Your total is $" + price)
            afterConnection()
        })
    })
}

function afterConnection() {
  connection.end()
}
