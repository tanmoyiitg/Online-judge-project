const Feedback = require('../models/Feedback')
const validator = require('validator')

function isValidEmail(email) {
    return validator.isEmail(email);
}

const HandleFeedback = async (req, res) => {
    try {
        const { name, email, message } = req.body

        if (!name) {
            return res.status(401).json({
                message: "All fields are required",
                from: "name"
            })
        }

        if (!(email)) {
            return res.status(401).json({
                message: "All fields are required",
                from: "email"
            })
        }

        if (!message) {
            return res.status(401).json({
                message: "All fields are required",
                from: "message"
            })
        }
        if (!isValidEmail(email)) {
            return res.status(400).json({
                message: "Format is incorrect",
                from: "email"
            })
        }
        const newFeedback = await Feedback.create({
            name,
            email,
            feedback: message
        })
        res.status(200).json({
            message: "Feedback submitted successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error while saving feedback",
            success: false
        })
    }

}

const HandleFeedbackResponse = async (req, res) => {
    try {
        const feedbacks = await Feedback.find()
        if (feedbacks.length) {
            let total = feedbacks.length
            res.status(200).json({
                feedbacks,
                total
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const ResolveFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndUpdate(req.params.id, { resolved: true }, { new: true });
        if (!feedback) return res.status(404).json({ error: 'Feedback not found' });
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ error: 'Error updating feedback' });
    }
}

const DeleteFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndDelete(req.params.id);
        if (!feedback) return res.status(404).json({ error: 'Feedback not found' });
        res.status(200).json({ message: 'Feedback deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting feedback' });
    }
}

module.exports = { HandleFeedback, HandleFeedbackResponse, ResolveFeedback, DeleteFeedback }