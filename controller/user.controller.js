const { query } = require("express");
const db = require("../config/db");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const e = require("express");



class User {
    static async registration(req,res) {
        const {name,email,passwd} = req.body;
        let hashpass = await bcrypt.hash(passwd, 10);
        // console.log(hashpass);
        let query = `INSERT INTO users(name,email,passwd,role,statuss,created_at,updated_at) values('${name}','${email}','${hashpass}','user','1','${Date.now()}','${Date.now()}')`;
        db.query(query,(err,result) => {
            if(err) {
                console.log(err);
                res.status(500).json({message:err});
            }else{
                // console.log(result);
                res.status(200).json({
                    msg: "User created successfullyy!!",
                    userId: result.insertId,
                })
            }
        })
    }

    static async login(req,res) {
        // console.log(req.body);
        const {email,passwd} = req.body;

        let query = `SELECT * FROM users WHERE email = '${email}'`;
        db.query(query,(err,result) => {
            if(err) {
                console.log(err);
                res.status(500).json({message:err});
            }else{
                if(result.length > 0) {
                    let user = result[0];
                    // console.log(user);
                    bcrypt.compare(passwd,user.passwd,(err,result) => {
                        if(err) {
                            console.log(err);
                            res.status(500).json({
                                msg : "Error to find user!!",
                            })
                        }else {
                            if(result == true) {
                                var token = jwt.sign(user, 'amit',{expiresIn: '1s'});
                                res.status(200).json({
                                    msg: "Login successfully!!",
                                    token: token,
                                })
                            }else{
                              res.status(400).json({
                                msg : "Invalid password!!",
                              })   
                            }
                        }
                    });
                    
                }else{
                    res.status(400).json({
                        msg : "Invalid email!!",
                    })
                }
            }
        })
    }

    static SetAddress(req,res) {
        let token = req.headers.authorization;
        let payload = jwt.verify(token,'amit');
        let userId = payload.id;
        // console.log(token);
        // console.log(payload.id);
        // console.log(req.body);
        let {address,city,country,state} = req.body;
        if(!address ||!city ||!country ||!state) {
            res.status(400).json({
                msg : "Please fill all fields!!",
            })
        }else{
        let query = `INSERT INTO user_address(userId,address,city,country,state) values('${userId}','${address}','${city}','${country}','${state}')`;

        db.query(query,(err,result) => {
            if(err) {
                console.log(err);
                res.status(500).json({message:err});
            }else{
                // console.log(result);
                if(result.affectedRows === 0) {
                    res.status(400).json({
                        msg : "Failed to add address!!",
                    })
                }
                res.status(200).json({
                    message:"Address added successfully!!",
                })
            }
        })
      }
    }

    static GetAddress(req,res) {
        let token = req.headers.authorization;
        let payload = jwt.verify(token,'amit');
        let userId = payload.id;

        let query = `SELECT * FROM user_address WHERE userId = ${userId}`;
        db.query(query,(err,result) => {
            if(err) {
                console.log(err);
                res.status(500).json({
                    msg: err,
                })
            }else{
                if(result.length === 0) {
                    res.status(400).json({
                        msg : "No address found!!",
                    })
                }else{
                    res.status(200).json({
                        address : result,
                    })
                }
            }
        })
    }


    static UpdateAddress(req,res) {
        let token = req.headers.authorization;
        let payload = jwt.verify(token,'amit');
        let userId = payload.id;
        let body = req.body;

        let query = `UPDATE user_address SET ? WHERE userId = ${userId}`;
        db.query(query,[body],(err,result) => {
            if(err) {
                console.log(err);
                res.status(500).json({
                    msg : "Failed to update address!!",
                })
            }else{
                if(result.affectedRows === 0) {
                    res.status(400).json({
                        msg : "No address found!!",
                    })
                }else{
                    res.status(200).json({
                        msg : "Address updated successfully!!",
                    })
                }
            }
        })

    }

    static DeleteAddress(req,res) {
        let token = req.headers.authorization;
        let payload = jwt.verify(token,'amit');
        let userId = payload.id;

        let query = `DELETE FROM user_address WHERE userId = ${userId}`;
        db.query(query,(err,result) => {
            if(err) {
                console.log(err);
                res.status(500).json({
                    msg : "Failed to delete address!!",
                })
            }else{
                if(result.affectedRows === 0) {
                    res.status(400).json({
                        msg : "No address found!!",
                    })
                }else{
                    res.status(200).json({
                        msg : "Address deleted successfully!!",
                    })
                }
            }

        })
    }
}

module.exports = User;