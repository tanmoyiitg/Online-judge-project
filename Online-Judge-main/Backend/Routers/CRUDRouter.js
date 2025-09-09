const express = require('express')
const CRUDRouter = express.Router()
const { getDataFromDatabase, saveDataTodatabase, getProblemStatementUsingID, UpdateDataonDatabase,
    DeleteDatafromDatabase, saveCodeToDatabase, getCodeFromdatabase, SaveVerdictToDatabase,
    MySubmissionsDetails, AllSubmissionDetails } = require('../Controllers/CRUD')

CRUDRouter.get('/get', getDataFromDatabase)
CRUDRouter.post('/save', saveDataTodatabase)
CRUDRouter.get('/problemStatement/:id', getProblemStatementUsingID)
CRUDRouter.put('/update/:id', UpdateDataonDatabase)
CRUDRouter.delete('/delete/:id', DeleteDatafromDatabase)
CRUDRouter.put('/codeUpdate/:id', saveCodeToDatabase)
CRUDRouter.get('/getCode/:userId/:id', getCodeFromdatabase)
CRUDRouter.post('/saveVerdict/:userId/:id', SaveVerdictToDatabase)
CRUDRouter.get('/submissionDetails/:userId/:id', MySubmissionsDetails)
CRUDRouter.get('/AllSubmissionDetails/:id', AllSubmissionDetails)

module.exports = CRUDRouter
