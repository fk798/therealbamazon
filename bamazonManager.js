var mysql = require("mysql");
var inquirer = require("inquirer")

var connection

var args = process.argv.slice(2).join(" ")

if (args == "View Products for Sale") {
    queryFunction(1)
}
else if (args == "View Low Inventory") {
    queryFunction(2)
}
else if (args == "Add to Inventory") {
    queryFunction(3)
}
else if (args == "Add New Product") {
    queryFunction(4)
}
else {
    console.log('"' + args + '" is not a valid command. Valid commands are:')
    console.log("node bamazonManager View Products for Sale")
    console.log("node bamazonManager View Low Inventory")
    console.log("node bamazonManager Add to Inventory")
    console.log("node bamazonManager Add New Product")
}

function queryFunction(num) {
    connection = mysql.createConnection({
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
        console.log("connected as id " + connection.threadId)
    })

    if (num == 1) {
        viewProducts()
    }
    else if (num == 2) {
        viewLow()
    }
    else if (num == 3) {
        increaseInventory()
    }
    else {
        addNew()
    }
}

function viewProducts() {
    connection.query("select * from products", function (err, res) {
        for(i=0; i< res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product + " | " + res[i].price + " | " + res[i].stock_quantity)
        }
        afterConnection()
    })
}

function viewLow() {
    connection.query("select * from products where stock_quantity < 5", function (err, res) {
        for(i=0; i< res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product + " | " + res[i].price + " | " + res[i].stock_quantity)
        }
        afterConnection()
    })
}

function increaseInventory() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the item id of the product you would like to add more of?",
            name: "id"
        },
        {
            type: "input",
            message: "How much would you like to add?",
            name: "add"
        }
    ]).then(function(response) {
        connection.query("update products set stock_quantity=stock_quantity + " + response.add + " where item_id=" + response.id)
        afterConnection()
    })
}

function addNew() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the product?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the department of the product?",
            name: "department"
        },
        {
            type: "input",
            message: "What is the price of the product?",
            name: "price"
        },
        {
            type: "input",
            message: "What is the quantity of the product?",
            name: "quantity"
        }
    ]).then(function(response) {
        var sql = "insert into products(product, department_name, price, stock_quantity) values ('" + response.name + "', '" + response.department + "', " + response.price + ", " + response.quantity + ")"
        console.log(sql)
        connection.query(sql, function(err, res) {
            console.log(res)
            afterConnection()
        })
    })
}

function afterConnection() {
    connection.end()
}