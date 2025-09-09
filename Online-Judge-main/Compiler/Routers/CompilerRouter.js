const express=require('express')
const CompilerRouter= express.Router();
const {RunCodeFile,SubmitCodeFile} =require('../Controller/RunAndSubmitCode')


CompilerRouter.post('/runCode',RunCodeFile)
CompilerRouter.post('/submitCode', SubmitCodeFile)


module.exports=CompilerRouter




