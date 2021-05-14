const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser')
require("dotenv").config();

const app = express()
const port = process.env.PORT || 3003;


//Routes
const productRoute = require("./Routes/Product");
const userRoute = require("./Routes/User");
const eWallet = require("./Routes/Wallet");



//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Routers
app.get("/", (req,res) => {
    res.send("SERVER IS UP!!!!!!!!");
})
app.use('/api/product', productRoute);
app.use('/api/user', userRoute);
app.use('/api/wallet', eWallet);



//error catcher
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

//backend port
app.listen(port, ()=> {
    console.log(`Server is running in port: ${port}`);
})
