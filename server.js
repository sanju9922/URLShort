const express = require("express")
const mongoose = require("mongoose")

const app = express()

const PORT = process.env.PORT||3000

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect('mongodb://127.0.0.1:27017/urlshortener')
const db = mongoose.connection
db.on('error',()=>{
    console.log('error')
})
db.once('open',()=>{
    console.log('connected successfully')
})

// link router
const urlRouter = require('./routes/urlRoute')
app.use('/',urlRouter)
app.listen(PORT, ()=>{
    console.log(`Server is running`)
})