const bcrypt = require("bcrypt")
const User = require("../models/user")

exports.getAllUsers = (req,res) =>{
    User.fetchAllUsers()
        .then(users => res.json(users))
        .catch(err => res.send(err))
}

exports.getUserByID = (req,res) =>{
    User.fetchUserByID(req.params.id)
        .then(users => res.json(users))
        .catch(err => res.send(err))
}
exports.postUser = (req,res) =>{
    const saltRounds = 10;
    bcrypt.hash(req.body["wachtwoord"],saltRounds)
        .then((hash) =>{
            req.body["wachtwoord"] = hash;
            User.postUser(req.body)
                .then(users => res.json(users))
                .catch(err => res.send(err))
    });
}
exports.loginUser = (req,res) =>{
    console.log(req.body["email"]);
    User.getUserByEmail(req.body["email"])
        .then(users => {
                bcrypt.compare(req.body["wachtwoord"], users[0]["wachtwoord"])
                    .then((result) => {
                        if(result){
                            return res.send("correct");
                        }else{

                            return res.send("incorrect");
                        }
                    }).catch(err => res.send(err))
        })
        .catch(err => res.send(err))
}