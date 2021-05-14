const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const db = require('../DbConfig/database')
const md5 = require('md5');
const jwt = require('jsonwebtoken')


const router = express.Router();    

router.get('/', expressAsyncHandler(async(req, res) => {

    res.send("user connection")

}));

router.post('/register', expressAsyncHandler(async(req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    let hashpassword = md5(password)

    const sqlInsert = "INSERT INTO user (email,password) VALUES (?,?)";
    db.query(sqlInsert,[email,hashpassword],(err,result)=>{
        if (err) {
            res.send(err)
        }else{
            res.send(result)
        }
    })

}));


router.post('/login', expressAsyncHandler(async(req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    let hashpass = md5(password)

    const sqlSelect = "SELECT * FROM user WHERE email = ? AND password = ? ";
    db.query(sqlSelect,[email,hashpass],(err,result)=>{
        if (err) {
            res.send({err : err})
        }

        if (result.length > 0) {
            const id = result[0].id
            const token = jwt.sign({ id }, "jwtSecret", {
                expiresIn: 100,
            });
            res.json({ auth: true, token: token, result:result });
        }else{
            res.json({auth: false, message: "Invalid email and password "});
        }
    })

}));



module.exports = router;