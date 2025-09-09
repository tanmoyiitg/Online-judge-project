const express=require('express')
const app=express()
const cors=require('cors')
Port=8000

const CompilerRouter = require('./Routers/CompilerRouter')

app.use(cors({origin:"https://codesmash.vercel.app",
    credentials:true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization'
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',CompilerRouter)

app.listen(Port,()=>{
    console.log(`Listening on Port ${Port}`)
})