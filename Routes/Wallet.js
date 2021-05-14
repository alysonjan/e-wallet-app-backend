const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const db = require('../DbConfig/database')

const router = express.Router();    

router.get('/', expressAsyncHandler(async(req, res) => {

    const sqlSelect = "SELECT * FROM wallet ORDER BY id DESC LIMIT 1";
    db.query(sqlSelect,(err,result)=>{
        if (err) {
            res.send(err)
        }else{
            res.send(result)
        }
    })

}));


router.post('/balance', expressAsyncHandler(async(req, res) => {

    const newBalance = req.body.newBalance;

    const sqlSelect = "INSERT INTO wallet (balance) VALUES (?)";
    db.query(sqlSelect,[newBalance],(err,result)=>{
        if (err) {
            res.send(err)
        }else{
            res.send(result)
        }
    })

}));




module.exports = router;