const mongoose = require('mongoose')
const User = require('./User')

const SubmissionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    result: {
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
}, { timestamps: true });


const TestSchema = new mongoose.Schema({
    Input: {
        type: String,
        required: true
    },

    Expected_Output: {
        type: String,
        required: true
    }
})

const ProblemSchema = new mongoose.Schema({
    ProblemName: {
        type: String,
        required: true
    },
    ProblemStatement: {
        type: String,
        required: true
    },
    Editorial: {
        type: String,
        required: false
    },
    Difficulty: {
        type: String,
        required: true
    },
    Testcase: {
        type: [TestSchema],
        required: true
    },

    submissions: {
        type: [SubmissionSchema],
        required: false
    }


})

module.exports = mongoose.model('Problem', ProblemSchema)