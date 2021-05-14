const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const db = require('../DbConfig/database')

const router = express.Router();    

router.get('/', expressAsyncHandler(async(req, res) => {

    const sqlSelect = "SELECT * FROM product";
    db.query(sqlSelect,(err,result)=>{
        if (err) {
            res.send(err)
        }else{
            res.send(result) 
        }
    })

}));



module.exports = router;