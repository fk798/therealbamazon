var mysql = require("mysql");
var inquirer = require("inquirer")

var connection

var args = process.argv.slice(2).join(" ")

if (args == "View Product Sales by Department") {
    queryFunction(1)
}
else if (args == "Create New Department") {
    queryFunction(2)
}
else {
    console.log('"' + args + '" is not a valid command. Valid commands are:')
    console.log("node bamazonSupervisor View Product Sales by Department")
    console.log("node bamazonSupervisor Create New Department")
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
        viewDepartment()
    }
    else {
        addDepartment()
    }
}

function viewDepartment() {

}

function addDepartment() {

}