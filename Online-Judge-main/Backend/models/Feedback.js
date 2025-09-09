const mongoose = require('mongoose')

const FeedbackSchema = new mongoose.Schema({
    name : {
        type : String,
        required : false
    },
    email : {
        type : String,
        required : false
    },
    feedback :{
        type : String,
        required : false
    },
    resolved : {
        type : Boolean,
        default: false,
        required: false
    }
},{ timestamps: true })

module.exports=mongoose.model('Feedback',FeedbackSchema)
