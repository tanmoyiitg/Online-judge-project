const mongoose = require('mongoose')
const verdictSchema = new mongoose.Schema({
    verdict: {
        type: String,
        required: false
    },
    code: {
        type: String,
        required: false
    },
    Language: {
        type: String,
        required: false
    }

}, { timestamps: true })
const codeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: false
    },

    code: {
        type: String,
        required: false
    },

    Verdict: {
        type: [verdictSchema],
        required: false
    },

    Language: {
        type: String,
        required: false
    }


})

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    code: {
        type: [codeSchema],
        required: false
    }
})
module.exports = mongoose.model('User', UserSchema)