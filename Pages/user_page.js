const User = require("../models/user")

exports.getAllUsers = (req,res) =>{
    User.fetchAllUsers()
        .then(users => res.status(200).send("Do somthing plz:"+users))
        .catch(err => res.send(err))
}

exports.getUserByID = (req,res,id) =>{
    User.fetchUserByID(id)
        .then(users => res.json(users))
        .catch(err => res.send(err))
}
