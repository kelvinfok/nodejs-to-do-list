//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();
const helper = require(__dirname + "/helper.js");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));

var items = [];
var workItems = [];

app.get("/", function(req, res) {
    let day = date.getDay();
    res.render("list", { listTitle : day, newListItems: items });
});

app.get("/work", function(req, res) {
    helper.printSth();
    res.render("list", {listTitle: "Work List", newListItems: workItems})
})

app.get("/about", function(req, res) {
    res.render("about");
})

app.post("/work", function(req, res) {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})

app.post("/", function(req, res) {

    let newItems = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(newItems);
        res.redirect("/work");
    } else {
        items.push(newItems);
        res.redirect("/");
    }
})

app.listen(3000, function() {
    console.log("Server started on port 3000");
})