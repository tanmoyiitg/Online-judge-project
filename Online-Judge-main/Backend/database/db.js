const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const DBCOnnection = async () => {
    try {
        const MongoDB_URL = process.env.MongoDB_URL;
        await mongoose.connect(MongoDB_URL)
        console.log("Db connection Established");
    } catch (error) {
        console.log("Error COnnecting to MongoDB = " + error);
    }

}

module.exports = { DBCOnnection };