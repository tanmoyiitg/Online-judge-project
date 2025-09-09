const express = require('express');
const { HandleFeedback, HandleFeedbackResponse, ResolveFeedback, DeleteFeedback } = require('../Controllers/HandleFeedback');
const FeedbackRouter = express.Router()

FeedbackRouter.post('/save', HandleFeedback)
FeedbackRouter.get('/fetch', HandleFeedbackResponse)
FeedbackRouter.patch('/resolved/:id', ResolveFeedback)
FeedbackRouter.delete('/delete/:id', DeleteFeedback)
module.exports = FeedbackRouter;