const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const UserController = require("../Pages/user_page.js")

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use((req,res,next) =>{
    req.CurrentTime = Date.now()
    console.log("Current time is: " + req.CurrentTime + "\nConnection from: "+req.ip);
    next();
});
app.get("/",(req,res) => {
    res.status(200).send(require("../Pages/home_page.js"));
})
app.get("/user",UserController.getAllUsers);

app.get("/user/:id([0-9]{1})",(req,res) => {
    require("../Pages/user_page.js").getUserByID(req,res,req.params.id);
})
app.get("*",(req,res) => {
    res.status(404).send(require("../Pages/wrongRequest_page.js"));
})
app.listen(5000);