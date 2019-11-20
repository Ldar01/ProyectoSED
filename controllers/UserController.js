'use strict';

const User = require("../models/User");
var passwordHash = require('password-hash');

//Metodo para obtener todos los usuarios

const getAll = (req, res)=>{
    User.find((err, users)=>{
        if(err) return res.status(500).json({message: "Something went wrong trying to get all the users :(", state: "Failure"})

        if(users){
            res.status(200).json({message: "OK", state: "Success!", usuarios:users});
        }else{
            res.status(404).json({message: "There isn't any users"});
        }
    });
}

//Metodo para obtener a un usuario
const getOneById = (req, res)=>{
    let id = req.params.id;

    User.findById(id, (err, user)=>{
        if(err) return res.status(500).json({message:"Something went wrong trying to get the user :(", state: "Failure"});

        if(user){
            res.status(200).json({message: "OK", state: "Success!", usuario: user});
        }else{
            res.status(404).json({message:"User not found", state: "Failure"});
        }
    });
}

//Metodo para insertar nuevo usuario
/**
 * METHOD POST
 * BODY:{
 *      username : {type: String, unique: true},
 *      email: {type: String, unique: true},
 *      password: {required: true, type: String}
 * }
 * 
 */
const insertNewUser = (req, res)=>{
    if(req.body.username != '' && req.body.email != '' && req.body.password != ''){
        var data = {
            username: req.body.username,
            email: req.body.email,
            password: passwordHash.generate(req.body.password)
        }
    
        let new_user = new User(data);
    
        new_user.save((err)=>{
            if(err) return res.status(500).json({message:"Something happend trying to insert the new user", error: err});
    
            res.status(200).json({message:"Inserting the user was successful", state: "Success!", user: data});
        });
    }else{
        res.status(400).json({message:"Faltan campos por llenar"})
    } 
}


/**
 * 
 * METHOD PUT
 */
const updateUser = (req, res)=>{
    if(req.params.id){
        var update =  {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };
        User.findByIdAndUpdate(req.params.id, update,(err,user)=>{
            if(err){
                res.status(500);
                return res.json({"Ok": false, error: err});
            }
            else{
                res.json({"Ok": true, old: user, new: update});
            }
        });
    }
    else{
        res.status(400).json({message: "Id required"});
    }
}

/**
 * 
 * METHOD DELETE
 */
const deleteUser = (req, res)=>{
    if(req.params.id){
        User.findByIdAndDelete(req.params.id,function(err,user){
            if(err){
                res.status(500);
                return res.json({"Ok": false, error: err});
            }
            else{
                res.json({"Ok": true, deleted: user});
            }
        });
    }
    else{
        res.status(400).json({message: "The id is required"});
    }
}

/**
 * METHOD GET
 */

 const getByUsername = (req,res)=>{
    let username = req.params.username;

    User.findOne(username, (err, user)=>{
        if(err) return res.status(500).json({message:"Something went wrong trying to get the user :(", state: "Failure"});

        if(user){
            res.status(200).json({message: "OK", state: "Success!", usuario: user});
        }else{
            res.status(404).json({message:"User not found", state: "Failure"});
        }
    });
 }

module.exports = {
    insertNewUser,
    getAll,
    getOneById,
    deleteUser,
    updateUser,
    getByUsername
}