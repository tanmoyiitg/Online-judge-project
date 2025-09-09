const express = require('express')
const app = express();
Port = 3000
const { DBCOnnection } = require('./database/db.js')
const AuthRouter = require('./Routers/AuthRouter.js')
const CRUDRouter = require('./Routers/CRUDRouter.js')
const cookieParser = require('cookie-parser')

DBCOnnection();


const cors = require('cors');
const { log } = require('console');
const FeedbackRouter = require('./Routers/FeedbackRouter.js');

app.use(cors({ origin:"https://codesmash.vercel.app", 
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization'
 }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())



app.use('/api/auth/', AuthRouter)
app.use('/api/Crud/', CRUDRouter)
app.use('/api/feedback',FeedbackRouter)

app.get('/', (req, res) => {
    res.send("HELLO")
})

app.listen(Port, () => {
    console.log(`Listening on Port ${Port}`)
})
