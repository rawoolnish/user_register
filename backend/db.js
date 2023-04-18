const mongoose = require('mongoose');
require('dotenv').config()
const MONGO = process.env.MONGO_URL

mongoose.connect(MONGO).then(() => {
    console.log("connection Successful")
}).catch((error) => {
    console.log("ERROR !" + error.message)
})